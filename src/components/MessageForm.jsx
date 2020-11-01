import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Context from '../Context.js';
import Spinner from './Spinner.jsx';
import routes from '../routes.js';

const MessageForm = () => {
  const activeChannelId = useSelector((state) => state.channelsInfo.activeChannelId);
  const { userName } = useContext(Context);
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string().required(t('forms.required')),
    }),
    onSubmit: async (values, actions) => {
      const message = { author: userName, text: values.body };
      const path = routes.channelMessagesPath(activeChannelId);
      try {
        await axios.post(path, { data: { attributes: message } });
        actions.resetForm();
        inputRef.current.focus();
      } catch (e) {
        actions.setErrors({ body: t('networkError') });
        throw e;
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannelId]);

  const renderButton = () => (
    <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
      {formik.isSubmitting ? <Spinner>{t('loading')}</Spinner> : t('chatField.submit')}
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
