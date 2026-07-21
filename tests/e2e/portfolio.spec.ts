import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage presents the positioning, proof, work, and contact path", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I turn complex ideas into working products.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Selected Work" })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "I like being close to the whole build." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "Quorum" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "A few moments I'm proud of." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "From idea to working product." })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Have something interesting to build?" }),
  ).toBeVisible();
  await expect(page.locator("video")).toHaveCount(1);

  const heroBox = await page.locator("[data-hero-scene]").boundingBox();
  const heroMediaBox = await page.locator(".hero-media-frame").boundingBox();
  expect(heroBox).not.toBeNull();
  expect(heroMediaBox).not.toBeNull();
  expect(heroMediaBox?.width).toBeCloseTo(heroBox?.width ?? 0, 0);
  expect(heroMediaBox?.height).toBeCloseTo(heroBox?.height ?? 0, 0);

  const proofLedger = page.getByRole("region", { name: "A few moments I'm proud of." });
  await expect(proofLedger.getByText("NOVA AI / 1ST NOTABLE MENTION", { exact: true })).toBeVisible();
  await expect(proofLedger.getByText("NARA / 1ST PLACE", { exact: true })).toBeVisible();
  await expect(
    proofLedger.getByText("Refactory Hackathon 2026", { exact: true }),
  ).toBeVisible();
  await expect(
    proofLedger.getByText("ADIKARA 2024 Innovation Division", { exact: true }),
  ).toBeVisible();
  await expect(proofLedger.getByText("6 signed Quorum flows", { exact: true })).toHaveCount(0);

  const playbackControl = page.getByRole("button", { name: "Hear intro" });
  await expect(playbackControl).toBeVisible();
  await expect(playbackControl).toHaveAccessibleName("Hear intro");
});

test("credential identity remains available in the server-rendered interactive shell", async ({ request }) => {
  const response = await request.get("/");
  const html = await response.text();
  const qrResponse = await request.get("/instagram-qr");

  expect(response.ok()).toBe(true);
  expect(html).toContain('data-testid="research-credential"');
  expect(html).not.toContain('data-testid="research-credential-fallback"');
  expect(html).toContain("Wildan Syukri Niam");
  expect(html).toContain("From idea to product.");
  expect(html).toContain('href="/about"');
  expect(html).toContain('src="/instagram-qr"');
  expect(html).toContain("@wildanniam_");
  expect(qrResponse.ok()).toBe(true);
  expect(qrResponse.headers()["content-type"]).toContain("image/svg+xml");
});

test("public contact surfaces expose Wildan's Instagram profile", async ({ page }) => {
  await page.goto("/");

  const instagramLinks = page.getByRole("link", { name: /Instagram/ });
  await expect(instagramLinks).toHaveCount(2);
  await expect(instagramLinks.first()).toHaveAttribute(
    "href",
    "https://www.instagram.com/wildanniam_/",
  );
});

test("builder pass enters once and stays settled after revisiting the section", async ({ page }) => {
  await page.addInitScript(() => {
    window.sessionStorage.setItem("wildan-entry-seen", "1");
  });
  await page.goto("/");

  const stage = page.locator("[data-credential-stage]");
  const credential = page.getByTestId("research-credential");
  const credentialSwing = page.locator(
    '.credential-swing:has([data-testid="research-credential"])',
  );

  await expect(credential).toHaveCount(1);
  await stage.scrollIntoViewIfNeeded();
  await expect(credential).toBeVisible();
  await expect
    .poll(() =>
      credentialSwing.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).opacity),
      ),
    )
    .toBeGreaterThan(0.98);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await stage.scrollIntoViewIfNeeded();

  await expect(credential).toHaveCount(1);
  await expect
    .poll(() =>
      credentialSwing.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).opacity),
      ),
    )
    .toBeGreaterThan(0.98);
});

test("serves deployment metadata and pragmatic security headers", async ({ page }) => {
  const response = await page.goto("/");
  const headers = response?.headers() ?? {};

  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["strict-transport-security"]).toContain("max-age=63072000");
  expect(headers["permissions-policy"]).toContain("camera=()");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3000",
  );

  const structuredData = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(structuredData).toContain('"@type":"WebSite"');
  expect(structuredData).toContain('"@type":"Person"');
});

test("reflows at a 200 percent zoom-equivalent viewport", async ({ page }) => {
  await page.setViewportSize({ width: 720, height: 450 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I turn complex ideas into working products.",
    }),
  ).toBeVisible();

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(horizontalOverflow).toBe(0);
});

