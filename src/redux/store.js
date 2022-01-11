import { configureStore } from '@reduxjs/toolkit';
import errorAlertReducer from './slices/errorAlertSlice';
import tasksReducer from './slices/taskSlice';
import isAuthReducer from './slices/isAuthSlice';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    isAuth: isAuthReducer,
    errorAlert: errorAlertReducer,
  }
});