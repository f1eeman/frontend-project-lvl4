import { createSlice } from '@reduxjs/toolkit';

const setActiveIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: '',
  reducers: {
    setActiveId(state, action) {
      return action.payload.id;
    },
  },
});

export const { setActiveId } = setActiveIdSlice.actions;

export default setActiveIdSlice.reducer;
