import React, {
    useRef,
    useMemo,
    useEffect,
    useState,
    Suspense,
} from "react";

import { Link } from "react-router-dom";

import * as THREE from "three";

import { Icon } from "@iconify/react";

import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

import {
    Canvas,
    useFrame,
} from "@react-three/fiber";

import {
    Text3D,
    Text,
    Center,
    Float,
    Html,
    ContactShadows,
} from "@react-three/drei";

import {
    ArrowRight,
    Lightbulb,
    Shield,
    Headphones, ShoppingCart, GraduationCap, Check,
    Settings,
    Menu,
    X,
    Cloud,
    Code2,
    TrendingUp,
} from "lucide-react";

import "./HeroPage.css";

/* ============================================================
   THEME DETECTION FOR 3D SCENE  (ADDED)
============================================================ */

function useDarkMode() {
    const [isDark, setIsDark] = useState(() =>
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        if (typeof document === "undefined") return;
        const el = document.documentElement;
        const observer = new MutationObserver(() => {
            setIsDark(el.classList.contains("dark"));
        });
        observer.observe(el, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    return isDark;
}

function useTechnologyTexture() {
    const texture = useMemo(() => {
        const canvas = document.createElement("canvas");

        canvas.width = 2048;
        canvas.height = 2048;

        const ctx = canvas.getContext("2d");

        if (!ctx) return null;

        /* ========================================================
           BACKGROUND
        ======================================================== */

        ctx.fillStyle = "#020617";
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        /* ========================================================
           TECHNOLOGY MARKS
        ======================================================== */

        const logos = [
            { text: "REACT", color: "#61DAFB" },
            { text: "PYTHON", color: "#FFD43B" },
            { text: "HP", color: "#F7DF1E" },
            { text: "DJANGO", color: "#44B78B" },
            { text: "APPLE", color: "#68A063" },
            { text: "DOCKER", color: "#2496ED" },
            { text: "GIT", color: "#F05032" },
            { text: "GITHUB", color: "#F8FAFC" },
            { text: "ACADEMY", color: "#FF9900" },
            { text: "LINUX", color: "#FCC624" },
            { text: "HTML", color: "#E34F26" },
            { text: "CISCO", color: "#38BDF8" },
            { text: "SQL", color: "#67E8F9" },
            { text: "AI", color: "#C084FC" },
            { text: "CLOUD", color: "#38BDF8" },
            { text: "API", color: "#4ADE80" },
            { text: "SECURITY", color: "#FB7185" },
            { text: "NETWORK", color: "#60A5FA" },
            { text: "DATA", color: "#22D3EE" },
            { text: "CODE", color: "#E2E8F0" },
        ];

        /* ========================================================
           PRECISE POSITIONS
           Spread them enough so they remain readable on the mesh.
        ======================================================== */

        const positions = [
            [150, 150],
            [480, 145],
            [820, 155],
            [1170, 145],
            [1510, 155],
            [1880, 150],

            [100, 450],
            [420, 430],
            [750, 455],
            [1080, 430],
            [1430, 450],
            [1780, 430],

            [170, 760],
            [510, 740],
            [850, 770],
            [1190, 745],
            [1530, 770],
            [1880, 745],

            [100, 1070],
            [430, 1050],
            [760, 1080],
            [1100, 1050],
            [1450, 1080],
            [1810, 1050],

            [160, 1370],
            [500, 1350],
            [840, 1380],
            [1180, 1350],
            [1520, 1380],
            [1870, 1350],

            [120, 1690],
            [470, 1670],
            [820, 1700],
            [1180, 1670],
            [1530, 1700],
            [1880, 1680],

            [300, 1930],
            [700, 1920],
            [1100, 1940],
            [1500, 1920],
        ];

        /* ========================================================
           DRAW TECHNOLOGY MARKS
        ======================================================== */

        positions.forEach(
            ([x, y], index) => {
                const logo =
                    logos[
                    index % logos.length
                    ];

                ctx.save();

                ctx.translate(x, y);

                /* ------------------------------------------------
                   SLIGHT VARIATION
                ------------------------------------------------ */

                const rotation =
                    ((index % 7) - 3) * 0.018;

                ctx.rotate(rotation);

                /* ------------------------------------------------
                   SIZE VARIATION
                ------------------------------------------------ */

                const short =
                    logo.text.length <= 3;

                const medium =
                    logo.text.length <= 6;

                let fontSize;

                if (short) {
                    fontSize = 255;
                } else if (medium) {
                    fontSize = 152;
                } else {
                    fontSize = 52;
                }

                /* Some logos slightly larger/smaller */

                const variation =
                    0.88 +
                    ((index * 17) % 20) /
                    100;

                fontSize *= variation;

                ctx.font =
                    `900 ${fontSize}px Arial, Helvetica, sans-serif`;

                ctx.textAlign =
                    "center";

                ctx.textBaseline =
                    "middle";

                /* =================================================
                   SUBTLE OUTER GLOW
                   Small enough to preserve sharpness.
                ================================================= */

                ctx.shadowColor =
                    logo.color;

                ctx.shadowBlur = 14;

                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;

                ctx.globalAlpha = 0.95;

                ctx.fillStyle =
                    logo.color;

                ctx.fillText(
                    logo.text,
                    0,
                    0
                );

                /* =================================================
                   SHARP CORE
                ================================================= */

                ctx.shadowBlur = 0;

                ctx.globalAlpha = 1;

                ctx.fillStyle =
                    logo.color;

                ctx.fillText(
                    logo.text,
                    0,
                    0
                );

                /* =================================================
                   SMALL BRIGHT HIGHLIGHT
                   Not full white — keeps the original color.
                ================================================= */

                ctx.globalAlpha = 0.30;

                ctx.fillStyle =
                    "#ffffff";

                ctx.fillText(
                    logo.text,
                    0,
                    -1.5
                );

                ctx.restore();
            }
        );

        /* ========================================================
           SMALL TECH DOTS
           Adds variation without destroying readability.
        ======================================================== */

        const dotColors = [
            "#38BDF8",
            "#60A5FA",
            "#818CF8",
            "#22D3EE",
            "#A78BFA",
        ];

        for (let i = 0; i < 140; i++) {
            const x =
                Math.random() *
                canvas.width;

            const y =
                Math.random() *
                canvas.height;

            const radius =
                Math.random() * 2.2 +
                0.7;

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                dotColors[
                i % dotColors.length
                ];

            ctx.globalAlpha =
                0.35 +
                Math.random() * 0.45;

            ctx.fill();
        }

        ctx.globalAlpha = 1;

        /* ========================================================
           THIN TECH LINES
        ======================================================== */

        ctx.lineWidth = 1;

        for (let i = 0; i < 30; i++) {
            const y =
                Math.random() *
                canvas.height;

            const startX =
                Math.random() *
                canvas.width;

            const length =
                80 +
                Math.random() * 260;

            ctx.beginPath();

            ctx.moveTo(
                startX,
                y
            );

            ctx.lineTo(
                Math.min(
                    startX + length,
                    canvas.width
                ),
                y
            );

            ctx.strokeStyle =
                i % 2 === 0
                    ? "rgba(56,189,248,0.22)"
                    : "rgba(129,140,248,0.16)";

            ctx.stroke();
        }

        /* ========================================================
           VERY SUBTLE GRID
        ======================================================== */

        ctx.globalAlpha = 0.055;

        ctx.strokeStyle =
            "#38BDF8";

        ctx.lineWidth = 1;

        const gridSize = 96;

        for (
            let x = 0;
            x <= canvas.width;
            x += gridSize
        ) {
            ctx.beginPath();

            ctx.moveTo(x, 0);

            ctx.lineTo(
                x,
                canvas.height
            );

            ctx.stroke();
        }

        for (
            let y = 0;
            y <= canvas.height;
            y += gridSize
        ) {
            ctx.beginPath();

            ctx.moveTo(0, y);

            ctx.lineTo(
                canvas.width,
                y
            );

            ctx.stroke();
        }

        ctx.globalAlpha = 1;

        /* ========================================================
           BLUE / PURPLE TECH LIGHTING
           Kept subtle so logos remain readable.
        ======================================================== */

        const glow =
            ctx.createRadialGradient(
                canvas.width * 0.50,
                canvas.height * 0.48,
                100,
                canvas.width * 0.50,
                canvas.height * 0.48,
                1100
            );

        glow.addColorStop(
            0,
            "rgba(37,99,235,0.16)"
        );

        glow.addColorStop(
            0.35,
            "rgba(14,165,233,0.08)"
        );

        glow.addColorStop(
            0.70,
            "rgba(79,70,229,0.035)"
        );

        glow.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        ctx.fillStyle =
            glow;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        /* ========================================================
           EDGE VIGNETTE
        ======================================================== */

        const vignette =
            ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                600,
                canvas.width / 2,
                canvas.height / 2,
                1450
            );

        vignette.addColorStop(
            0,
            "rgba(0,0,0,0)"
        );

        vignette.addColorStop(
            0.75,
            "rgba(0,0,0,0.10)"
        );

        vignette.addColorStop(
            1,
            "rgba(0,0,0,0.45)"
        );

        ctx.fillStyle =
            vignette;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        /* ========================================================
           THREE.JS TEXTURE
        ======================================================== */

        const tex =
            new THREE.CanvasTexture(
                canvas
            );

        tex.colorSpace =
            THREE.SRGBColorSpace;

        tex.wrapS =
            THREE.RepeatWrapping;

        tex.wrapT =
            THREE.RepeatWrapping;

        tex.anisotropy = 16;

        tex.minFilter =
            THREE.LinearMipmapLinearFilter;

        tex.magFilter =
            THREE.LinearFilter;

        tex.generateMipmaps = true;

        tex.needsUpdate = true;

        return tex;
    }, []);

    return texture;
}

/* ============================================================
   3D TECHNOLOGY LOGO
============================================================ */

function TechLogo({
    url,
    position,
    rotation,
}) {
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const loader = new SVGLoader();

        loader.load(
            url,
            (data) => {
                setPaths(data.paths);
            }
        );
    }, [url]);

    if (!paths.length) {
        return null;
    }

    return (
        <group
            position={position}
            rotation={rotation}
            scale={0.015}
        >
            {paths.map((path, index) => {
                const shapes =
                    SVGLoader.createShapes(path);

                return shapes.map(
                    (shape, shapeIndex) => (
                        <mesh
                            key={`${index}-${shapeIndex}`}
                        >
                            <shapeGeometry
                                args={[shape]}
                            />

                            <meshBasicMaterial
                                color={
                                    path.color ||
                                    "#e2e8f0"
                                }
                                side={
                                    THREE.DoubleSide
                                }
                            />
                        </mesh>
                    )
                );
            })}
        </group>
    );
}


