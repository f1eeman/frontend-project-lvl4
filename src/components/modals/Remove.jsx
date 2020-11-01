import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import routes from '../../routes.js';
import { actions } from '../../slices';
import Spinner from '../Spinner.jsx';

const Remove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const removingId = useSelector((state) => state.modalsInfo.item.id);
  const removingProcessInfo = useSelector((state) => state.removingProcessInfo);
  console.log(removingProcessInfo);
  const show = true;
  const handleClose = () => {
    dispatch(actions.hideModal());
  };
  const handleRemoveChannel = (id) => async () => {
    try {
      dispatch(actions.changeStatus({ status: 'removing' }));
      await axios.delete(routes.channelPath(id));
      dispatch(actions.hideModal());
      dispatch(actions.changeStatus({ status: 'finished' }));
    } catch (e) {
      dispatch(actions.changeStatus({ status: 'failed' }));
      throw e;
    }
  };
  const renderRemoveButton = () => (
    <Button variant="danger" onClick={handleRemoveChannel(removingId)}>
      {removingProcessInfo.status === 'removing' ? <Spinner>{t('loading')}</Spinner> : t('modals.removeChannel.remove')}
    </Button>
  );

  const renderFeedBack = () => (
    <>
      {removingProcessInfo.status === 'failed' && <div className="d-block mb-2 invalid-feedback">{t('networkError')}</div>}
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
