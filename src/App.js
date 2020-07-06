import React, { useState, useRef } from "react";
import * as Three from "three";
import { Canvas } from 'react-three-fiber';
import { Physics } from 'use-cannon';
import { PerspectiveCamera } from 'drei';
import Track from './environment/Track';
import Character from './Character';
import CameraSettings from "./cameraSettings";
import "./styles/App.less";


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
