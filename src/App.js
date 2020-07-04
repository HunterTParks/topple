import React, { useState, useEffect, useRef } from "react";
import * as Three from "three";
import { Canvas, useFrame } from 'react-three-fiber';
import { Sky, PerspectiveCamera } from 'drei';
import useShapeGenerator from "./helpers/ShapeGenerator";
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
    let newTrack = [];
    for(let i = 0; i <= counter - 1; i++) {
      newTrack.push({
        color: 0x00FF00,
        args: [1, 1, 1],
        offset: offset
      });
      
      /**
       * TODO: The offset needs to change based on how big the 
       *       individual squares of the track should get
       *
       */
      offset += 0.5;
    } 

    setTrack(newTrack);
  }, [counter]);
  
  return (
    <>
      {track.map((item, index) => {
        return <mesh key={index} position={[item.offset, 0, 0]}>
          <boxBufferGeometry attach="geometry" args={item.args} />
          <meshStandardMaterial attach="material" color={item.color} transparent />
        </mesh>
      })}
    </>
  );
}

const App = () => {
  const cam = useRef();

  return (
    <>
      <Canvas colorManagement>
        <ambientLight />
        <Sky />
        <PerspectiveCamera ref={cam} position={[0, 0, 20]} />
        <Track counter={10} />
      </Canvas>
    </>
  );
};

export default App;