test("builder pass exposes truthful front and back states", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  const browserProblems: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      browserProblems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => browserProblems.push(`pageerror: ${error.message}`));

  await page.goto("/");

  await page.locator("[data-credential-stage]").scrollIntoViewIfNeeded();
  const credential = page.getByTestId("research-credential");
  const credentialSwing = page.locator(
    '.credential-swing:has([data-testid="research-credential"])',
  );
  const lanyard = credentialSwing.locator(".credential-lanyard");
  const lanyardStrap = lanyard.locator(".credential-lanyard__strap");
  const lanyardClasp = lanyard.locator(".credential-lanyard__clasp");

  await expect(credential).toBeVisible();
  await expect(credential.locator(".credential-portrait img")).toHaveJSProperty("complete", true);
  await expect
    .poll(() => credential.locator(".credential-portrait img").evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
  await expect(lanyardStrap).toHaveCount(1);
  await expect(lanyardClasp).toBeVisible();
  await expect(credentialSwing.locator(".credential-card")).toHaveCount(1);

  const strapBox = await lanyardStrap.boundingBox();
  const claspBox = await lanyardClasp.boundingBox();
  const credentialBox = await credential.boundingBox();
  expect(strapBox).not.toBeNull();
  expect(claspBox).not.toBeNull();
  expect(credentialBox).not.toBeNull();
  expect(strapBox?.y ?? 0).toBeLessThan(credentialBox?.y ?? 0);
  expect(Math.abs(
    ((claspBox?.x ?? 0) + (claspBox?.width ?? 0) / 2) -
      ((credentialBox?.x ?? 0) + (credentialBox?.width ?? 0) / 2),
  )).toBeLessThan(12);
  const claspBottom = (claspBox?.y ?? 0) + (claspBox?.height ?? 0);
  const cardTop = credentialBox?.y ?? 0;
  expect(claspBottom - cardTop).toBeGreaterThan(-4);
  expect(claspBottom - cardTop).toBeLessThan(12);

  await expect(credential).toHaveAttribute("data-face", "front");
  await expect(page.getByText("Wildan Syukri Niam", { exact: true })).toBeVisible();

  await credential.click();
  await expect(credential).toHaveAttribute("data-face", "back");
  await expect(page.getByText("From idea to product.", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open full profile" })).toHaveAttribute(
    "href",
    "/about",
  );

  await credential.focus();
  await page.keyboard.press("Enter");
  await expect(credential).toHaveAttribute("data-face", "front");
  await page.keyboard.press("Space");
  await expect(credential).toHaveAttribute("data-face", "back");
  expect(browserProblems).toEqual([]);
});

test("selected work forms a semantic desktop editorial stage", async ({ page }) => {
  const browserProblems: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      browserProblems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => browserProblems.push(`pageerror: ${error.message}`));

  await page.goto("/");

  const scene = page.locator('[data-signature-scene="selected-systems"]');
  const panels = scene.locator("[data-system-panel]");

  await expect(panels).toHaveCount(5);
  await expect(panels.nth(0)).toHaveAttribute("data-project-slug", "fradium");
  await expect(panels.nth(1)).toHaveAttribute("data-project-slug", "paygate");
  await expect(panels.nth(2)).toHaveAttribute("data-project-slug", "nova-ai-wallet");
  await expect(panels.nth(3)).toHaveAttribute("data-project-slug", "nara");
  await expect(panels.nth(4)).toHaveAttribute("data-project-slug", "quorum");
  await expect(scene.getByText("My contribution", { exact: true })).toHaveCount(5);
  await expect(scene.getByText("Current state", { exact: true })).toHaveCount(5);

  await panels.first().scrollIntoViewIfNeeded();
  await expect(scene.locator(".pin-spacer")).toHaveCount(4);

  await panels.nth(2).evaluate((panel) => panel.scrollIntoView({ block: "start" }));
  await expect
    .poll(async () => Number(await panels.nth(1).locator("[data-system-content]").evaluate(
      (content) => getComputedStyle(content).opacity,
    )))
    .toBeLessThan(0.9);
  await expect
    .poll(async () => Number(await panels.nth(1).locator("[data-system-surface]").evaluate(
      (surface) => getComputedStyle(surface).opacity,
    )))
    .toBe(1);
  expect(browserProblems).toEqual([]);
});

