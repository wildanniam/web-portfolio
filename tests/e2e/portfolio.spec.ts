import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage presents the positioning, proof, work, and contact path", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I research and build autonomous systems people can verify.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Selected Systems" })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "The human checkpoint is not optional." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Quorum" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Let's build the next proof." })).toBeVisible();
  await expect(page.locator("video")).toHaveCount(1);

  const heroBox = await page.locator("[data-hero-pin]").boundingBox();
  const heroMediaBox = await page.locator("[data-hero-media-frame]").boundingBox();
  expect(heroBox).not.toBeNull();
  expect(heroMediaBox).not.toBeNull();
  expect(heroMediaBox?.width).toBeCloseTo(heroBox?.width ?? 0, 0);
  expect(heroMediaBox?.height).toBeCloseTo(heroBox?.height ?? 0, 0);

  const proofLedger = page.getByRole("region", { name: "Selected public proof" });
  await expect(proofLedger.getByText("1st Notable Mention", { exact: true })).toBeVisible();
  await expect(
    proofLedger.getByText("Refactory Hackathon · 2nd Place", { exact: true }),
  ).toBeVisible();
  await expect(proofLedger.getByText("6 signed Quorum flows", { exact: true })).toHaveCount(0);

  const playbackControl = page.getByRole("button", { name: /hero animation/i });
  await expect(playbackControl).toBeVisible();
  await expect(playbackControl).toHaveAccessibleName(/(?:play|pause) hero animation/i);
});

test("credential identity remains available in the server-rendered fallback", async ({ request }) => {
  const response = await request.get("/");
  const html = await response.text();
  const qrResponse = await request.get("/about-qr");

  expect(response.ok()).toBe(true);
  expect(html).toContain('data-testid="research-credential-fallback"');
  expect(html).toContain("Wildan Syukri Niam");
  expect(html).toContain("Evidence before confidence.");
  expect(html).toContain('href="/about"');
  expect(html).toContain('src="/about-qr"');
  expect(qrResponse.ok()).toBe(true);
  expect(qrResponse.headers()["content-type"]).toContain("image/svg+xml");
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
      name: "I research and build autonomous systems people can verify.",
    }),
  ).toBeVisible();

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(horizontalOverflow).toBe(0);
});

test("research credential exposes truthful front and back states", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  const browserProblems: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      browserProblems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => browserProblems.push(`pageerror: ${error.message}`));

  await page.goto("/");

  await page.locator("[data-credential-gsap-stage]").scrollIntoViewIfNeeded();
  const credential = page.getByTestId("research-credential");
  await expect(credential).toHaveAttribute("data-face", "front");
  await expect(page.getByText("Wildan Syukri Niam", { exact: true })).toBeVisible();

  await credential.click();
  await expect(credential).toHaveAttribute("data-face", "back");
  await expect(page.getByText("Evidence before confidence.", { exact: true })).toBeVisible();
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

test("selected systems forms a semantic desktop editorial stage", async ({ page }) => {
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

  await expect(panels).toHaveCount(3);
  await expect(panels.nth(0)).toHaveAttribute("data-project-slug", "fradium");
  await expect(panels.nth(1)).toHaveAttribute("data-project-slug", "paygate");
  await expect(panels.nth(2)).toHaveAttribute("data-project-slug", "nova-ai-wallet");
  await expect(scene.getByText("Contribution", { exact: true })).toHaveCount(3);
  await expect(scene.getByText("Boundary", { exact: true })).toHaveCount(3);

  await panels.first().scrollIntoViewIfNeeded();
  await expect(scene.locator(".pin-spacer")).toHaveCount(2);

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

  await expect(page.getByRole("heading", { level: 1, name: "Systems built to leave evidence." })).toBeVisible();

  for (const title of ["Fradium", "PayGate", "Nova AI Wallet", "SpecHeal", "Quorum"]) {
    await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
  }

  await page.getByRole("link", { name: "Read case study" }).first().click();
  await expect(page).toHaveURL(/\/work\/fradium$/);
  await expect(page.getByRole("heading", { level: 1, name: "Fradium" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Scope boundaries" })).toBeVisible();
});

test("unknown project routes return the custom not-found experience", async ({ page }) => {
  const response = await page.goto("/work/not-a-public-project");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "This evidence trail ends here." })).toBeVisible();
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

test("hero playback remains user-controlled and pauses outside the active document", async ({
  page,
}) => {
  await page.goto("/");

  const video = page.locator("video");
  await expect(video).toHaveCount(1);
  await video.evaluate(async (element: HTMLVideoElement) => {
    await element.play();
  });

  const pauseButton = page.getByRole("button", { name: "Pause hero animation" });
  await expect(pauseButton).toBeVisible();
  await pauseButton.click();
  await expect(page.getByRole("button", { name: "Play hero animation" })).toBeVisible();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);

  await page.getByRole("button", { name: "Play hero animation" }).click();
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
  await expect(page.getByText("STILL MODE")).toBeVisible();
  await expect(page.getByText("AI-generated system visualization.", { exact: false })).toBeVisible();
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
    await expect(page.getByRole("link", { name: "Explore My Work" }).first()).toBeVisible();

    await page.locator("[data-credential-gsap-stage]").scrollIntoViewIfNeeded();
    const credential = page.getByTestId("research-credential");
    await credential.click();
    await expect(credential).toHaveAttribute("data-face", "back");
    await expect(page.locator('[data-signature-scene="hero-credential"] .pin-spacer')).toHaveCount(0);
    await expect(page.locator('[data-signature-scene="selected-systems"] .pin-spacer')).toHaveCount(0);
    expect(browserProblems).toEqual([]);
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("uses a single-column hero and exposes navigation", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("video")).toHaveCount(0);
    await page.getByText("Menu", { exact: true }).click();
    const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole("link", { name: "About" })).toBeVisible();

    await page.locator("[data-credential-gsap-stage]").scrollIntoViewIfNeeded();
    const credential = page.getByTestId("research-credential");
    await credential.tap();
    await expect(credential).toHaveAttribute("data-face", "back");
    await expect(page.locator('[data-signature-scene="selected-systems"] .pin-spacer')).toHaveCount(0);
  });
});
