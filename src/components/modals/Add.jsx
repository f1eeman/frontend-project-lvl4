import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Modal } from 'react-bootstrap';
import { actions as slicesActions } from '../../slices';

const Add = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string().required('this field must be required'),
    }),
    onSubmit: (values, actions) => {
      const channel = { name: values.body };
      try {
        dispatch(slicesActions.addChannel({ channel }));
        actions.setSubmitting(false);
        actions.resetForm();
        dispatch(slicesActions.hideModal());
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
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
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
            <button
              className="btn btn-primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Add
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Add;
