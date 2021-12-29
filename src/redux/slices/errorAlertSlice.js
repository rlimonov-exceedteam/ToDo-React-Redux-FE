import { createSlice } from '@reduxjs/toolkit';

export const errorAlert = createSlice({
    name: 'errorAlert',
    initialState: {
        alertData: {
            isOpened: false,
            text: '',
        }
    },
    reducers: {
        setAlert: (state, action) => {
            state.alertData.isOpened = true;
            state.alertData.text = action.payload;
        },
        removeAlert: state => {
            state.alertData.isOpened = false;
        }
    }
});

export const { setAlert, removeAlert } = errorAlert.actions;

export default errorAlert.reducer;