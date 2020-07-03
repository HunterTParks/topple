import React, { useState, useEffect } from "react";
import * as Three from "three";
import useShapeGenerator from "./helpers/ShapeGenerator"

class Game {
  constructor(newScene, newRenderer, newCamera) {
    this.scene = newScene;
    this.renderer = newRenderer;
    this.camera = newCamera;
  }
}

const App = () => {
  const [shapes, setShapes] = useShapeGenerator(5, 'spike', 2, {
    newColor: 0x00ff00,
    geometry: [4, 4, 5],
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
    shapes.rotation.x += 0.01;
    shapes.rotation.y += 0.01;
    game.renderer.render( game.scene, game.camera );
  }

  useEffect(() => {
    game = Initialize();

    game.renderer.setSize( window.innerWidth, window.innerHeight );
    game.scene.add(shapes);
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
