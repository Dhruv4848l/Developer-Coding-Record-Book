import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export interface HeatmapData {
  date: string;
  count: number;
}

function GalaxyStars({ heatmap }: { heatmap: HeatmapData[] }) {
  const dustRef = useRef<THREE.Points>(null);
  const activeRef = useRef<THREE.Points>(null);

  const { dustPositions, activePositions, dustColors, activeColors } = useMemo(() => {
    let rawData = heatmap || [];
    
    // Sort oldest to newest to form a spiral from inside out
    rawData = [...rawData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const count = rawData.length;
    // Fallback node count
    const totalNodes = count > 0 ? count : 365; 

    const dPositions: number[] = [];
    const dColors: number[] = [];
    const aPositions: number[] = [];
    const aColors: number[] = [];

    const activeBaseColor = new THREE.Color("#06b6d4"); // Supernova Cyan
    const dustBaseColor = new THREE.Color("#0f172a"); // Very dark slate dust

    const spiralArms = 4;
    const maxRadius = 15;

    for (let i = 0; i < totalNodes; i++) {
        const item = count > 0 ? rawData[i] : null;
        const subCount = item?.count || 0;

        // Position math: a spiral
        const progress = i / totalNodes;
        const radius = 0.5 + progress * maxRadius;
        const spinAngle = radius * 2.0; 
        const branchAngle = ((i % spiralArms) / spiralArms) * Math.PI * 2;
        
        // Random scattering for nebulous cloud effect
        const randomX = Math.pow(Math.random() * 2 - 1, 3) * (2.0 + progress * 2);
        const randomY = Math.pow(Math.random() * 2 - 1, 3) * (1.5 + progress);
        const randomZ = Math.pow(Math.random() * 2 - 1, 3) * (2.0 + progress * 2);

        const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
        const y = randomY * 0.4; // flatten the galaxy
        const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        if (subCount > 0) {
            aPositions.push(x, y, z);
            // More problems solved = brighter/whiter cyan
            const intensity = Math.min(1, subCount / 8);
            const mixed = dustBaseColor.clone().lerp(activeBaseColor, 0.4 + intensity * 0.6);
            if (intensity > 0.8) mixed.lerp(new THREE.Color("#ffffff"), 0.5); // supernova white core
            aColors.push(mixed.r, mixed.g, mixed.b);
        } else {
            dPositions.push(x, y, z);
            dColors.push(dustBaseColor.r, dustBaseColor.g, dustBaseColor.b);
        }
    }
    
    return {
        dustPositions: new Float32Array(dPositions),
        dustColors: new Float32Array(dColors),
        activePositions: new Float32Array(aPositions),
        activeColors: new Float32Array(aColors)
    };
  }, [heatmap]);

  useFrame((state) => {
    if (dustRef.current) dustRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    if (activeRef.current) activeRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group>
        {dustPositions.length > 0 && (
            <points ref={dustRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={dustPositions.length / 3} array={dustPositions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={dustColors.length / 3} array={dustColors} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.12} vertexColors sizeAttenuation transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
            </points>
        )}

        {activePositions.length > 0 && (
            <points ref={activeRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={activePositions.length / 3} array={activePositions} itemSize={3} />
                    <bufferAttribute attach="attributes-color" count={activeColors.length / 3} array={activeColors} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.55} vertexColors sizeAttenuation transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
            </points>
        )}
    </group>
  );
}

export function GalaxyHeatmap({ data }: { data: HeatmapData[] }) {
    if (!data) return null;
    
    const activeDays = data.filter(d => d.count > 0).length;
    
    return (
        <div className="w-full h-96 rounded-2xl bg-[#020202] border border-cyan-900/40 overflow-hidden relative shadow-[inset_0_0_80px_rgba(6,182,212,0.05)] group">
           <div className="absolute top-6 left-6 z-10 pointer-events-none">
              <h3 className="text-cyan-400 font-black tracking-[0.3em] uppercase text-sm drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">Activity Galaxy</h3>
              <p className="text-cyan-100/50 font-mono text-xs mt-2 uppercase tracking-wider">{activeDays} Supernovas Detected</p>
           </div>
           
           {/* Controls Hint */}
           <div className="absolute bottom-4 right-6 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <span className="text-cyan-500/30 text-[10px] font-mono tracking-[0.4em] uppercase">Drag Orbit // Scroll Zoom</span>
           </div>

           <Canvas camera={{ position: [0, 10, 20], fov: 60 }} className="w-full h-full cursor-crosshair">
              <color attach="background" args={['#020202']} />
              <ambientLight intensity={0.5} />
              <GalaxyStars heatmap={data} />
              <OrbitControls enablePan={false} enableZoom={true} autoRotate autoRotateSpeed={0.8} maxDistance={40} minDistance={5} />
           </Canvas>
        </div>
    );
}