/* ============================================================
   ROTATING TECHNOLOGY LOGOS
============================================================ */

function OrbitTechLogos() {
    const groupRef = useRef();

    const radius = 2.60;

    const logos = [
        {
            name: "React",
            url:
                "https://cdn.simpleicons.org/react/38bdf8",
        },
        {
            name: "Python",
            url:
                "https://cdn.simpleicons.org/python/fbbf24",
        },
        {
            name: "Django",
            url:
                "https://cdn.simpleicons.org/django/f8fafc",
        },
        {
            name: "JavaScript",
            url:
                "https://cdn.simpleicons.org/javascript/facc15",
        },
        {
            name: "Docker",
            url:
                "https://cdn.simpleicons.org/docker/38bdf8",
        },
        {
            name: "GitHub",
            url:
                "https://cdn.simpleicons.org/github/e2e8f0",
        },
        {
            name: "Cloud",
            url:
                "https://cdn.simpleicons.org/googlecloud/38bdf8",
        },
        {
            name: "Node",
            url:
                "https://cdn.simpleicons.org/nodedotjs/4ade80",
        },
    ];

    useFrame((state) => {
        if (!groupRef.current) return;

        const t =
            state.clock.elapsedTime;

        groupRef.current.rotation.y =
            t * 0.18;
    });

    return (
        <group
            ref={groupRef}
            position={[0, -1.75, 0]}
        >
            {logos.map((logo, index) => {
                const angle =
                    (index / logos.length) *
                    Math.PI *
                    2;

                const x =
                    Math.sin(angle) *
                    radius;

                const z =
                    Math.cos(angle) *
                    radius;

                return (
                    <TechLogo
                        key={logo.name}
                        url={logo.url}
                        position={[x, 0, z]}
                        rotation={[
                            0,
                            angle,
                            0,
                        ]}
                    />
                );
            })}
        </group>
    );
}


