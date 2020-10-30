import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as slicesActions } from '../../slices';
import Spinner from '../Spinner.jsx';

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    dispatch(slicesActions.hideModal());
    return setShow(false);
  };
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string()
        .min(3, t('forms.length'))
        .max(15, t('forms.length'))
        .required(t('forms.required')),
    }),
    onSubmit: async (values, actions) => {
      const channel = { name: values.body };
      try {
        const resultAction = await dispatch(slicesActions.asyncAddChannel({ channel }));
        unwrapResult(resultAction);
        actions.setSubmitting(false);
        actions.resetForm();
        dispatch(slicesActions.hideModal());
      } catch (e) {
        actions.setErrors({ body: t('networkError') });
        throw e;
      }
    },
  });

  const renderAddButton = () => (
    <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
      {formik.isSubmitting ? <Spinner text={(t('loading'))} /> : t('modals.addChannel.add')}
    </Button>
  );

  const renderFeedBack = () => (
    <>
      {formik.errors.body && (
        <div className="d-block mb-2 invalid-feedback">{formik.errors.body}</div>
      )}
    </>
  );

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                ref={inputRef}
                name="body"
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
            </Form.Group>
            {renderFeedBack()}
            <div className="d-flex justify-content-end">
              <Button className="mr-2" variant="secondary" onClick={handleClose}>{t('modals.addChannel.cancel')}</Button>
              {renderAddButton()}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Add;
