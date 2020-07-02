import React, { useState, useEffect } from "react";
import * as Three from "three";
import useCubeGenerator from "./helpers/CubeGenerator"

class Game {
  constructor(newScene, newRenderer, newCamera) {
    this.scene = newScene;
    this.renderer = newRenderer;
    this.camera = newCamera;
  }
}

const App = () => {
  const [cubes, setCubes] = useCubeGenerator(5, 1, {
    newColor: 0x00ff00,
    geometry: [1, 1, 1],
    outline: true
  });

  let game,
      scene,
      renderer,
      camera,
      geometry,
      material

  const Initialize = () => {
    return new Game(
      new Three.Scene(),
      new Three.WebGLRenderer(),
      new Three.PerspectiveCamera( 75,
        window.innerWidth / window.innerHeight,
        0.1, 
        1000
      )
    );
  }

  const animate = () => {
    requestAnimationFrame( animate );
    game.renderer.render( game.scene, game.camera );
  }

  useEffect(() => {
    game = Initialize();

    game.renderer.setSize( window.innerWidth, window.innerHeight );
    game.scene.add(cubes);
    game.camera.position.z = 10;
  
    document.getElementById('game').appendChild(game.renderer.domElement);

    animate();
    
  }, []);

  return (
    <div id="game">
    </div>
  );
};

export default App;