/* ============================================================
   OUTER ORBIT TEXT
============================================================ */

function OrbitText() {
    const groupRef = useRef();
    const isDark = useDarkMode();

    const radius = 2.73;

    const text =
        "SOFTWARE • SECURITY • HARDWARE PROCUREMENT • CONSULTANCY • NETWORK • AUTOMATIONS . CLOUD • ACADEMY • COMPLETE I.T • ";

    const characters =
        text.split("");

    useFrame((state) => {
        if (!groupRef.current) return;

        const t =
            state.clock.elapsedTime;

        groupRef.current.rotation.y =
            t * 0.18;
    });

    return (
        <group
            ref={groupRef}
            position={[0, -2.10, 0]}
        >
            {characters.map(
                (char, index) => {
                    const angle =
                        (index /
                            characters.length) *
                        Math.PI *
                        2;

                    const x =
                        Math.sin(angle) *
                        radius;

                    const z =
                        Math.cos(angle) *
                        radius;

                    return (
                        <Text3D
                            key={`${char}-${index}`}
                            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
                            size={0.13}
                            height={0.018}
                            curveSegments={8}
                            position={[
                                x,
                                0,
                                z,
                            ]}
                            rotation={[
                                0,
                                angle,
                                0,
                            ]}
                            bevelEnabled
                            bevelThickness={0.004}
                            bevelSize={0.003}
                            bevelSegments={2}
                        >
                            {char}

                            <meshStandardMaterial
                                color={isDark ? "#38bdf8" : "#0284c7"}
                                emissive={isDark ? "#0ea5e9" : "#7dd3fc"}
                                emissiveIntensity={isDark ? 2.5 : 1.0}
                                metalness={0.85}
                                roughness={0.2}
                            />
                        </Text3D>
                    );
                }
            )}
        </group>
    );
}


