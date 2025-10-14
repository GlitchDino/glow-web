'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, createPortal } from '@react-three/fiber';
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

// Glass Bar Component - closer to original
function GlassBar() {
  const ref = useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF('/assets/3d/bar.glb');
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    const { gl, viewport, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    // Position at top - adjusted for better visibility
    const destY = v.height / 2 - 0.15;
    easing.damp3(ref.current.position, [0, destY, 15], 0.15, delta);

    // Scale much larger to fill the width
    const scaleX = v.width * 0.45; // Much wider
    const scaleY = 0.08; // Thinner for navbar height
    const scaleZ = 0.08;
    
    easing.damp3(ref.current.scale, [scaleX, scaleY, scaleZ], 0.15, delta);

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(<group />, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh 
        ref={ref} 
        rotation-x={Math.PI / 2} 
        geometry={(nodes.Cube as THREE.Mesh)?.geometry}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          transmission={0.95}
          roughness={0.1}
          thickness={3}
          ior={1.2}
          chromaticAberration={0.05}
          anisotropy={0.3}
          color="#ffffff"
          attenuationColor="#ffffff"
          attenuationDistance={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </>
  );
}

// Main Glass Nav Component
export default function GlassCardNav({ 
  logo = "https://via.placeholder.com/150x56/111/fff?text=LOGO",
  logoAlt = "Logo",
  buttonText = "Waitlist",
  onButtonClick = () => console.log('Button clicked'),
  className = ""
}: {
  logo?: string;
  logoAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}) {
  return (
    <div 
      style={{ 
        position: 'absolute',
        top: '2em',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '800px',
        height: '60px',
        zIndex: 99
      }} 
      className={className}
    >
      {/* Three.js Glass Effect */}
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none'
      }}>
        <Canvas 
          camera={{ position: [0, 0, 20], fov: 15 }} 
          gl={{ alpha: true }}
          style={{ background: 'transparent' }}
        >
          <GlassBar />
        </Canvas>
      </div>

      {/* Nav Content Overlay */}
      <div style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1.1rem',
        zIndex: 2,
        pointerEvents: 'auto'
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <img 
            src={logo} 
            alt={logoAlt} 
            style={{ 
              height: '56px', 
              width: 'auto',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }} 
          />
        </div>

        <button
          onClick={onButtonClick}
          style={{
            marginLeft: 'auto',
            backgroundColor: '#111',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0 1rem',
            height: 'calc(100% - 16px)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '14px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111'}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}