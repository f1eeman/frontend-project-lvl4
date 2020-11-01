import { createSlice } from '@reduxjs/toolkit';

/*
eslint no-param-reassign:["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
*/

const removingProcessSlice = createSlice({
  name: 'removingInfo',
  initialState: {
    status: 'pending',
  },
  reducers: {
    changeStatus(state, { payload }) {
      state.status = payload.status;
    },
  },
});

export const { changeStatus } = removingProcessSlice.actions;

export default removingProcessSlice.reducer;
