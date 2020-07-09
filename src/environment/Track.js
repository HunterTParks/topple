import React, { useState, useEffect, useMemo } from 'react';
import * as Three from 'three';
import { usePlane } from 'use-cannon';
import PropTypes from 'prop-types';

const Track = (props) => {
  const [track, setTrack] = useState([]);
  const [counter, setCounter] = useState(0);
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  let offset = 0;

  useEffect(() => {
    setCounter(props.counter);
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
      {track.map((item, index) => (
        <React.Fragment key={index}>
          <mesh position={[item.offset, -0.5, 0]} ref={ref}>
            <boxBufferGeometry attach="geometry" args={item.args} />
            <meshStandardMaterial attach="material" color={item.color} transparent />
          </mesh>
          <TrackOutline index={index + track.length} args={item.args} color={0x000000} offset={item.offset} key={index + track.length} />
        </React.Fragment>)
      )}
    </>
  );
}

const TrackOutline = (args) => {
  const geometry = useMemo(() => new Three.BoxBufferGeometry(args.args));

  return (
    <mesh position={[args.offset, -0.5, 0]} key={args.index}>
      <boxBufferGeometry attach="geometry" args={args.args} />
      <meshStandardMaterial attach="material" color={args.color} transparent wireframe={true}/>
    </mesh>
  );
}

Track.propTypes = {
  counter: PropTypes.number
}

TrackOutline.propTypes = {
  index: PropTypes.number,
  args: PropTypes.array,
  color: PropTypes.number 
}

export default Track;
