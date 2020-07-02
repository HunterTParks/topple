import React, { useEffect, useState } from 'react';
import * as Three from "three";

const useCubeGenerator = (
  newCount,
  offset = 5,
  options
) => {
  const [cubes, setCubes] = useState(new Three.Group());
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(newCount); 
  }, [])

  useEffect(() => {
    let difference = count - cubes.children.length;
    let currentOffset = 0;
    
    if(difference) {
      for(let i = 0; i <= difference - 1; i++) {
        // Generate Cube
        let mesh = new Three.Mesh(
          new Three.BoxGeometry(...options.geometry || 1, 1, 1),
          new Three.MeshBasicMaterial( { color: options.newColor || 0x00ff00 } )
        );
        
        // Generate Outline
        let boxGeometry = new Three.BoxBufferGeometry(...options.geometry || 1, 1, 1);
        let edges = new Three.EdgesGeometry( boxGeometry );
        let line = new Three.LineSegments(
          edges,
          new Three.LineBasicMaterial( { color: 0x000000 } )
        );

        // Set position for both Shape and outline
        mesh.position.x += currentOffset;
        line.position.x += currentOffset;
        currentOffset += offset;
        
        // Add Shape and outline to Group to be rendered
        setCubes(() => {
          let newCubes = cubes;
          newCubes.add(mesh);
          if(options.outline) newCubes.add(line);
          return newCubes;
        });
      }
    }
  }, [count]);

  return [cubes, setCubes];
}

export default useCubeGenerator;
