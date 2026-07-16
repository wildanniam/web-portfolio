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
  await expect(page.getByRole("heading", { level: 2, name: "Quorum" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Let's build the next proof." })).toBeVisible();
  await expect(page.locator("video")).toHaveCount(1);

  const playbackControl = page.getByRole("button", { name: /hero animation/i });
  await expect(playbackControl).toBeVisible();
  await playbackControl.click();
  await expect(playbackControl).toHaveAccessibleName(/play hero animation/i);
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
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator("video")).toHaveCount(0);
    await expect(page.getByText("STILL MODE")).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore My Work" }).first()).toBeVisible();
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("uses a single-column hero and exposes navigation", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("video")).toHaveCount(0);
    await page.getByText("Menu", { exact: true }).click();
    const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole("link", { name: "About" })).toBeVisible();
  });
});
