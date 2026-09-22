import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    Sparkles,
    PerspectiveCamera,
    Environment,
} from "@react-three/drei";

import * as THREE from "three";


/* =========================================================
   AB LOGO
========================================================= */

function ABLogo() {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        group.current.rotation.y =
            Math.sin(t * 0.35) * 0.08;

        group.current.rotation.x =
            Math.sin(t * 0.3) * 0.025;
    });

    return (
        <group
            ref={group}
            position={[0, 0.65, 0]}
            rotation={[0.05, -0.2, 0]}
            scale={1.65}
        >

            {/* A */}
            <mesh position={[-0.72, 0, 0]}>
                <extrudeGeometry
                    args={[
                        new THREE.Shape()
                            .moveTo(0, -0.9)
                            .lineTo(0.35, 0.9)
                            .lineTo(0.7, 0.9)
                            .lineTo(1.05, -0.9)
                            .lineTo(0.7, -0.9)
                            .lineTo(0.62, -0.45)
                            .lineTo(0.35, -0.45)
                            .lineTo(0.27, -0.9)
                            .closePath(),
                        {
                            depth: 0.28,
                            bevelEnabled: true,
                            bevelSegments: 5,
                            bevelSize: 0.035,
                            bevelThickness: 0.035,
                        },
                    ]}
                />

                <meshStandardMaterial
                    color="#0759ff"
                    metalness={0.9}
                    roughness={0.2}
                    emissive="#003cff"
                    emissiveIntensity={0.12}
                />
            </mesh>


            {/* B */}
            <mesh position={[0.05, 0, 0.02]}>
                <extrudeGeometry
                    args={[
                        new THREE.Shape()
                            .moveTo(0, -0.9)
                            .lineTo(0, 0.9)
                            .lineTo(0.6, 0.9)
                            .bezierCurveTo(
                                1.15,
                                0.9,
                                1.3,
                                0.55,
                                1.0,
                                0.2
                            )
                            .bezierCurveTo(
                                1.4,
                                -0.1,
                                1.2,
                                -0.9,
                                0.55,
                                -0.9
                            )
                            .closePath(),
                        {
                            depth: 0.28,
                            bevelEnabled: true,
                            bevelSegments: 5,
                            bevelSize: 0.035,
                            bevelThickness: 0.035,
                        },
                    ]}
                />

                <meshStandardMaterial
                    color="#0d5fff"
                    metalness={0.95}
                    roughness={0.17}
                    emissive="#0048ff"
                    emissiveIntensity={0.15}
                />
            </mesh>

        </group>
    );
}


/* =========================================================
   ORBIT
========================================================= */

function Orbit() {
    const ring = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        ring.current.rotation.z = t * 0.18;
    });

    return (
        <group
            ref={ring}
            rotation={[Math.PI / 2.55, 0, -0.15]}
        >

            <mesh>

                <torusGeometry
                    args={[
                        2.45,
                        0.025,
                        20,
                        160,
                    ]}
                />

                <meshStandardMaterial
                    color="#2778ff"
                    emissive="#0865ff"
                    emissiveIntensity={5}
                    metalness={0.8}
                    roughness={0.15}
                />

            </mesh>

        </group>
    );
}


/* =========================================================
   PLATFORM
========================================================= */

function Platform() {

    return (
        <group position={[0, -1.25, 0]}>

            {/* Main platform */}
            <mesh>

                <cylinderGeometry
                    args={[
                        2.25,
                        2.25,
                        0.16,
                        96,
                    ]}
                />

                <meshStandardMaterial
                    color="#020b20"
                    metalness={0.95}
                    roughness={0.2}
                    emissive="#001e68"
                    emissiveIntensity={0.25}
                />

            </mesh>


            {/* Glowing top ring */}
            <mesh position={[0, 0.09, 0]}>

                <torusGeometry
                    args={[
                        2.05,
                        0.035,
                        16,
                        128,
                    ]}
                />

                <meshStandardMaterial
                    color="#1774ff"
                    emissive="#0864ff"
                    emissiveIntensity={7}
                />

            </mesh>


            {/* Inner ring */}
            <mesh position={[0, 0.095, 0]}>

                <torusGeometry
                    args={[
                        1.65,
                        0.012,
                        12,
                        100,
                    ]}
                />

                <meshStandardMaterial
                    color="#0d4ed7"
                    emissive="#0b54ff"
                    emissiveIntensity={4}
                />

            </mesh>

        </group>
    );
}


/* =========================================================
   COMPLETE SCENE
========================================================= */

function Scene() {

    return (
        <>

            <PerspectiveCamera
                makeDefault
                position={[0, 1.2, 7]}
                fov={38}
            />


            {/* Main lighting */}
            <ambientLight intensity={0.15} />

            <pointLight
                position={[2, 4, 3]}
                intensity={12}
                distance={8}
                color="#2878ff"
            />

            <pointLight
                position={[-3, 1, 2]}
                intensity={8}
                distance={7}
                color="#124fff"
            />

            <pointLight
                position={[0, -2, 2]}
                intensity={6}
                distance={6}
                color="#0055ff"
            />


            {/* 3D AB */}
            <Float
                speed={1}
                rotationIntensity={0.08}
                floatIntensity={0.2}
            >

                <ABLogo />

            </Float>


            {/* Orbit */}
            <Orbit />


            {/* Platform */}
            <Platform />


            {/* Particles */}
            <Sparkles
                count={180}
                scale={[7, 5, 5]}
                size={1.5}
                speed={0.25}
                opacity={0.65}
                color="#3180ff"
            />


            <Environment preset="night" />

        </>
    );
}


/* =========================================================
   CANVAS
========================================================= */

export default function ABScene() {

    return (

        <div className="absolute inset-0">

            <Canvas
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
            >

                <Scene />

            </Canvas>

        </div>

    );
}