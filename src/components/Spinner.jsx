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