/* ============================================================
   INNER ORBIT TEXT
============================================================ */
function InnerOrbitText() {
    const groupRef = useRef();
    const isDark = useDarkMode();

    const radius = 2.10;

    const text = "TECHNOLOGIES";

    useFrame((state) => {
        if (!groupRef.current) return;

        const t = state.clock.elapsedTime;

        // Rotate the COMPLETE word around the AB logo
        groupRef.current.rotation.y = -t * 0.0;
    });

    return (
        <group
            ref={groupRef}
            position={[0, -1.85, 0]}
        >
            <Text3D
                font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
                size={0.16}
                height={0.018}
                curveSegments={8}
                position={[
                    -0.82,
                    0,
                    radius,
                ]}
                rotation={[
                    0,
                    0,
                    0,
                ]}
                bevelEnabled
                bevelThickness={0.003}
                bevelSize={0.002}
                bevelSegments={2}
            >
                TECHNOLOGIES

                <meshStandardMaterial
                    color={isDark ? "#062a63" : "#0ea5e9"}
                    emissive={isDark ? "#062a63" : "#bae6fd"}
                    emissiveIntensity={isDark ? 9.40 : 2.5}
                    metalness={0.8}
                    roughness={0.45}
                />
            </Text3D>
        </group>
    );
}


/* ============================================================
   ARTISTIC AB MONOGRAM
============================================================ */

function ArtisticABLogo() {
    const material = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: "#0ea5e9",
            metalness: 0.95,
            roughness: 0.12,
            emissive: "#0284c7",
            emissiveIntensity: 0.45,
        });
    }, []);

    const shape = useMemo(() => {
        const s =
            new THREE.Shape();

        s.moveTo(-1.35, -1.25);
        s.lineTo(-0.85, 1.25);
        s.lineTo(-0.30, 1.25);
        s.lineTo(0.10, 0.10);
        s.lineTo(0.55, 1.25);
        s.lineTo(1.10, 1.25);
        s.lineTo(1.40, -1.25);
        s.lineTo(0.85, -1.25);
        s.lineTo(0.72, -0.55);
        s.lineTo(0.05, -0.55);
        s.lineTo(-0.10, -1.25);
        s.closePath();

        const hole =
            new THREE.Path();

        hole.moveTo(-0.62, 0.55);
        hole.lineTo(-0.42, -0.30);
        hole.lineTo(0.58, -0.30);
        hole.lineTo(0.32, 0.55);
        hole.closePath();

        s.holes.push(hole);

        return s;
    }, []);

    return (
        <group
            position={[-0.1, -1, 0]}
            rotation={[0, 0, 0]}
            scale={1.15}
        >
            <mesh
                position={[0, 0, -0.18]}
            >
                <extrudeGeometry
                    args={[
                        shape,
                        {
                            depth: 0.35,
                            bevelEnabled: true,
                            bevelSegments: 6,
                            bevelSize: 0.045,
                            bevelThickness: 0.045,
                        },
                    ]}
                />

                <meshStandardMaterial
                    color="#0f172a"
                    metalness={1}
                    roughness={0.15}
                />
            </mesh>

            <mesh>
                <extrudeGeometry
                    args={[
                        shape,
                        {
                            depth: 0.30,
                            bevelEnabled: true,
                            bevelSegments: 8,
                            bevelSize: 0.055,
                            bevelThickness: 0.05,
                        },
                    ]}
                />

                <primitive
                    object={material}
                    attach="material"
                />
            </mesh>

            <mesh
                position={[0, 0, -0.03]}
                scale={1.03}
            >
                <shapeGeometry
                    args={[shape]}
                />

                <meshBasicMaterial
                    color="#7dd3fc"
                    transparent
                    opacity={0.18}
                    side={
                        THREE.DoubleSide
                    }
                />
            </mesh>
        </group>
    );
}



