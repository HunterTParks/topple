import React, { useState, useEffect, useRef } from 'react';
import * as Three from 'three';
import { useFrame } from 'react-three-fiber';
import { useBox } from 'use-cannon';
import PropTypes from 'prop-types';

const Character = (props) => {
  const [ref, api] = useBox(() => (
    { 
      mass: 1, 
      position: [1, 1, 0],
      fixedRotation: true,
      onCollide: HandleCollisionDetection
    })
  );
  const [position, setPosition] = useState([1, 1, 1]);
  const [moving, isMoving] = useState(false);
  let grounded = useRef(false);

  useEffect(() => {
    isMoving(!moving);

    document.addEventListener("keydown", event => {
      if(event.keyCode == 32) {
        Jump();
      }
    });
  }, []);

  useFrame(state => { 
    if(grounded.current) {
      api.velocity.set(props.speed, 0, 0);
    }
    
    AlignCamera(state);
    HandleCollisionDetection();
  });

  const AlignCamera = state => {
      state.camera.position.set(
        ref.current.position.x - 2,
        props.cameraPosition[1],
        -props.cameraPosition[2]
      );
      state.camera.lookAt(ref.current.position);
      state.camera.updateProjectionMatrix();
  }

  const HandleCollisionDetection = event => {
    if(event && event.target.geometry.type == "BoxBufferGeometry") {
      grounded.current = true;
    }
  }

  const Jump = () => {
    if(grounded.current) {
      grounded.current = false;
      api.velocity.set(props.speed, 5, 0);
    }
  }

  return (
    <mesh ref={ref} >
      <boxBufferGeometry attach="geometry" args={position} />
      <meshStandardMaterial attach="material" color={0x000000} />
    </mesh>
  );
}

Character.propTypes = {
  speed: PropTypes.number,
  cameraPosition: PropTypes.array
}

export default Character;
