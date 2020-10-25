import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Modal, Button } from 'react-bootstrap';
import { actions as slicesActions } from '../../slices';

const Add = () => {
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

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add channel</Modal.Title>
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
            {formik.errors.body ? (
              <div className="d-block mb-2 invalid-feedback">{formik.errors.body}</div>
            ) : null}
            <div className="d-flex justify-content-end">
              <Button className="mr-2" variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="primary" type="submit" disabled={formik.isSubmitting}>Add</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Add;