function ABLogo() {
    const groupRef = useRef();
    const isDark = useDarkMode();

    /* ----------------------------------------------------------
       TECHNOLOGY SURFACE
    ---------------------------------------------------------- */

    const techTexture =
        useTechnologyTexture();

    /* ----------------------------------------------------------
       AB ANIMATION
    ---------------------------------------------------------- */

    useFrame((state) => {
        if (!groupRef.current) return;

        const t =
            state.clock.elapsedTime;

        groupRef.current.rotation.y =
            Math.sin(t * 0.4) * 0.08;

        groupRef.current.rotation.x =
            Math.sin(t * 0.3) * 0.025;
    });

    return (
        <group
            ref={groupRef}
            position={[0, 0.4, 0]}
        >

            {/* ==================================================
                MAIN 3D AB
            ================================================== */}

            <Center
                position={[
                    0,
                    -0.7,
                    -0.08,
                ]}
            >
                <Text3D
                    font="https://threejs.org/examples/fonts/optimer_bold.typeface.json"
                    size={2.30}
                    height={0.68}
                    curveSegments={32}
                    bevelEnabled
                    bevelThickness={0.10}
                    bevelSize={0.055}
                    bevelOffset={0}
                    bevelSegments={8}
                >
                    AB

                    <meshStandardMaterial
                        map={techTexture}
                        metalness={0}
                        roughness={0}
                        emissive={isDark ? "#062a63" : "#062a63"}
                        emissiveIntensity={isDark ? 1.65 : 0.65}
                    />
                </Text3D>
            </Center>


            {/* ==================================================
                MAIN ORBIT
            ================================================== */}

            <mesh
                position={[
                    10,
                    -0.7,
                    0,
                ]}
                rotation={[
                    Math.PI / 3.5,
                    Math.PI / 4,
                    0,
                ]}
            >
                <torusGeometry
                    args={[
                        3,
                        0.028,
                        20,
                        160,
                    ]}
                />

                <meshStandardMaterial
                    color={isDark ? "#0ea5e9" : "#38bdf8"}
                    emissive={isDark ? "#0ea5e9" : "#7d3fc"}
                    emissiveIntensity={isDark ? 0.12 : 0.25}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>


            {/* ==================================================
                PLATFORM BODY
            ================================================== */}

            <mesh
                position={[
                    0,
                    -2.15,
                    0,
                ]}
            >
                <cylinderGeometry
                    args={[
                        2.6,
                        2.9,
                        0.38,
                        96,
                    ]}
                />

                <meshStandardMaterial
                    color={isDark ? "#0ea5e9" : "#38bdf8"}
                    metalness={0.95}
                    roughness={0.18}
                    emissive={isDark ? "#062a63" : "#e02fe"}
                    emissiveIntensity={isDark ? 0.35 : 0.55}
                />
            </mesh>


            {/* ==================================================
                PLATFORM TOP
            ================================================== */}

            <mesh
                position={[
                    0,
                    -1.95,
                    0,
                ]}
            >
                <cylinderGeometry
                    args={[
                        2.6,
                        2.6,
                        0.07,
                        96,
                    ]}
                />

                <meshStandardMaterial
                    color={isDark ? "#062a63" : "#e0f2fe"}
                    metalness={0.9}
                    roughness={0.18}
                    emissive={isDark ? "#062a63" : "#be6fd"}
                    emissiveIntensity={isDark ? 0.35 : 0.8}
                />
            </mesh>


            {/* ==================================================
                PLATFORM GLOW RING
            ================================================== */}

            <mesh
                position={[
                    0,
                    -1.91,
                    0,
                ]}
                rotation={[
                    Math.PI / 2,
                    0,
                    0,
                ]}
            >
                <torusGeometry
                    args={[
                        2.6,
                        0.045,
                        20,
                        160,
                    ]}
                />

                <meshStandardMaterial
                    color={isDark ? "#38bdf8" : "#0ea5e9"}
                    emissive={isDark ? "#062a63" : "#bae6fd"}
                    emissiveIntensity={isDark ? 1.2 : 2.0}
                />
            </mesh>


            {/* ==================================================
                INNER PLATFORM RING
            ================================================== */}

            <mesh
                position={[
                    0,
                    -1.90,
                    0,
                ]}
                rotation={[
                    Math.PI / 2,
                    0,
                    0,
                ]}
            >
                <torusGeometry
                    args={[
                        2.05,
                        0.018,
                        16,
                        120,
                    ]}
                />

                <meshStandardMaterial
                    color={isDark ? "#60a5fa" : "#38bdf8"}
                    emissive={isDark ? "#062a63" : "#60a5fa"}
                    emissiveIntensity={isDark ? 1.5 : -2.2}
                />
            </mesh>


            {/* ==================================================
                INNER ORBIT TEXT
            ================================================== */}

            <InnerOrbitText />


            {/* ==================================================
                OUTER ORBIT TEXT
            ================================================== */}

            <OrbitText />

        </group>
    );
}

