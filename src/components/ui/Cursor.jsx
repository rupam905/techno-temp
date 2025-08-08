import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedCursorModel() {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/animedrone1.glb');
  const { actions } = useAnimations(animations, group);

  const [targetPos, setTargetPos] = useState(new THREE.Vector3());
  const currentPos = useRef(new THREE.Vector3());
  const { camera, size } = useThree();

  const DRONE_SCALE = 0.5;

  // Manual rotation tracking
  const isDragging = useRef(false);
  const prevMouseX = useRef(0);
  const manualRotationY = useRef(0);
  const autoRotationY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / size.width) * 2 - 1;
      const y = -(e.clientY / size.height) * 2 + 1;

      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      setTargetPos(pos);

      // If dragging, update manual rotation
      if (isDragging.current) {
        const deltaX = e.clientX - prevMouseX.current;
        manualRotationY.current += deltaX * 0.01; // Sensitivity
        prevMouseX.current = e.clientX;
      }
    };

    const handleMouseDown = (e) => {
      isDragging.current = true;
      prevMouseX.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [camera, size.width, size.height]);

  // Play GLTF animations
  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.reset().fadeIn(0.5).play();
    });
  }, [actions]);

  // Smooth follow and combine rotations
  useFrame((_, delta) => {
    if (group.current) {
      // Smooth follow
      currentPos.current.lerp(targetPos, 0.01);
      group.current.position.copy(currentPos.current);

      // Auto-rotate
      autoRotationY.current += delta * 0.5;

      // Combine auto + manual rotation
      group.current.rotation.y = autoRotationY.current + manualRotationY.current;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={DRONE_SCALE}
    />
  );
}

useGLTF.preload('/models/animedrone1.glb');

export default function Cursor({ isVisible }) {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999] transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Canvas
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="!bg-transparent"
        style={{ pointerEvents: 'none' }} // 👈 This is the fix
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} />
        <AnimatedCursorModel />
      </Canvas>
    </div>
  );
}