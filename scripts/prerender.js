import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");

const PORT = 4173;
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;

const PRODUCTION_URL = "https://abtechbridge.com";

/*
|--------------------------------------------------------------------------
| Public routes to prerender
|--------------------------------------------------------------------------
|
| ONLY put public, indexable pages here.
|
| NEVER add:
|
| /portal/*
| /staff/*
| /payment/*
| /payments/*
| /proposals/*
| /track-procurement
| dynamic /procurement/:token pages
|
*/

const routes = [
    "/",

    // ============================================================
    // SERVICES
    // ============================================================

    "/services/hardware-procurement",
    "/services/networking",
    "/services/software-solutions",
    "/services/security-communications",
    "/services/corporate-procurement",
    "/services/cloud-managed-it",
    "/services/ai-automation",
    "/services/it-deployment-support",

    // ============================================================
    // PROCUREMENT
    // ============================================================

    "/procurement/institutional",
    "/procurement/suppliers",
    "/procurement/verification",
    "/procurement/hardware",
    "/procurement/international",
    "/procurement/quotations",
    "/procurement/logistics",

    // ============================================================
    // SOLUTIONS
    // ============================================================

    "/solutions/software",
    "/solutions/cloud-infrastructure",
    "/solutions/ai",
    "/solutions/communications",
    "/solutions/business-systems",
    "/solutions/automation",
    "/solutions/security",
    "/solutions/managed-it",

    // ============================================================
    // INDUSTRIES
    // ============================================================

    "/industries/business",
    "/industries/healthcare",
    "/industries/government",
    "/industries/retail",
    "/industries/education",
    "/industries/manufacturing",
    "/industries/ngos",
    "/industries/startups",

    // ============================================================
    // ABOUT
    // ============================================================

    "/about/who-we-are",
    "/about/why-choose-us",
    "/about/capabilities",
    "/about/partners",
    "/about/approach",

    // ============================================================
    // RESOURCES
    // ============================================================

    "/resources/buying-guides",
    "/resources/procurement-guides",
    "/resources/case-studies",
    "/resources/technology-insights",
    "/resources/faqs",
    "/resources/blog",
    "/resources/learning",

    // ============================================================
    // CONTACT / SUPPORT
    // ============================================================

    "/contact",
    "/support",
    "/support/ai",
];

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
|--------------------------------------------------------------------------
| Wait for Vite preview server
|--------------------------------------------------------------------------
*/

async function waitForServer(url, attempts = 60) {
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const response = await fetch(url);

            if (response.ok) {
                return;
            }
        } catch {
            // Preview server may still be starting.
        }

        await wait(500);
    }

    throw new Error(
        `Preview server did not start successfully at ${url}`
    );
}

/*
|--------------------------------------------------------------------------
| Determine output file
|--------------------------------------------------------------------------
|
| Example:
|
| /
| -> dist/index.html
|
| /services/hardware-procurement
| -> dist/services/hardware-procurement/index.html
|
*/

function getOutputFile(route) {
    if (route === "/") {
        return path.join(
            DIST_DIR,
            "index.html"
        );
    }

    const cleanRoute = route.replace(
        /^\/+|\/+$/g,
        ""
    );

    return path.join(
        DIST_DIR,
        cleanRoute,
        "index.html"
    );
}

/*
|--------------------------------------------------------------------------
| Expected production canonical
|--------------------------------------------------------------------------
*/

function getExpectedCanonical(route) {
    if (route === "/") {
        return `${PRODUCTION_URL}/`;
    }

    return `${PRODUCTION_URL}${route}`;
}

/*
|--------------------------------------------------------------------------
| Stop preview server
|--------------------------------------------------------------------------
|
| npm -> vite can create more than one process.
|
| We first terminate the process group on Linux/macOS and then fall
| back to terminating the npm process itself.
|
*/

async function stopPreviewServer(preview) {
    if (!preview) {
        return;
    }

    console.log("");
    console.log("Stopping preview server...");

    try {
        /*
         * Because the process is started with detached: true,
         * negative PID targets the complete process group.
         */

        if (
            process.platform !== "win32" &&
            preview.pid
        ) {
            try {
                process.kill(
                    -preview.pid,
                    "SIGTERM"
                );
            } catch {
                // Process group may already be gone.
            }
        } else {
            preview.kill("SIGTERM");
        }

        /*
         * Give Vite/npm a moment to shut down normally.
         */

        await wait(1000);

        /*
         * Force cleanup if necessary.
         */

        if (
            process.platform !== "win32" &&
            preview.pid
        ) {
            try {
                process.kill(
                    -preview.pid,
                    "SIGKILL"
                );
            } catch {
                // Already terminated.
            }
        }
    } catch (error) {
        console.warn(
            `Preview cleanup warning: ${error.message}`
        );
    }
}

