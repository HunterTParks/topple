import React, { useState, useEffect, useRef, useMemo } from "react";
import * as Three from "three";
import { Canvas, useFrame, extend, useUpdate } from 'react-three-fiber';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe';
import { Sky, PerspectiveCamera } from 'drei';
import useShapeGenerator from "./helpers/ShapeGenerator";
import CameraSettings from "./cameraSettings";
import "./styles/App.less";

extend({ LineMaterial, WireframeGeometry2, Wireframe }); 

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
      {track.map((item, index) => (<>
          <mesh position={[item.offset, 0, 0]} key={index}>
            <boxBufferGeometry attach="geometry" args={item.args} />
            <meshStandardMaterial attach="material" color={item.color} transparent />
          </mesh>
          <TrackOutline index={index + track.length} args={item.args} color={0x000000} offset={item.offset} key={index + track.length} />
      </>)
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
  const cam = useRef();
  const threeDCamera = CameraSettings.threeD;
  console.log('3D Camera settings: ', threeDCamera);

  return (
    <>
      <Canvas colorManagement>
        <PerspectiveCamera ref={cam} position={[-2, -2.5, 2]} rotation={[0.2, 1, 0]}>
          <ambientLight />
          <Track counter={100} />
        </PerspectiveCamera>
      </Canvas>
    </>
  );
};

export default App;
