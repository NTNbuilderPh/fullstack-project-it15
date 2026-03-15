import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const appUrl = "http://127.0.0.1:5173";
const outputDir = path.resolve(process.cwd(), "..", "docs", "screenshots");

async function ensureOutputDirectory() {
  await fs.mkdir(outputDir, { recursive: true });
}

async function takeScreenshots() {
  await ensureOutputDirectory();

  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const page = await context.newPage();

  await page.goto(appUrl, { waitUntil: "networkidle", timeout: 60000 });
  await page.screenshot({
    path: path.join(outputDir, "01-login-page.png"),
    fullPage: true,
  });

  const loginResponse = await page.request.post("http://127.0.0.1:8000/api/login", {
    data: {
      email: "admin@uddn.edu.ph",
      password: "password123",
    },
  });

  if (!loginResponse.ok()) {
    throw new Error(`Login API failed with status ${loginResponse.status()}`);
  }

  const loginPayload = await loginResponse.json();

  await page.evaluate(({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }, loginPayload);

  await page.goto(`${appUrl}/dashboard`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: path.join(outputDir, "02-dashboard-overview.png"),
    fullPage: true,
  });

  await page.locator(".charts-grid").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.locator(".charts-grid").screenshot({
    path: path.join(outputDir, "03-dashboard-charts.png"),
  });

  await page.locator(".content-grid").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.fill(".weather-search input", "Davao City");
  await page.click('.weather-search button:has-text("Search")');
  await page.waitForTimeout(3000);
  await page.locator(".content-grid").screenshot({
    path: path.join(outputDir, "04-students-and-weather.png"),
  });

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });

  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(appUrl, { waitUntil: "networkidle", timeout: 60000 });
  await mobilePage.evaluate(({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }, loginPayload);
  await mobilePage.goto(`${appUrl}/dashboard`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({
    path: path.join(outputDir, "05-mobile-dashboard.png"),
    fullPage: true,
  });

  await browser.close();

  const generated = [
    "01-login-page.png",
    "02-dashboard-overview.png",
    "03-dashboard-charts.png",
    "04-students-and-weather.png",
    "05-mobile-dashboard.png",
  ];

  for (const file of generated) {
    console.log(path.join(outputDir, file));
  }
}

takeScreenshots().catch((error) => {
  console.error(error);
  process.exit(1);
});
