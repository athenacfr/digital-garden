import * as THREE from "three";
import { useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useRainbowColor } from "@/components/CubeCanvas/useRainbowColor";

const rotationSpeed = 0.25;

type CubeProps = ThreeElements["mesh"] & {
  rainbow?: boolean;
};

export function Cube({ rainbow, ...props }: CubeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  const rainbowColorRef = useRainbowColor(1, 0.7);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * rotationSpeed;
    meshRef.current.rotation.y += delta * rotationSpeed;
    meshRef.current.rotation.z += delta * rotationSpeed;

    if (rainbow) {
      materialRef.current.color.set(rainbowColorRef.current);
    } else {
      materialRef.current.color.setHex(0xf0f0f0);
    }
  });

  return (
    <mesh ref={meshRef} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={materialRef} opacity={1} />
    </mesh>
  );
}
