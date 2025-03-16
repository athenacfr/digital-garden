import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const useRainbowColor = (saturation: number, lightness: number) => {
  const color = useRef(new THREE.Color());

  useFrame((state) => {
    const steps = [240, 300, 0, 30, 60, 120];
    const stepsAmount = steps.length;

    const cycleDuration = 2;
    const cycleElapsedTime = state.clock.elapsedTime % cycleDuration;

    const stepDuration = cycleDuration / stepsAmount;
    const stepElapsedTime = cycleElapsedTime % stepDuration;

    const stepProgress = stepElapsedTime / stepDuration;

    const currentStep =
      Math.floor(cycleElapsedTime / stepDuration) % stepsAmount;
    const nextStep = (currentStep + 1) % stepsAmount;

    const currentHue = steps[currentStep] / 360;
    const nextHue = steps[nextStep] / 360;

    color.current.lerpColors(
      new THREE.Color().setHSL(currentHue, saturation, lightness),
      new THREE.Color().setHSL(nextHue, saturation, lightness),
      stepProgress
    );
  });

  return color;
};
