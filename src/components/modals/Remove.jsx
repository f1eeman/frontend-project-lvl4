import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { unwrapResult } from '@reduxjs/toolkit';
import { actions } from '../../slices';
import Spinner from '../Spinner.jsx';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removingId, removeChannelStatus } = useSelector((state) => (
    {
      removingId: state.modalsInfo.item.id,
      removeChannelStatus: state.channelsInfo.removeStatus,
    }
  ));
  const handleClose = () => {
    dispatch(actions.hideModal());
  };
  const handleRemoveChannel = (id) => async () => {
    const resultAction = await dispatch(actions.removeChannelFromServer({ id }));
    unwrapResult(resultAction);
    dispatch(actions.hideModal());
  };
  const renderRemoveButton = () => (
    <Button variant="danger" onClick={handleRemoveChannel(removingId)}>
      {removeChannelStatus === 'removing' ? <Spinner>{t('loading')}</Spinner> : t('modals.removeChannel.remove')}
    </Button>
  );

  const renderFeedBack = () => (
    <>
      {removeChannelStatus === 'failed' && <div className="d-block mb-2 invalid-feedback">{t('networkError')}</div>}
    </>
  );

  return (
    <Modal show onHide={handleClose}>
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
  );
};

export default Remove;
