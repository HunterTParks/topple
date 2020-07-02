import React, { useEffect, useState } from 'react';
import * as Three from "three";

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

export default useCubeGenerator;