test("work index reaches every public case study", async ({ page }) => {
  await page.goto("/work");

  await expect(page.getByRole("heading", { level: 1, name: "Projects I've led and built." })).toBeVisible();

  for (const title of ["Fradium", "PayGate", "Nova AI Wallet", "Nara Wallet", "Quorum", "SpecHeal"]) {
    await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
  }

  await page.getByRole("link", { name: "Read case study" }).first().click();
  await expect(page).toHaveURL(/\/work\/fradium$/);
  await expect(page.getByRole("heading", { level: 1, name: "Fradium" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Current limitations" })).toBeVisible();
});

test("unknown project routes return the custom not-found experience", async ({ page }) => {
  const response = await page.goto("/work/not-a-public-project");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Looks like this page went missing." })).toBeVisible();
});

test("major routes have no serious automated accessibility violations", async ({ page }) => {
  for (const route of ["/", "/about", "/work", "/work/paygate"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const seriousViolations = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );

    expect(seriousViolations, `${route}: ${JSON.stringify(seriousViolations, null, 2)}`).toEqual([]);
  }
});

test("public routes use the approved builder-first voice", async ({ page }) => {
  for (const route of ["/", "/about", "/work", "/work/paygate"]) {
    await page.goto(route);
    const bodyCopy = await page.locator("body").innerText();
    expect(bodyCopy, route).not.toMatch(/\binspect\w*/i);
  }

  await page.goto("/about");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I learn fastest when I'm building something real.",
    }),
  ).toBeVisible();
});

test("hero intro audio is opt-in and playback remains user-controlled", async ({
  page,
}) => {
  await page.goto("/");

  const video = page.locator("video");
  await expect(video).toHaveCount(1);
  const hearButton = page.getByRole("button", { name: "Hear intro" });
  await expect(hearButton).toBeVisible();
  await hearButton.click();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.muted)).toBe(false);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeLessThan(1.5);

  const pauseButton = page.getByRole("button", { name: "Pause intro" });
  await expect(pauseButton).toBeVisible();
  await pauseButton.click();
  await expect(page.getByRole("button", { name: "Resume intro" })).toBeVisible();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);

  await page.getByRole("button", { name: "Resume intro" }).click();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(false);

  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
});

test("Save-Data keeps the hero on its disclosed still fallback", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    const connection = new EventTarget();
    Object.defineProperty(connection, "saveData", { value: true });
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: connection,
    });
  });

  await page.goto("/");

  await expect(page.locator("video")).toHaveCount(0);
  await expect(page.getByText("STILL MODE")).toHaveCount(1);
  await expect(page.getByText("STILL MODE")).toBeHidden();
  const disclosure = page.getByTestId("hero-media-disclosure");
  await expect(disclosure).toBeVisible();
  await expect(disclosure).toHaveText("Veo provenance mark remains visible.");
});

test.describe("reduced motion", () => {
  test("keeps the hero useful without loading autoplay video", async ({ page }) => {
    const browserProblems: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" || message.type() === "warning") {
        browserProblems.push(`${message.type()}: ${message.text()}`);
      }
    });
    page.on("pageerror", (error) => browserProblems.push(`pageerror: ${error.message}`));

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator("video")).toHaveCount(0);
    await expect(page.getByText("STILL MODE")).toBeVisible();
    await expect(page.getByRole("link", { name: "View My Work" }).first()).toBeVisible();

    await page.locator("[data-credential-stage]").scrollIntoViewIfNeeded();
    const credential = page.getByTestId("research-credential");
    await credential.click();
    await expect(credential).toHaveAttribute("data-face", "back");
    await expect(page.locator('[data-hero-scene] .pin-spacer')).toHaveCount(0);
    await expect(page.locator('[data-signature-scene="selected-systems"] .pin-spacer')).toHaveCount(0);
    expect(browserProblems).toEqual([]);
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("uses a single-column hero and exposes navigation", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("video")).toHaveCount(0);
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole("link", { name: "About" })).toBeVisible();
    await page.getByRole("button", { name: "Close navigation menu" }).click();

    await page.locator("[data-credential-stage]").scrollIntoViewIfNeeded();
    const credential = page.getByTestId("research-credential");
    await credential.tap();
    await expect(credential).toHaveAttribute("data-face", "back");
    await expect(page.locator('[data-signature-scene="selected-systems"] .pin-spacer')).toHaveCount(0);
  });
});