/* ============================================================
   3D BACKGROUND
============================================================ */

function Background3D() {
    const globeRef = useRef();
    const isDark = useDarkMode();

    useFrame((state) => {
        if (!globeRef.current) return;

        const t =
            state.clock.elapsedTime;

        globeRef.current.rotation.y =
            t * 0.03;

        globeRef.current.rotation.x =
            Math.sin(t * 0.02) * 0.1;
    });

    const particleGeo = useMemo(() => {
        const count = 300;

        const positions =
            new Float32Array(
                count * 3
            );

        for (
            let i = 0;
            i < count;
            i++
        ) {
            positions[i * 3] =
                (Math.random() - 0.5) *
                30;

            positions[i * 3 + 1] =
                (Math.random() - 0.5) *
                20;

            positions[i * 3 + 2] =
                (Math.random() - 0.5) *
                20 -
                5;
        }

        const geo =
            new THREE.BufferGeometry();

        geo.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );

        return geo;
    }, []);

    return (
        <>
            <points
                geometry={particleGeo}
            >
                <pointsMaterial
                    size={0.055}
                    color={isDark ? "#7dd3fc" : "#0ea5e9"}
                    transparent
                    opacity={0.55}
                    sizeAttenuation
                />
            </points>
        </>
    );
}


/* ============================================================
   3D SCENE
============================================================ */

function Scene3D() {
    const isDark = useDarkMode();

    return (
        <div className="scene3d-container">
            <Canvas
                camera={{
                    position: [
                        0,
                        0.4,
                        9,
                    ],
                    fov: 40,
                }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference:
                        "high-performance",
                }}
            >
                <ambientLight
                    intensity={0.3}
                />

                <pointLight
                    position={[
                        5,
                        5,
                        5,
                    ]}
                    intensity={15}
                    distance={10}
                    color="#38bdf8"
                />

                <pointLight
                    position={[
                        -5,
                        2,
                        3,
                    ]}
                    intensity={9}
                    distance={8}
                    color="#818cf8"
                />

                <pointLight
                    position={[
                        0,
                        -3,
                        2,
                    ]}
                    intensity={10}
                    distance={7}
                    color="#0ea5e9"
                />

                <spotLight
                    position={[
                        0,
                        8,
                        5,
                    ]}
                    angle={0.45}
                    penumbra={1}
                    intensity={10}
                    color="#f0f9ff"
                />

                <Suspense fallback={null}>
                    <Float
                        speed={1.5}
                        rotationIntensity={
                            0.12
                        }
                        floatIntensity={
                            0.18
                        }
                        floatingRange={[
                            -0.12,
                            0.12,
                        ]}
                    >
                        <ABLogo />
                    </Float>

                    <ContactShadows
                        position={[
                            0,
                            -2.4,
                            0,
                        ]}
                        opacity={0.35}
                        scale={10}
                        blur={2.5}
                        far={4}
                        color={isDark ? "#0ea5e9" : "#38bdf8"}
                    />
                </Suspense>

                <Background3D />
            </Canvas>
        </div>
    );
}


/* ============================================================
   2D PARTICLE NETWORK
============================================================ */

