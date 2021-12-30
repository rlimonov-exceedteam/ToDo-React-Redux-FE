import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
    },
    reducers: {
        addInitialTasks: (state, action) => {
            state.tasks = action.payload;
        },
        addTaskToStore: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTaskTextInStore: (state, action) => {
            const index = state.tasks.findIndex(elem => elem._id === action.payload._id);
            state.tasks[index].taskText = action.payload.taskText
        },
        deleteTaskFromStore: (state, action) => {
            state.tasks = state.tasks.filter(elem => elem._id !== action.payload);
        },
        updateStageInStore: (state, action) => {
            const index = state.tasks.findIndex(elem => elem._id === action.payload._id);
            state.tasks[index].stage = action.payload.stage;
        }
    }
});

export const {
    addInitialTasks,
    addTaskToStore,
    updateTaskTextInStore,
    deleteTaskFromStore,
    updateStageInStore,
} = tasksSlice.actions;

export default tasksSlice.reducer;