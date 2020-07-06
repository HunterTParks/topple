import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as Three from "three";
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { Physics, usePlane, useBox } from 'use-cannon';
import { PerspectiveCamera } from 'drei';
import CameraSettings from "./cameraSettings";
import "./styles/App.less";

const Track = (props) => {
  const [track, setTrack] = useState([]);
  const [counter, setCounter] = useState(0);
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  let offset = 0;

  useEffect(() => {
    setCounter(props.counter);
  }, []);

  useEffect(() => {
    const args = [1, 1, 1];
    let newTrack = [];
    for(let i = 0; i <= counter - 1; i++) {
      // Track Item
      newTrack.push({
        color: 0x00FF00,
        args: args,
        offset: offset,
        type: 'track' 
      });

      /**
       * TODO: The offset needs to change based on how big the 
       *       individual squares of the track should get
       *
       */
      offset += 1;
    } 

    setTrack(newTrack);
  }, [counter]);
  
  return (
    <>
      {track.map((item, index) => (
        <React.Fragment key={index}>
          <mesh position={[item.offset, -0.5, 0]} ref={ref}>
            <boxBufferGeometry attach="geometry" args={item.args} />
            <meshStandardMaterial attach="material" color={item.color} transparent />
          </mesh>
          <TrackOutline index={index + track.length} args={item.args} color={0x000000} offset={item.offset} key={index + track.length} />
        </React.Fragment>)
      )}
    </>
  );
}

const TrackOutline = (args) => {
  const geometry = useMemo(() => new Three.BoxBufferGeometry(args.args));

  return (
    <mesh position={[args.offset, -0.5, 0]} key={args.index}>
      <boxBufferGeometry attach="geometry" args={args.args} />
      <meshStandardMaterial attach="material" color={args.color} transparent wireframe={true}/>
    </mesh>
  );
}

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

const App = () => {
  const [dimension, setDimension] = useState(3);
  const CameraPositionAndRotation = dimension == 2 ? CameraSettings.twoD : CameraSettings.threeD;
  const cam = useRef();

  return (
    <>
      <Canvas colorManagement>
          <ambientLight />
          <Physics>
            <Track counter={100} />
            <Character 
              cameraPosition={CameraPositionAndRotation.position} 
            >
              <PerspectiveCamera 
                ref={cam} 
              />
            </Character>
          </Physics>
      </Canvas>
    </>
  );
};

export default App;
