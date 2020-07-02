import React, { useState, useEffect } from "react";
import * as Three from "three";

class Game {
  constructor(newScene, newRenderer, newCamera) {
    this.scene = newScene;
    this.renderer = newRenderer;
    this.camera = newCamera;
  }
}

const useCubeGenerator = (newCount, newColor = 0x00ff00, geometry = [1, 1, 1]) => {
  const [cubes, setCubes] = useState(new Three.Group());
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(newCount); 
  }, [])

  useEffect(() => {
    let difference = count - cubes.children.length;
    let offset = 0;
    
    if(difference) {
      for(let i = 0; i <= difference - 1; i++) {
        let mesh = new Three.Mesh(
          new Three.BoxGeometry(...geometry),
          new Three.MeshBasicMaterial( { color: newColor } )
        );

        mesh.position.x += offset;
        offset += 2;

        setCubes(() => {
          let newCubes = cubes;
          newCubes.add(mesh);
          return newCubes;
        });
      }
    }
  }, [count]);

  return [cubes, setCubes];
}

const App = () => {
  const [cubes, setCubes] = useCubeGenerator(5);

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
    cubes.rotation.x += 0.01;
    cubes.rotation.y += 0.01;
    game.renderer.render( game.scene, game.camera );
  }

  useEffect(() => {
    game = Initialize();

    game.renderer.setSize( window.innerWidth, window.innerHeight );
    game.scene.add(cubes);
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
