import React, { useState, useEffect, useRef } from 'react';
import * as Three from 'three';
import { useFrame } from 'react-three-fiber';
import { useBox } from 'use-cannon';

const Character = (props) => {
  const [ref, api] = useBox(() => (
    { 
      mass: 1, 
      position: [1, 1, 0],
      fixedRotation: true
    })
  );
  const [position, setPosition] = useState([1, 1, 1]);
  const [moving, isMoving] = useState(false);
  let grounded = useRef(false);
  let isJumping = useRef(false);
  let jumpFramesOffset = 0;

  useEffect(() => {
    isMoving(!moving);

    document.addEventListener("keydown", event => {
      if(event.keyCode == 32) {
        Jump();
      }
    })
  }, []);

  useFrame(state => { 
    if(isJumping.current) {
      jumpFramesOffset++;
      if(jumpFramesOffset >= 20){
        jumpFramesOffset = 0;
        isJumping.current = false;
      }
    }

    if(!grounded.current && !isJumping.current && ref.current.position.y <= 0.5){
      grounded.current = true;
    }
    
    if(grounded.current) {
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

  const Jump = () => {
    if(grounded.current) {
      grounded.current = false;
      isJumping.current = true;
      api.velocity.set(3, 5, 0);
    }
  }

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={position} />
      <meshStandardMaterial attach="material" color={0x000000} />
    </mesh>
  );
}

export default Character;
