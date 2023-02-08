import React from 'react';
import { Dna } from 'react-loader-spinner';

const Spinner = (): JSX.Element => (
  <Dna
    visible
    height="80"
    width="80"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
  />
);

export default Spinner;
