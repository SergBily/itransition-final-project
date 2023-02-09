import React from 'react';
import RingLoader from 'react-spinners/RingLoader';

const Spinner = (): JSX.Element => (
  <RingLoader
    size={120}
    cssOverride={{
      position: 'fixed',
      top: 'calc(50% - 60px)',
      left: 'calc(50% - 60px)',
    }}
    color="#2fd0ff"
  />
);

export default Spinner;