function ParticleNetwork() {
    const canvasRef =
        useRef(null);

    useEffect(() => {
        const canvas =
            canvasRef.current;

        if (!canvas) return;

        const ctx =
            canvas.getContext("2d");

        let animationId;

        const resize = () => {
            const dpr =
                window.devicePixelRatio ||
                1;

            canvas.width =
                window.innerWidth *
                dpr;

            canvas.height =
                window.innerHeight *
                dpr;

            canvas.style.width =
                `${window.innerWidth}px`;

            canvas.style.height =
                `${window.innerHeight}px`;

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );
        };

        resize();

        window.addEventListener(
            "resize",
            resize
        );

        const particles = [];

        const count = 70;

        for (
            let i = 0;
            i < count;
            i++
        ) {
            particles.push({
                x:
                    Math.random() *
                    window.innerWidth,

                y:
                    Math.random() *
                    window.innerHeight,

                vx:
                    (Math.random() -
                        0.5) *
                    0.25,

                vy:
                    (Math.random() -
                        0.5) *
                    0.25,

                size:
                    Math.random() *
                    1.4 +
                    0.5,

                opacity:
                    Math.random() *
                    0.5 +
                    0.1,
            });
        }

        const animate = () => {
            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

            particles.forEach(
                (p) => {
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0)
                        p.x =
                            window.innerWidth;

                    if (
                        p.x >
                        window.innerWidth
                    )
                        p.x = 0;

                    if (p.y < 0)
                        p.y =
                            window.innerHeight;

                    if (
                        p.y >
                        window.innerHeight
                    )
                        p.y = 0;

                    ctx.beginPath();

                    ctx.arc(
                        p.x,
                        p.y,
                        p.size,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle =
                        `rgba(125,211,252,${p.opacity})`;

                    ctx.fill();
                }
            );

            for (
                let i = 0;
                i < particles.length;
                i++
            ) {
                for (
                    let j = i + 1;
                    j < particles.length;
                    j++
                ) {
                    const dx =
                        particles[i].x -
                        particles[j].x;

                    const dy =
                        particles[i].y -
                        particles[j].y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );

                    if (
                        distance < 120
                    ) {
                        ctx.beginPath();

                        ctx.moveTo(
                            particles[i].x,
                            particles[i].y
                        );

                        ctx.lineTo(
                            particles[j].x,
                            particles[j].y
                        );

                        ctx.strokeStyle =
                            `rgba(56,189,248,${0.12 *
                            (1 -
                                distance /
                                120)})`;

                        ctx.lineWidth = 0.5;

                        ctx.stroke();
                    }
                }
            }

            animationId =
                requestAnimationFrame(
                    animate
                );
        };

        animate();

        return () => {
            window.removeEventListener(
                "resize",
                resize
            );

            cancelAnimationFrame(
                animationId
            );
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="
                particle-canvas
                fixed
                inset-0
                z-0
                pointer-events-none
                opacity-20
                dark:opacity-60
            "
        />
    );
}


/* ============================================================
   MAIN HERO PAGE
============================================================ */

