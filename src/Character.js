import React, { useState, useEffect } from 'react';
import * as Three from 'three';
import { useFrame } from 'react-three-fiber';
import { useBox } from 'use-cannon';

const Character = (props) => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [1, 1, 0] }))
  const [position, setPosition] = useState([1, 1, 1]);
  const [moving, isMoving] = useState(false);
  const [grounded, setGrounded] = useState(false);

  useEffect(() => {
    isMoving(!moving);
  }, []);

  useFrame(state => { 
    if(!grounded && ref.current.position.y <= 0.5)
      setGrounded(true);
    
    if(grounded) {
      api.velocity.set(3, 0, 0);
      state.camera.position.set(
        ref.current.position.x - 2,
        props.cameraPosition[1],
        -props.cameraPosition[2]
      );
      state.camera.lookAt(ref.current.position);
      state.camera.updateProjectionMatrix();
    }
  });

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={position} />
      <meshStandardMaterial attach="material" color={0x000000} />
    </mesh>
  );
}

export default Character;
