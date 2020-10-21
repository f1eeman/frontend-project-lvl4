import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { actions } from '../slices';
import Context from '../Context.js';

const ChatField = () => {
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const dispatch = useDispatch();
  const { userName } = useContext(Context);
  return (
    <div className="mt-auto">
      <Formik
        initialValues={{ text: '' }}
        onSubmit={(values) => {
          const message = { author: userName, text: values.text, channelId: currentChannelId };
          console.log('chart', message);
          dispatch(actions.addMessage({ currentChannelId, message }));
        }}
      >
        <Form>
          <Field className="mr-2 form-control" name="text" type="text" />
          <ErrorMessage name="text" />
          <button className="btn btn-primary" aria-label="submit" type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatField;
