import React, { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, InputGroup } from 'react-bootstrap';
import { actions as actionsSlice } from '../slices';
import Context from '../Context.js';

const ChatField = () => {
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();
  const { userName } = useContext(Context);
  const formik = useFormik({
    initialValues: {
      body: '',
      status: 'sss',
    },
    validationSchema: Yup.object({
      body: Yup.string().required('this field must be required'),
    }),
    onSubmit: (values, actions) => {
      const message = { author: userName, text: values.body, channelId: currentChannelId };
      try {
        dispatch(actionsSlice.addMessage({ currentChannelId, message }));
        actions.setSubmitting(false);
        actions.resetForm();
      } catch (e) {
        actions.setErrors({ body: 'Something wrong, please try again' });
        throw e;
      }
    },
  });
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
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
            <button
              className="btn btn-primary"
              aria-label="submit"
              type="submit"
              value="Submit"
              disabled={formik.isSubmitting}
            >
              Submit
            </button>
            {formik.errors.body ? (
              <div className="d-block invalid-feedback">{formik.errors.body}</div>
            ) : null}
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ChatField;
