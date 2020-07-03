import React, { useEffect, useState } from 'react';
import * as Three from "three";

const useCubeGenerator = (
  newCount,
  shape,
  offset = 5,
  options
) => {
  const [shapes, setShapes] = useState(new Three.Group());
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(newCount); 
  }, [])

  useEffect(() => {
    let difference = count - shapes.children.length;
    let currentOffset = 0;
    
    if(difference) {
        for(let i = 0; i <= difference - 1; i++) {
            let newShape;
            let outline;
            
            switch(shape) {
                case 'spike':
                    let checkSpikeGeometry = options.geometry || [2, 2, 4];
                    newShape = new Three.Mesh(
                        new Three.ConeGeometry(...checkSpikeGeometry),
                        new Three.MeshBasicMaterial( { color: 0xFFFFFF } )
                    );
                    
                    outline = new Three.LineSegments(
                        new Three.EdgesGeometry( new Three.ConeGeometry(...checkSpikeGeometry) ),
                        new Three.LineBasicMaterial( { color: 0x000000 } )
                    );

                    break;
                case 'square':
                    let checkSquareGeometry = options.geometry || [1, 1, 1];
                    newShape = new Three.Mesh(
                        new Three.BoxGeometry(...checkSquareGeometry),
                        new Three.MeshBasicMaterial( { color: options.newColor || 0x00ff00 } )
                    );

                    outline = new Three.LineSegments(
                        new Three.EdgesGeometry( new Three.BoxBufferGeometry(...checkSquareGeometry) ),
                        new Three.LineBasicMaterial( { color: 0x000000 } )
                    );
                    break;
                default:
                    console.error('Not a valid shape: ', shape);
                    break;
            }

            newShape.position.x += currentOffset;
            outline.position.x += currentOffset;
            currentOffset += offset;

            setShapes(() => {
                let newShapes = shapes;
                newShapes.add(newShape);
                if(options.outline) newShapes.add(outline);
                return newShapes;
            });
          
            console.log('shapes:', shapes);
        }
    }
  }, [count]);

  return [shapes, setShapes];
}

export default useCubeGenerator;
