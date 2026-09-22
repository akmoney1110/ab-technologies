import React from "react";
import { ArrowRight } from "lucide-react";
import Scene3D from "./ABScene";

export default function Hero() {
    return (
        <section
            id="home"
            className="
                hero-section
                relative
                z-10
                mx-auto
                max-w-[1300px]
                px-6
                lg:px-8
            "
        >
            <div
                className="
                    grid
                    items-center
                    lg:grid-cols-[0.88fr_1.12fr]
                "
            >
                {/* LEFT CONTENT */}
                <div
                    className="
                        relative
                        z-30
                        pt-8
                        pb-12
                        sm:pt-10
                        lg:pt-12
                        lg:pb-20
                    "
                >
                    <div
                        className="
                            mb-6
                            flex
                            items-center
                            gap-3
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.22em]
                            text-blue-400
                        "
                    >
                        <span
                            className="
                                h-px
                                w-8
                                bg-blue-500
                            "
                        />

                        Innovate. Build. Solve.
                    </div>

                    <h1
                        className="
                            hero-heading
                            max-w-[620px]
                            text-4xl
                            font-bold
                            leading-[1.02]
                            tracking-[-3px]
                            sm:text-6xl
                            lg:text-[52px]
                            xl:text-[50px]
                        "
                    >
                        Technology. Simplified.

                        <span className="hidden">
                            <span className="text-blue-500">
                                Digital
                            </span>{" "}
                            Solutions
                        </span>
                    </h1>

                    <p
                        className="
                            mt-7
                            max-w-[500px]
                            text-base
                            leading-7
                            text-white/50
                        "
                    >
                        Discover tools, build solutions, source
                        hardware, and master new skills -
                        seemlessly connected in one platform.
                    </p>

                    <div
                        className="
                            mt-9
                            flex
                            flex-wrap
                            gap-4
                        "
                    >
                        <button
                            className="
                                group
                                flex
                                items-center
                                gap-3
                                rounded-lg
                                bg-blue-600
                                px-6
                                py-4
                                text-sm
                                font-semibold
                                text-white
                                shadow-[0_0_35px_rgba(59,130,246,.25)]
                                transition
                                hover:bg-blue-500
                                hover:shadow-[0_0_50px_rgba(59,130,246,.4)]
                            "
                        >
                            Explore Our Services

                            <ArrowRight
                                size={17}
                                className="
                                    transition
                                    group-hover:translate-x-1
                                "
                            />
                        </button>

                        <button
                            className="
                                rounded-lg
                                border
                                border-white/15
                                bg-white/[0.02]
                                px-6
                                py-4
                                text-sm
                                font-semibold
                                text-white/80
                                transition
                                hover:border-blue-500/40
                                hover:bg-blue-500/5
                                hover:text-white
                            "
                        >
                            View Our Products
                        </button>
                    </div>
                </div>

                {/* RIGHT 3D SCENE */}
                <div
                    className="
                        hero-visual
                        relative
                        mt-10
                        h-[480px]
                        w-full
                        pt-14
                        sm:h-[540px]
                        lg:-mt-60
                        lg:h-[620px]
                    "
                >
                    <Scene3D />
                </div>
            </div>
        </section>
    );
}