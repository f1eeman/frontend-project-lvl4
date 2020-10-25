import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Modal, Button } from 'react-bootstrap';
import { actions as slicesActions } from '../../slices';

const Rename = () => {
  const { item } = useSelector((state) => state.modals);
  console.log('item', item);
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    dispatch(slicesActions.hideModal());
    return setShow(false);
  };
  const formik = useFormik({
    initialValues: {
      body: item.name,
    },
    validationSchema: Yup.object({
      body: Yup.string()
        .min(3, 'There should be 3 to 15 characters')
        .max(15, 'There should be 3 to 15 characters')
        .required('this field must be required'),
    }),
    onSubmit: (values, actions) => {
      try {
        dispatch(slicesActions.renameChannel({ id: item.id, name: values.body }));
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
          <Modal.Title>Rename channel</Modal.Title>
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
              <Button variant="primary" type="submit" disabled={formik.isSubmitting}>Rename</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Rename;
