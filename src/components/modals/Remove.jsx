import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../../slices';
import Spinner from '../Spinner.jsx';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { item: { id: removingId } } = useSelector((state) => state.modals);
  const [show, setShow] = useState(true);
  const [localState, setLocalState] = useState('pending');
  const handleClose = () => {
    dispatch(actions.hideModal());
    return setShow(false);
  };
  const handleRemoveChannel = (id) => async () => {
    try {
      setLocalState('removing');
      const resultAction = await dispatch(actions.asyncRemoveChannel({ id }));
      unwrapResult(resultAction);
      setLocalState('finished');
      dispatch(actions.hideModal());
    } catch (e) {
      setLocalState('failed');
      throw e;
    }
  };
  const renderRemoveButton = () => (
    <Button variant="danger" onClick={handleRemoveChannel(removingId)}>
      {localState === 'removing' ? <Spinner text={(t('loading'))} /> : t('modals.removeChannel.remove')}
    </Button>
  );

  const renderFeedBack = () => (
    <>
      {localState === 'failed' && <div className="d-block mb-2 invalid-feedback">{t('networkError')}</div>}
    </>
  );

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
          {renderFeedBack()}
          <Button variant="secondary" onClick={handleClose}>{t('modals.removeChannel.cancel')}</Button>
          {renderRemoveButton()}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Remove;
