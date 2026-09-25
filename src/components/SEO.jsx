import { Helmet } from "react-helmet-async";

const SITE_NAME = "AB Technologies";

const SITE_URL = "https://abtechbridge.com";

const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

function SEO({
    title,
    description,
    path = "/",
    image = DEFAULT_IMAGE,
    type = "website",
    noIndex = false,
    schema = null,
}) {

    const cleanPath =
        path === "/"
            ? "/"
            : `/${path.replace(/^\/+|\/+$/g, "")}`;

    const canonicalUrl =
        `${SITE_URL}${cleanPath}`;

    const fullTitle =
        title
            ? `${title} | ${SITE_NAME}`
            : `${SITE_NAME} | Technology. Simplified.`;


    return (

        <Helmet>

            {/* ==============================================
          BASIC SEO
      ============================================== */}

            <title>
                {fullTitle}
            </title>

            {description && (
                <meta
                    name="description"
                    content={description}
                />
            )}


            {/* ==============================================
          ROBOTS
      ============================================== */}

            <meta
                name="robots"
                content={
                    noIndex
                        ? "noindex, nofollow"
                        : "index, follow, max-image-preview:large"
                }
            />


            {/* ==============================================
          CANONICAL
      ============================================== */}

            {!noIndex && (

                <link
                    rel="canonical"
                    href={canonicalUrl}
                />

            )}


            {/* ==============================================
          OPEN GRAPH
      ============================================== */}

            <meta
                property="og:type"
                content={type}
            />

            <meta
                property="og:site_name"
                content={SITE_NAME}
            />

            <meta
                property="og:title"
                content={fullTitle}
            />

            {description && (

                <meta
                    property="og:description"
                    content={description}
                />

            )}

            <meta
                property="og:url"
                content={canonicalUrl}
            />

            <meta
                property="og:image"
                content={image}
            />

            <meta
                property="og:image:alt"
                content={`${title || SITE_NAME} - ${SITE_NAME}`}
            />


            {/* ==============================================
          TWITTER / X
      ============================================== */}

            <meta
                name="twitter:card"
                content="summary_large_image"
            />

            <meta
                name="twitter:title"
                content={fullTitle}
            />

            {description && (

                <meta
                    name="twitter:description"
                    content={description}
                />

            )}

            <meta
                name="twitter:image"
                content={image}
            />


            {/* ==============================================
          STRUCTURED DATA
      ============================================== */}

            {schema && (

                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>

            )}

        </Helmet>

    );

}

export default SEO;