/*
|--------------------------------------------------------------------------
| Main prerender function
|--------------------------------------------------------------------------
*/

async function prerender() {
    console.log("");
    console.log(
        "============================================================"
    );
    console.log(
        " AB Technologies - Production Static Prerender"
    );
    console.log(
        "============================================================"
    );
    console.log("");

    console.log(
        `Routes scheduled: ${routes.length}`
    );

    console.log(
        `Preview URL: ${BASE_URL}`
    );

    console.log(
        `Production URL: ${PRODUCTION_URL}`
    );

    console.log("");

    /*
    |--------------------------------------------------------------------------
    | Start Vite preview
    |--------------------------------------------------------------------------
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

            /*
             * Important:
             *
             * detached allows us to terminate the complete npm/Vite
             * process group when prerendering finishes or fails.
             */

            detached:
                process.platform !== "win32",

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

    /*
    |--------------------------------------------------------------------------
    | Preview output
    |--------------------------------------------------------------------------
    */

    preview.stdout.on(
        "data",
        (data) => {
            process.stdout.write(
                `[vite] ${data.toString()}`
            );
        }
    );

    preview.stderr.on(
        "data",
        (data) => {
            process.stderr.write(
                `[vite] ${data.toString()}`
            );
        }
    );

    /*
    |--------------------------------------------------------------------------
    | Detect premature preview failure
    |--------------------------------------------------------------------------
    */

    let previewExited = false;

    preview.on(
        "exit",
        (code, signal) => {
            previewExited = true;

            if (
                code !== 0 &&
                code !== null
            ) {
                console.error(
                    `Vite preview exited with code ${code}.`
                );
            }

            if (signal) {
                console.log(
                    `Vite preview stopped with signal ${signal}.`
                );
            }
        }
    );

    let browser = null;

    /*
     * Keep statistics so we get a useful summary.
     */

    let renderedCount = 0;

    const startedAt = Date.now();

    try {
        /*
        |--------------------------------------------------------------------------
        | Wait for preview server
        |--------------------------------------------------------------------------
        */

        await waitForServer(
            `${BASE_URL}/`
        );

        if (previewExited) {
            throw new Error(
                "Vite preview process exited before prerendering started."
            );
        }

        console.log("");
        console.log(
            "✓ Preview server ready."
        );
        console.log("");

        /*
        |--------------------------------------------------------------------------
        | Launch Chromium
        |--------------------------------------------------------------------------
        */

        browser = await puppeteer.launch({
            headless: true,

            /*
             * If you ever need to explicitly provide Chrome:
             *
             * PUPPETEER_EXECUTABLE_PATH=/path/to/chrome npm run build:seo
             */

            executablePath:
                process.env
                    .PUPPETEER_EXECUTABLE_PATH ||
                undefined,

            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--no-first-run",
                "--no-zygote",
                "--disable-background-networking",
                "--disable-background-timer-throttling",
                "--disable-backgrounding-occluded-windows",
                "--disable-renderer-backgrounding",
            ],
        });

        console.log(
            "✓ Headless browser started."
        );

        console.log("");

        /*
        |--------------------------------------------------------------------------
        | Create browser page
        |--------------------------------------------------------------------------
        */

        const page = await browser.newPage();

        /*
         * Desktop viewport.
         *
         * Google uses mobile-first indexing, but our purpose here is to
         * generate semantic HTML. Responsive CSS remains available to
         * Google when it subsequently renders the page.
         */

        await page.setViewport({
            width: 1440,
            height: 1200,
            deviceScaleFactor: 1,
        });

        /*
        |--------------------------------------------------------------------------
        | Reduced motion
        |--------------------------------------------------------------------------
        |
        | AB Technologies uses animated/Three.js interfaces.
        |
        | Asking the page to reduce motion helps prevent unnecessary
        | animation work during prerendering.
        |
        */

        await page.emulateMediaFeatures([
            {
                name:
                    "prefers-reduced-motion",
                value: "reduce",
            },
        ]);

        /*
        |--------------------------------------------------------------------------
        | Browser console diagnostics
        |--------------------------------------------------------------------------
        |
        | Browser errors should not silently disappear during a server build.
        |
        */

        page.on(
            "console",
            (message) => {
                const type =
                    message.type();

                if (
                    type === "error" ||
                    type === "warning"
                ) {
                    console.log(
                        `  [browser:${type}] ${message.text()}`
                    );
                }
            }
        );

        /*
        |--------------------------------------------------------------------------
        | JavaScript runtime errors
        |--------------------------------------------------------------------------
        */

        page.on(
            "pageerror",
            (error) => {
                console.error(
                    `  [browser:error] ${error.message}`
                );
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Failed requests
        |--------------------------------------------------------------------------
        */

        page.on(
            "requestfailed",
            (request) => {
                const failure =
                    request.failure();

                /*
                 * Ignore aborted requests.
                 *
                 * They are commonly caused by route transitions or browser
                 * cleanup and are usually harmless during prerendering.
                 */

                if (
                    failure?.errorText ===
                    "net::ERR_ABORTED"
                ) {
                    return;
                }

                console.warn(
                    `  [request failed] ${request.url()}`
                );

                if (failure?.errorText) {
                    console.warn(
                        `    ${failure.errorText}`
                    );
                }
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Render routes
        |--------------------------------------------------------------------------
        */

        for (
            let index = 0;
            index < routes.length;
            index++
        ) {
            const route =
                routes[index];

            const url =
                `${BASE_URL}${route}`;

            const routeStartedAt =
                Date.now();

            console.log(
                `[${index + 1}/${routes.length}] Rendering: ${route}`
            );

            /*
            |--------------------------------------------------------------------------
            | Navigate
            |--------------------------------------------------------------------------
            |
            | DO NOT use networkidle0 here.
            |
            | Modern React applications can maintain:
            |
            | - analytics connections
            | - fonts
            | - APIs
            | - lazy resources
            | - Three.js resources
            | - background network requests
            |
            | networkidle0 can therefore hang unnecessarily.
            |
            */

            const response =
                await page.goto(
                    url,
                    {
                        waitUntil:
                            "domcontentloaded",

                        timeout:
                            60000,
                    }
                );

            /*
            |--------------------------------------------------------------------------
            | Validate HTTP response
            |--------------------------------------------------------------------------
            */

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
            |--------------------------------------------------------------------------
            | Wait for React
            |--------------------------------------------------------------------------
            |
            | Vite's original HTML only contains:
            |
            | <div id="root"></div>
            |
            | We need at least one child before capturing the document.
            |
            */

            await page.waitForSelector(
                "#root > *",
                {
                    timeout: 30000,
                }
            );

            /*
            |--------------------------------------------------------------------------
            | Wait for route-specific SEO
            |--------------------------------------------------------------------------
            |
            | RouteSEO and page-level SEO logic run after React mounts.
            |
            | Instead of waiting for all network traffic to stop, wait until
            | the document has meaningful metadata.
            |
            */

            try {
                await page.waitForFunction(
                    () => {
                        const title =
                            document.title?.trim();

                        const description =
                            document
                                .querySelector(
                                    'meta[name="description"]'
                                )
                                ?.getAttribute(
                                    "content"
                                )
                                ?.trim();

                        const canonical =
                            document
                                .querySelector(
                                    'link[rel="canonical"]'
                                )
                                ?.getAttribute(
                                    "href"
                                )
                                ?.trim();

                        return Boolean(
                            title &&
                            description &&
                            canonical
                        );
                    },
                    {
                        timeout: 10000,
                    }
                );
            } catch {
                console.warn(
                    `  ⚠ SEO metadata wait timed out for ${route}.`
                );

                console.warn(
                    "    Continuing with the current rendered document."
                );
            }

            /*
             * Give React effects, Helmet/SEO components and lazy UI a
             * final opportunity to settle.
             */

            await wait(1500);

            /*
            |--------------------------------------------------------------------------
            | Read important SEO information
            |--------------------------------------------------------------------------
            */

            const pageInfo =
                await page.evaluate(
                    () => {
                        const getMeta =
                            (selector) =>
                                document
                                    .querySelector(
                                        selector
                                    )
                                    ?.getAttribute(
                                        "content"
                                    )
                                    ?.trim() || "";

                        return {
                            title:
                                document.title
                                    ?.trim() || "",

                            canonical:
                                document
                                    .querySelector(
                                        'link[rel="canonical"]'
                                    )
                                    ?.getAttribute(
                                        "href"
                                    )
                                    ?.trim() || "",

                            description:
                                getMeta(
                                    'meta[name="description"]'
                                ),

                            robots:
                                getMeta(
                                    'meta[name="robots"]'
                                ),

                            ogTitle:
                                getMeta(
                                    'meta[property="og:title"]'
                                ),

                            ogDescription:
                                getMeta(
                                    'meta[property="og:description"]'
                                ),

                            ogUrl:
                                getMeta(
                                    'meta[property="og:url"]'
                                ),

                            h1:
                                document
                                    .querySelector(
                                        "h1"
                                    )
                                    ?.textContent
                                    ?.replace(
                                        /\s+/g,
                                        " "
                                    )
                                    .trim() || "",

                            bodyTextLength:
                                document.body
                                    ?.innerText
                                    ?.trim()
                                    .length || 0,
                        };
                    }
                );

            /*
            |--------------------------------------------------------------------------
            | Display result
            |--------------------------------------------------------------------------
            */

            console.log(
                `  Title: ${pageInfo.title || "(missing)"}`
            );

            console.log(
                `  Canonical: ${pageInfo.canonical || "(missing)"}`
            );

            console.log(
                `  Description: ${pageInfo.description
                    ? `${pageInfo.description.slice(0, 120)}${pageInfo.description.length > 120
                        ? "..."
                        : ""
                    }`
                    : "(missing)"
                }`
            );

            console.log(
                `  H1: ${pageInfo.h1 || "(missing)"}`
            );

            /*
            |--------------------------------------------------------------------------
            | SEO validation
            |--------------------------------------------------------------------------
            */

            if (!pageInfo.title) {
                throw new Error(
                    `${route} does not contain a page title.`
                );
            }

            if (!pageInfo.description) {
                throw new Error(
                    `${route} does not contain a meta description.`
                );
            }

            if (!pageInfo.canonical) {
                throw new Error(
                    `${route} does not contain a canonical URL.`
                );
            }

            /*
             * All routes in this script are public/indexable.
             */

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
             * Warn instead of failing if H1 is missing.
             *
             * This allows us to identify pages that need SEO/content
             * improvement without breaking the entire deployment.
             */

            if (!pageInfo.h1) {
                console.warn(
                    `  ⚠ ${route} does not contain an H1.`
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Canonical validation
            |--------------------------------------------------------------------------
            */

            const expectedCanonical =
                getExpectedCanonical(
                    route
                );

            if (
                pageInfo.canonical !==
                expectedCanonical
            ) {
                console.warn(
                    "  ⚠ Canonical mismatch."
                );

                console.warn(
                    `    Expected: ${expectedCanonical}`
                );

                console.warn(
                    `    Received: ${pageInfo.canonical}`
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Basic content validation
            |--------------------------------------------------------------------------
            */

            if (
                pageInfo.bodyTextLength <
                100
            ) {
                console.warn(
                    `  ⚠ ${route} contains very little rendered text.`
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Capture complete rendered HTML
            |--------------------------------------------------------------------------
            */

            let html =
                await page.content();

            /*
             * Safeguard:
             *
             * Replace accidental absolute localhost references with
             * the real production domain.
             */

            html =
                html.replaceAll(
                    BASE_URL,
                    PRODUCTION_URL
                );

            /*
            |--------------------------------------------------------------------------
            | Determine destination
            |--------------------------------------------------------------------------
            */

            const outputFile =
                getOutputFile(
                    route
                );

            /*
            |--------------------------------------------------------------------------
            | Create route directory
            |--------------------------------------------------------------------------
            */

            await fs.mkdir(
                path.dirname(
                    outputFile
                ),
                {
                    recursive: true,
                }
            );

            /*
            |--------------------------------------------------------------------------
            | Write rendered HTML
            |--------------------------------------------------------------------------
            */

            await fs.writeFile(
                outputFile,
                html,
                "utf8"
            );

            renderedCount++;

            const duration =
                (
                    (
                        Date.now() -
                        routeStartedAt
                    ) /
                    1000
                ).toFixed(1);

            console.log(
                `  ✓ Saved: ${path.relative(ROOT, outputFile)}`
            );

            console.log(
                `  ✓ Completed in ${duration}s`
            );

            console.log("");
        }

        /*
        |--------------------------------------------------------------------------
        | Success
        |--------------------------------------------------------------------------
        */

        const totalDuration =
            (
                (
                    Date.now() -
                    startedAt
                ) /
                1000
            ).toFixed(1);

        console.log(
            "============================================================"
        );

        console.log(
            " PRERENDER COMPLETE"
        );

        console.log(
            "============================================================"
        );

        console.log("");

        console.log(
            `✓ Successfully prerendered ${renderedCount}/${routes.length} public routes.`
        );

        console.log(
            `✓ Total time: ${totalDuration}s`
        );

        console.log(
            `✓ Output directory: ${DIST_DIR}`
        );

        console.log("");
    } finally {
        /*
        |--------------------------------------------------------------------------
        | Browser cleanup
        |--------------------------------------------------------------------------
        */

        if (browser) {
            try {
                await browser.close();

                console.log(
                    "✓ Headless browser closed."
                );
            } catch (error) {
                console.warn(
                    `Browser cleanup warning: ${error.message}`
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Vite cleanup
        |--------------------------------------------------------------------------
        */

        await stopPreviewServer(
            preview
        );

        console.log(
            "✓ Preview server cleanup complete."
        );

        console.log("");
    }
}

/*
|--------------------------------------------------------------------------
| Run
|--------------------------------------------------------------------------
*/

prerender().catch(
    (error) => {
        console.error("");
        console.error(
            "============================================================"
        );

        console.error(
            " PRERENDER FAILED"
        );

        console.error(
            "============================================================"
        );

        console.error("");

        console.error(error);

        console.error("");

        process.exit(1);
    }
);