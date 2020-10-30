import React, { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as slicesActions } from '../slices';
import Context from '../Context.js';
import Spinner from './Spinner.jsx';

const MessageForm = () => {
  const { activeChannelId } = useSelector((state) => state.channels);
  const { userName } = useContext(Context);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string().required(t('forms.required')),
    }),
    onSubmit: async (values, actions) => {
      const message = { author: userName, text: values.body };
      try {
        const resultAction = await dispatch(
          slicesActions.asyncAddMessage({ activeChannelId, message }),
        );
        unwrapResult(resultAction);
        actions.setSubmitting(false);
        actions.resetForm();
      } catch (e) {
        actions.setErrors({ body: t('networkError') });
        throw e;
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannelId]);

  const renderButton = () => (
    <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
      {formik.isSubmitting ? <Spinner text={(t('loading'))} /> : t('chatField.submit')}
    </Button>
  );

  const renderFeedBack = () => (
    <>
      {formik.errors.body && (
        <div className="d-block invalid-feedback">{formik.errors.body}</div>
      )}
    </>
  );

  return (
    <div className="mt-auto">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <InputGroup>
            <Form.Control
              className="mr-2"
              name="body"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              disabled={formik.isSubmitting}
            />
            {renderButton()}
            {renderFeedBack()}
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
