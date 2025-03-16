import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Cube } from "@/components/CubeCanvas/Cube";
import { DragControls, useCursor } from "@react-three/drei";
import * as THREE from "three";

const lightIntensity = 1.5;

export function CubeScene(props: ComponentPropsWithoutRef<"div">) {
  const [drag, setDrag] = useState(false);
  const [hover, setHover] = useState(false);

  const hoverMatrix = useRef(new THREE.Matrix4()).current;

  useCursor(hover, "grab", "auto");
  useCursor(drag, "grabbing", "auto");

  useFrame(() => {
    if (!drag) {
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      const scale = new THREE.Vector3();

      hoverMatrix.decompose(position, quaternion, scale);
      position.multiplyScalar(0.95);
      hoverMatrix.compose(position, quaternion, scale);
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
        matrix={hoverMatrix}
        onHover={setHover}
        onDragEnd={() => setDrag(false)}
        onDrag={(localMatrix) => hoverMatrix.copy(localMatrix)}
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

export function CubeCanvas(props: ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props}>
      <Canvas
        camera={{
          fov: 25,
          position: [0, 0, 10],
        }}
      >
        <CubeScene />
      </Canvas>
    </div>
  );
}
