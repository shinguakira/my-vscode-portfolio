import { expect, test } from "@playwright/test"

const LOCALES = ["ja", "en"]

test.setTimeout(30000)

async function setupPage(page: import("@playwright/test").Page, locale: string) {
  await page.setViewportSize({ width: 1920, height: 1080 })
  // Suppress tutorial modal
  await page.addInitScript(() => {
    localStorage.setItem("portfolio-tutorial-dont-show", "true")
  })
  await page.goto(`/${locale}`, { waitUntil: "networkidle" })
  await page.waitForTimeout(1000)
}

for (const locale of LOCALES) {
  test(`${locale}/explorer`, async ({ page }) => {
    await setupPage(page, locale)
    // Explorer is the default sidebar - just screenshot
    await expect(page).toHaveScreenshot([locale, "features", "explorer.png"], {
      maxDiffPixelRatio: 0.01,
    })
  })

  test(`${locale}/search`, async ({ page }) => {
    await setupPage(page, locale)
    await page.click('button[title="Search"]')
    await page.waitForTimeout(300)
    await expect(page).toHaveScreenshot([locale, "features", "search.png"], {
      maxDiffPixelRatio: 0.01,
    })
  })

  test(`${locale}/git-history`, async ({ page }) => {
    await setupPage(page, locale)
    await page.click('button[title="Git History"]')
    await page.waitForTimeout(300)
    await expect(page).toHaveScreenshot([locale, "features", "git-history.png"], {
      maxDiffPixelRatio: 0.01,
    })
  })

  test(`${locale}/changelog`, async ({ page }) => {
    await setupPage(page, locale)
    await page.click('button[title="Changelog"]')
    await page.waitForTimeout(300)
    await expect(page).toHaveScreenshot([locale, "features", "changelog.png"], {
      maxDiffPixelRatio: 0.01,
    })
  })

  test(`${locale}/extensions`, async ({ page }) => {
    await setupPage(page, locale)
    await page.click('button[title="Extensions"]')
    await page.waitForTimeout(300)
    await expect(page).toHaveScreenshot([locale, "features", "extensions.png"], {
      maxDiffPixelRatio: 0.01,
    })
  })

  test(`${locale}/terminal`, async ({ page }) => {
    await setupPage(page, locale)
    // Open terminal via status bar button
    await page.click('button[title="Open Terminal"], button[title="パネルを開く"], button[title="Open Panel"]')
    await page.waitForTimeout(500)
    await expect(page).toHaveScreenshot([locale, "features", "terminal.png"], {
      maxDiffPixelRatio: 0.01,
    })
  })

  test(`${locale}/settings`, async ({ page }) => {
    await setupPage(page, locale)
    await page.click('button[title="Settings"]')
    await page.waitForTimeout(300)
    await expect(page).toHaveScreenshot([locale, "features", "settings.png"], {
      maxDiffPixelRatio: 0.01,
    })
  })

  test(`${locale}/tutorial`, async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    // Don't suppress tutorial - let it appear
    await page.goto(`/${locale}`, { waitUntil: "networkidle" })
    await page.waitForTimeout(1500)
    await expect(page).toHaveScreenshot([locale, "features", "tutorial.png"], {
      maxDiffPixelRatio: 0.01,
    })
  })
}
