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

  const playbackControl = page.getByRole("button", { name: /hero animation/i });
  await expect(playbackControl).toBeVisible();
  await playbackControl.click();
  await expect(playbackControl).toHaveAccessibleName(/play hero animation/i);
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

  const credential = page.getByTestId("research-credential");
  await credential.scrollIntoViewIfNeeded();
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

    const credential = page.getByTestId("research-credential");
    await credential.scrollIntoViewIfNeeded();
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

    const credential = page.getByTestId("research-credential");
    await credential.scrollIntoViewIfNeeded();
    await credential.tap();
    await expect(credential).toHaveAttribute("data-face", "back");
    await expect(page.locator('[data-signature-scene="selected-systems"] .pin-spacer')).toHaveCount(0);
  });
});
