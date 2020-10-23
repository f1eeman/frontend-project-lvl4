import { createSlice } from '@reduxjs/toolkit';

/*
eslint no-param-reassign:["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
*/

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    item: null,
  },
  reducers: {
    showModal(state, action) {
      state.type = action.payload.type;
      state.item = action.payload.item;
      console.log(state);
    },
    hideModal(state) {
      state.type = null;
      state.item = null;
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;

export default modalsSlice.reducer;
