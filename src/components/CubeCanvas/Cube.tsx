import * as THREE from "three";
import { useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";

const rotationSpeed = 0.25;
const initialHue = 240;
const hueSpeed = 0.5;

type CubeProps = ThreeElements["mesh"] & {
  rainbow?: boolean;
};

export function Cube({ rainbow, ...props }: CubeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * rotationSpeed;
    meshRef.current.rotation.y += delta * rotationSpeed;
    meshRef.current.rotation.z += delta * rotationSpeed;

    if (rainbow) {
      const elapsedHueChanges =
        (state.clock.elapsedTime * 360 * hueSpeed) % 360;
      materialRef.current.color.setHSL(
        (initialHue + elapsedHueChanges) / 360,
        1,
        0.75
      );
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
