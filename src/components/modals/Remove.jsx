import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../../slices';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { item: { id: removingId } } = useSelector((state) => state.modals);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    dispatch(actions.hideModal());
    return setShow(false);
  };
  const handleRemoveChannel = (id) => () => {
    dispatch(actions.removeChannel({ id }));
    dispatch(actions.hideModal());
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('modals.removeChannel.question')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{t('modals.removeChannel.cancel')}</Button>
          <Button variant="primary" onClick={handleRemoveChannel(removingId)}>{t('modals.removeChannel.remove')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Remove;
