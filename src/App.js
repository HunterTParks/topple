import React, { useState, useEffect, useRef, useMemo } from "react";
import * as Three from "three";
import { Canvas, useFrame} from 'react-three-fiber';
import { PerspectiveCamera } from 'drei';
import CameraSettings from "./cameraSettings";
import "./styles/App.less";

const Track = (newCounter) => {
  const [track, setTrack] = useState([]);
  const [counter, setCounter] = useState(0);
  let offset = 0;

  useEffect(() => {
    setCounter(newCounter.counter);
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
          <mesh position={[item.offset, 0, 0]} >
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
    <mesh position={[args.offset, 0, 0]} key={args.index}>
      <boxBufferGeometry attach="geometry" args={args.args} />
      <meshStandardMaterial attach="material" color={args.color} transparent wireframe={true}/>
    </mesh>
  );
}

const App = () => {
  const [dimension, setDimension] = useState(3);
  const cam = useRef();
  const CameraPositionAndRotation = dimension == 2 ? CameraSettings.twoD : CameraSettings.threeD;

  return (
    <>
      <Canvas colorManagement>
        <PerspectiveCamera ref={cam} position={CameraPositionAndRotation.position} rotation={CameraPositionAndRotation.rotation}>
          <ambientLight />
          <Track counter={100} />
        </PerspectiveCamera>
      </Canvas>
    </>
  );
};

export default App;
