import * as THREE from "three";
import React, {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import {
  Canvas,
  useFrame,
  useThree,
  type ThreeElements,
} from "@react-three/fiber";

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hover, setHover] = useState(false);
  const [dragging, setDragging] = useState(false);
  const rotationSpeed = 0.5;
  const { gl } = useThree();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * rotationSpeed;
    meshRef.current.rotation.y += delta * rotationSpeed;
    meshRef.current.rotation.z += delta * rotationSpeed;

    if (!dragging) {
      meshRef.current.position.x *= 0.95;
      meshRef.current.position.y *= 0.95;
    }

    if (dragging) {
      const x = (state.pointer.x * state.viewport.width) / 2;
      const y = (state.pointer.y * state.viewport.height) / 2;
      meshRef.current.position.x = x;
      meshRef.current.position.y = y;
    }
  });

  useEffect(() => {
    if (hover && !dragging) {
      gl.domElement.style.cursor = "grab";
    } else if (dragging) {
      gl.domElement.style.cursor = "grabbing";
    } else {
      gl.domElement.style.cursor = "auto";
    }
  }, [hover, dragging]);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={(e) => {
        setHover(true);
      }}
      onPointerOut={(e) => {
        setHover(false);
        setDragging(false);
      }}
      onPointerDown={(e) => {
        setDragging(true);
      }}
      onPointerUp={(e) => {
        setDragging(false);
      }}
      scale={hover ? 1.05 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
}

export function BoxScene(props: ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props}>
      <Canvas
        camera={{
          fov: 25,
          position: [0, 0, 10],
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
