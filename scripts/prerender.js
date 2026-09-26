import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");

const PORT = 4173;
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;

/*
 * Only PUBLIC, INDEXABLE pages belong here.
 *
 * Never add:
 * /portal/*
 * /staff/*
 * /payment/*
 * /payments/*
 * /proposals/*
 * /track-procurement
 * dynamic /procurement/:token pages
 */

const routes = [
    "/",

    // Services
    "/services/hardware-procurement",
    "/services/networking",
    "/services/software-solutions",
    "/services/security-communications",
    "/services/corporate-procurement",
    "/services/cloud-managed-it",
    "/services/ai-automation",
    "/services/it-deployment-support",

    // Procurement
    "/procurement/institutional",
    "/procurement/suppliers",
    "/procurement/verification",
    "/procurement/hardware",
    "/procurement/international",
    "/procurement/quotations",
    "/procurement/logistics",

    // Solutions
    "/solutions/software",
    "/solutions/cloud-infrastructure",
    "/solutions/ai",
    "/solutions/communications",
    "/solutions/business-systems",
    "/solutions/automation",
    "/solutions/security",
    "/solutions/managed-it",

    // Industries
    "/industries/business",
    "/industries/healthcare",
    "/industries/government",
    "/industries/retail",
    "/industries/education",
    "/industries/manufacturing",
    "/industries/ngos",
    "/industries/startups",

    // About
    "/about/who-we-are",
    "/about/why-choose-us",
    "/about/capabilities",
    "/about/partners",
    "/about/approach",

    // Resources
    "/resources/buying-guides",
    "/resources/procurement-guides",
    "/resources/case-studies",
    "/resources/technology-insights",
    "/resources/faqs",
    "/resources/blog",
    "/resources/learning",

    // Contact / Support
    "/contact",
    "/support",
    "/support/ai",
];

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, attempts = 60) {
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const response = await fetch(url);

            if (response.ok) {
                return;
            }
        } catch {
            // Server may still be starting.
        }

        await wait(500);
    }

    throw new Error(`Preview server did not start at ${url}`);
}

function getOutputFile(route) {
    if (route === "/") {
        return path.join(DIST_DIR, "index.html");
    }

    const cleanRoute = route.replace(/^\/+|\/+$/g, "");

    return path.join(
        DIST_DIR,
        cleanRoute,
        "index.html"
    );
}

async function prerender() {
    console.log("");
    console.log("============================================");
    console.log(" AB Technologies - Static Prerender");
    console.log("============================================");
    console.log("");

    /*
     * Start Vite's preview server against the completed dist folder.
     */

    const preview = spawn(
        "npm",
        [
            "run",
            "preview",
            "--",
            "--host",
            HOST,
            "--port",
            String(PORT),
            "--strictPort",
        ],
        {
            cwd: ROOT,
            stdio: [
                "ignore",
                "pipe",
                "pipe",
            ],
            env: {
                ...process.env,
                NODE_ENV: "production",
            },
        }
    );

    preview.stdout.on("data", (data) => {
        process.stdout.write(
            `[vite] ${data.toString()}`
        );
    });

    preview.stderr.on("data", (data) => {
        process.stderr.write(
            `[vite] ${data.toString()}`
        );
    });

    let browser;

    try {
        await waitForServer(`${BASE_URL}/`);

        console.log("");
        console.log("Preview server ready.");
        console.log("");

        browser = await puppeteer.launch({
            headless: true,

            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
            ],
        });

        const page = await browser.newPage();

        await page.setViewport({
            width: 1440,
            height: 1200,
            deviceScaleFactor: 1,
        });

        /*
         * Prevent animations from keeping pages unnecessarily busy.
         */

        await page.emulateMediaFeatures([
            {
                name: "prefers-reduced-motion",
                value: "reduce",
            },
        ]);

        for (const route of routes) {
            const url = `${BASE_URL}${route}`;

            console.log(`Rendering: ${route}`);

            const response = await page.goto(url, {
                waitUntil: "networkidle0",
                timeout: 120000,
            });

            if (!response) {
                throw new Error(
                    `No HTTP response while rendering ${route}`
                );
            }

            if (!response.ok()) {
                throw new Error(
                    `${route} returned HTTP ${response.status()}`
                );
            }

            /*
             * Wait until React has actually mounted.
             */

            await page.waitForSelector("#root > *", {
                timeout: 30000,
            });

            /*
             * Give route SEO useEffect calls a short opportunity
             * to update title/meta/canonical/schema.
             */

            await wait(300);

            /*
             * Confirm the document has useful rendered content.
             */

            const pageInfo = await page.evaluate(() => {
                return {
                    title: document.title,

                    canonical:
                        document
                            .querySelector(
                                'link[rel="canonical"]'
                            )
                            ?.getAttribute("href") || "",

                    description:
                        document
                            .querySelector(
                                'meta[name="description"]'
                            )
                            ?.getAttribute("content") || "",

                    robots:
                        document
                            .querySelector(
                                'meta[name="robots"]'
                            )
                            ?.getAttribute("content") || "",

                    h1:
                        document
                            .querySelector("h1")
                            ?.textContent
                            ?.replace(/\s+/g, " ")
                            .trim() || "",
                };
            });

            console.log(
                `  Title: ${pageInfo.title}`
            );

            console.log(
                `  Canonical: ${pageInfo.canonical}`
            );

            if (pageInfo.h1) {
                console.log(
                    `  H1: ${pageInfo.h1}`
                );
            }

            if (
                pageInfo.robots
                    .toLowerCase()
                    .includes("noindex")
            ) {
                throw new Error(
                    `Public route ${route} is marked noindex.`
                );
            }

            /*
             * Capture the fully rendered document.
             */

            let html = await page.content();

            /*
             * Vite preview runs on localhost, but canonical URLs
             * should already be production URLs because RouteSEO
             * uses SITE_URL.
             *
             * This replacement is simply a safeguard against
             * accidental localhost absolute URLs entering HTML.
             */

            html = html
                .replaceAll(
                    `http://${HOST}:${PORT}`,
                    "https://abtechbridge.com"
                );

            const outputFile = getOutputFile(route);

            await fs.mkdir(
                path.dirname(outputFile),
                {
                    recursive: true,
                }
            );

            await fs.writeFile(
                outputFile,
                html,
                "utf8"
            );

            console.log(
                `  Saved: ${path.relative(ROOT, outputFile)}`
            );

            console.log("");
        }

        console.log(
            `Successfully prerendered ${routes.length} public routes.`
        );

        console.log("");
    } finally {
        if (browser) {
            await browser.close();
        }

        preview.kill("SIGTERM");
    }
}

prerender().catch((error) => {
    console.error("");
    console.error("PRERENDER FAILED");
    console.error(error);
    console.error("");

    process.exit(1);
});
