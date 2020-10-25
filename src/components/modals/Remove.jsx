import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { actions } from '../../slices';

const Remove = () => {
  const dispatch = useDispatch();
  const { item: { id: removingId } } = useSelector((state) => state.modals);
  console.log('removingID', removingId);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    dispatch(actions.hideModal());
    return setShow(false);
  };
  const handleRemoveChannel = (id) => () => {
    console.log('removingId', id);
    try {
      dispatch(actions.removeChannel({ id }));
      dispatch(actions.hideModal());
    } catch (e) {
      const errorMessage = 'error';
      throw e;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleRemoveChannel(removingId)}>Remove</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Remove;
