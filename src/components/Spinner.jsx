import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingIndicator = ({ text }) => (
  <>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    {text}
  </>
);

export default LoadingIndicator;
