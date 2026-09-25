import ABHero from "../components/ABHero";
import SEO from "./SEO";
import ABSection1 from "../components/ABSection1";
import ABSection2 from "../components/ABSection2";
import ABSection3 from "../components/ABSection3";
import ABSection4 from "../components/ABSection4";
import ABSection5 from "../components/ABSection5";
import ABSection6 from "../components/ABSection6";
import ABSection7 from "../components/ABSection7";
import ABFooter from "../components/ABFooter";

export default function Home() {
    return (
        <>
            <SEO
                title="IT Procurement, Software, Cloud, AI & Technology Solutions"
                description="AB Technologies provides IT hardware procurement, custom software development, networking, cloud infrastructure, cybersecurity, AI automation and managed IT solutions for businesses and organizations."
                path="/"
            />

            <ABHero />


            <ABSection1 />
            <ABSection2 />
            <ABSection3 />
            <ABSection4 />
            <ABSection5 />
            <ABSection6 />
            <ABSection7 />

            <ABFooter />
        </>
    );
}