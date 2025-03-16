import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Cube } from "@/components/CubeCanvas/Cube";
import { DragControls, useCursor } from "@react-three/drei";
import * as THREE from "three";
import type { CanvasProps } from "@react-three/fiber";

const lightIntensity = 1.5;

export function CubeScene() {
  const [drag, setDrag] = useState(false);
  const [hover, setHover] = useState(false);

  const dragMatrix = useRef(new THREE.Matrix4());

  useCursor(hover, "grab", "auto");
  useCursor(drag, "grabbing", "auto");

  useFrame(() => {
    if (!drag) {
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      const scale = new THREE.Vector3();

      dragMatrix.current.decompose(position, quaternion, scale);
      position.multiplyScalar(0.95);
      dragMatrix.current.compose(position, quaternion, scale);
    }
  });

  return (
    <>
      <ambientLight intensity={lightIntensity / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={lightIntensity}
      />
      <pointLight
        position={[-10, -10, -10]}
        decay={0}
        intensity={lightIntensity}
      />

      <DragControls
        autoTransform={false}
        matrix={dragMatrix.current}
        onHover={setHover}
        onDragEnd={() => setDrag(false)}
        onDrag={(localMatrix) => dragMatrix.current.copy(localMatrix)}
        dragLimits={[[-2, 2], [-2, 2], undefined]}
      >
        <Cube
          position={[0, 0, 0]}
          onPointerDown={() => setDrag(true)}
          rainbow={drag}
        />
      </DragControls>
    </>
  );
}

export function CubeCanvas(props: CanvasProps) {
  return (
    <Canvas
      camera={{
        fov: 25,
        position: [0, 0, 10],
      }}
      {...props}
    >
      <CubeScene />
    </Canvas>
  );
}
