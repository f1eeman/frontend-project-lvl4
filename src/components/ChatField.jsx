import React, { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, InputGroup } from 'react-bootstrap';
import { actions as slicesActions } from '../slices';
import Context from '../Context.js';

const ChatField = () => {
  const { activeChannelId } = useSelector((state) => state.channels);
  const { userName } = useContext(Context);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string().required('this field must be required'),
    }),
    onSubmit: (values, actions) => {
      const message = { author: userName, text: values.body, channelId: activeChannelId };
      try {
        dispatch(slicesActions.addMessage({ activeChannelId, message }));
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
