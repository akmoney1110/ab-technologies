import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

function RouteSEO() {

    const location = useLocation();

    const pathname =
        location.pathname.toLowerCase();


    const privatePrefixes = [
        "/portal",
        "/staff",
        "/payment",
        "/payments",
        "/track-procurement",
        "/proposals/",
    ];


    const isPrivatePage =
        privatePrefixes.some(
            (prefix) =>
                pathname === prefix ||
                pathname.startsWith(prefix)
        );


    /*
     * Procurement deserves special handling.
     *
     * Public SEO pages such as:
     *
     * /procurement/hardware
     * /procurement/suppliers
     *
     * should remain indexable.
     *
     * Therefore don't blanket noindex /procurement.
     */

    if (!isPrivatePage) {
        return null;
    }


    return (

        <Helmet>

            <meta
                name="robots"
                content="noindex, nofollow, noarchive"
            />

        </Helmet>

    );

}

export default RouteSEO;