// import React from 'react';
// import { Spinner } from 'react-bootstrap';

// const LoadingIndicator = ({ children }) => (
//   <Spinner
//     as="span"
//     animation="grow"
//     size="sm"
//     role="status"
//     aria-hidden="true"
//   >
//     {children}
//   </Spinner>
// );

// export default LoadingIndicator;

import React from 'react';
import { Spinner as BootSpinner } from 'react-bootstrap';

const Spinner = ({ children }) => (
  <>
    <BootSpinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    {children}
  </>
);

export default Spinner;