export default function HeroPage() {
    const features = [
        {
            icon: Check,
            title: "End-to-End",
            desc:
                "From planning to deployment",
        },

        {
            icon: Check,
            title: "Bulk Procurement",
            desc:
                "From devices to infrastructure",
        },

        {
            icon: Check,
            title: "Ongoing Support",
            desc:
                "Technology that stays supported",
        },

        {
            icon: TrendingUp,
            title: " One Partner. Complete IT",
            desc:
                "From scratch to scale.",
        },
    ];

    return (
        <main
            className="
                hero-page
                relative
                min-h-screen
                overflow-hidden
                bg-white
                text-slate-900
                dark:bg-[#030712]
                dark:text-slate-50
            "
        >
            {/* ==================================================
                BACKGROUND
            ================================================== */}

            <ParticleNetwork />

            <div className="hero-tech-background">
                <div className="hero-tech-grid" />

                <div className="hero-tech-glow hero-tech-glow-one" />

                <div className="hero-tech-glow hero-tech-glow-two" />

                <div className="hero-tech-lines">
                    <span />
                    <span />
                    <span />
                </div>
            </div>

            {/* ==================================================
                NAVIGATION
            ================================================== */}

            {/* ==================================================
                HERO
            ================================================== */}

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
        lg:pb-6
    "
                    >
                        {/* Top label row */}
                        <div
                            className="
            mb-6
            flex
            items-center
            justify-center
            gap-3
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-blue-400
            sm:justify-start
        "
                        >
                            <span
                                className="
                h-px
                w-6
                bg-blue-500
            "
                            />

                            Technology. Procurement. Infrastructure. Digital Transformation.
                        </div>

                        {/* Heading */}
                        <h1
                            className="
            hero-heading
            mx-auto
            max-w-[620px]
            text-center
            text-4xl
            font-bold
            leading-[1.02]
            tracking-[-3px]
            sm:mx-0
            sm:text-left
            sm:text-6xl
            lg:text-[52px]
            xl:text-[50px]
        "
                        >
                            Technology.  Simplified.

                            <span className="hidden block">
                                <span className="text-blue-500">
                                    Digital
                                </span>{" "}
                                Solutions
                            </span>
                        </h1>

                        {/* Paragraphs */}
                        <p
                            className="
            mx-auto
            mt-16
            max-w-[500px]
            text-center
            text-base
            leading-7
            text-slate-600/80
            sm:mx-0
            sm:text-left
            dark:text-white/50
        "
                        >
                            We handle all your technology needs from start to finish, so you can focus on your business goals without needing to be a tech expert.
                        </p>
                        <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-7 text-slate-500 sm:mx-0 sm:text-left">

                        </p>

                        {/* Buttons */}
                        <div
                            className="
            mt-9
            flex
            flex-wrap
            justify-center
            gap-4
            sm:justify-start
        "
                        >
                            <a
                                href="#services"
                                className="
                group
                inline-flex
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
                            </a>

                            <a
                                href="/support"
                                className="
                inline-flex
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                bg-slate-100/50
                px-6
                py-4
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:border-blue-500/40
                hover:bg-blue-50
                hover:text-blue-700
                dark:border-white/15
                dark:bg-white/[0.02]
                dark:text-white/80
                dark:hover:bg-blue-500/5
                dark:hover:text-white
            "
                            >
                                Start a Project
                            </a>
                        </div>
                    </div>

                    {/* RIGHT 3D SCENE */}

                    <div
                        className="
                            hero-visual
                            relative
                            pt-3
                            -mt-50
                            h-[480px]
                            w-full
                            sm:h-[540px]
                            lg:-mt-60
                            lg:h-[620px]
                        "
                    >
                        <Scene3D />
                    </div>
                </div>
            </section>

            {/* ==================================================
                FEATURES
            ================================================== */}

            <section
                className="
                    relative
                    z-30
                    mx-auto
                    max-w-[1280px]
                    px-2
                    pb-2
                    lg:px-2
                "
            >
                <div
                    className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    {features.map((feature) => {
                        const FeatureIcon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-100/60
                                    px-4
                                    py-3.5
                                    backdrop-blur-xl
                                    shadow-[0_8px_28px_rgba(0,0,0,.18)]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:border-sky-300
                                    hover:bg-white
                                    hover:shadow-[0_10px_35px_rgba(14,165,233,.07)]
                                    dark:border-white/[0.07]
                                    dark:bg-slate-950/45
                                    dark:hover:border-sky-400/20
                                    dark:hover:bg-slate-900/55
                                "
                            >
                                {/* subtle top highlight */}
                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-x-5
                                        top-0
                                        h-px
                                        bg-gradient-to-r
                                        from-transparent
                                        via-sky-400/35
                                        to-transparent
                                        opacity-0
                                        transition-opacity
                                        duration-300
                                        group-hover:opacity-100
                                    "
                                />

                                <div className="flex items-start gap-3">

                                    {/* Icon */}
                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            border-sky-200
                                            bg-sky-50
                                            text-sky-500
                                            transition-all
                                            duration-300
                                            group-hover:border-sky-300
                                            group-hover:bg-sky-100
                                            group-hover:text-sky-600
                                            dark:border-sky-400/15
                                            dark:bg-sky-400/[0.06]
                                            dark:text-sky-400
                                            dark:group-hover:border-sky-400/25
                                            dark:group-hover:bg-sky-400/[0.10]
                                            dark:group-hover:text-sky-300
                                        "
                                    >
                                        <FeatureIcon
                                            size={17}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="min-w-0 pt-0.5">
                                        <h3
                                            className="
                                                text-[13px]
                                                font-semibold
                                                tracking-tight
                                                text-slate-800
                                                transition-colors
                                                duration-300
                                                group-hover:text-slate-900
                                                dark:text-slate-100
                                                dark:group-hover:text-white
                                            "
                                        >
                                            {feature.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-1
                                                text-[11.5px]
                                                leading-[1.55]
                                                text-slate-500
                                                transition-colors
                                                duration-300
                                                group-hover:text-slate-600
                                                dark:text-slate-400
                                                dark:group-hover:text-slate-300
                                            "
                                        >
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}