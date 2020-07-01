import React, { useState, useEffect } from "react";
import * as Three from "three";

class Game {
  constructor(newScene, newRenderer, newCamera) {
    this.scene = newScene;
    this.renderer = newRenderer;
    this.camera = newCamera;
  }
}

const App = () => {
  let game,
      scene,
      renderer,
      camera,
      geometry,
      material,
      cube;

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
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    game.renderer.render( game.scene, game.camera );
  }

  useEffect(() => {
    game     = Initialize();
    geometry = new Three.BoxGeometry(1, 1, 1);
    material = new Three.MeshBasicMaterial( { color: 0x00ff00 } );
    cube     = new Three.Mesh( geometry, material );

    game.renderer.setSize( window.innerWidth, window.innerHeight );
    game.scene.add( cube );
    game.camera.position.z = 5;
  
    document.getElementById('game').appendChild(game.renderer.domElement);

    animate();
    
  }, []);

  return (
    <div id="game">
    </div>
  );
};

export default App;
