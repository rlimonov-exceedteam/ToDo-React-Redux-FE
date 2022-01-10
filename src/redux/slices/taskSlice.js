import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInitialTasks = createAsyncThunk(
    'tasks/fetchInitialTasks',
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getAllTasks`, 
        {
            withCredentials: true, 
            credentials: 'include'
        });

        return response.data;
    }
);

export const addTaskMiddleware = createAsyncThunk(
  'tasks/addTaskMiddleware',
  async ({ taskText, taskName, stage }) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/createNewTask`, 
    {
      taskText,
      taskName,
      stage,
    },
    {
      withCredentials: true, 
      credentials: 'include'
    });

    return response.data;
  }
);

export const updateTaskMiddleware = createAsyncThunk(
  'task/updateTaskMiddleware',
  async ({ taskText, _id }) => {
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/updateTask`,
    {
      taskText,
      _id
    });

    return { taskText, _id };
  }
);

export const updateStageMiddleware = createAsyncThunk(
  'task/updateStageMiddleware',
  async ({ stage, _id }) => {
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/changeTaskStage`,
    {
      stage,
      _id
    });

    return { stage, _id };
  }
);

export const deleteTaskMiddleware = createAsyncThunk(
  'task/deleteTaskMiddleware',
  async (_id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/deleteTask?_id=${_id}`)
  
    return _id;
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
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
      const index = state.tasks.findIndex(
        (elem) => elem._id === action.payload._id
      );
      state.tasks[index].taskText = action.payload.taskText;
    },
    deleteTaskFromStore: (state, action) => {
      state.tasks = state.tasks.filter((elem) => elem._id !== action.payload);
    },
    updateStageInStore: (state, action) => {
      const index = state.tasks.findIndex(
        (elem) => elem._id === action.payload._id
      );
      state.tasks[index].stage = action.payload.stage;
    },
  },
  extraReducers: {
    [fetchInitialTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload;
    },
    [addTaskMiddleware.fulfilled]: (state, action) => {
      state.tasks.push(action.payload);
    },
    [updateTaskMiddleware.fulfilled]: (state, action) => {
      const index = state.tasks.findIndex(
        (elem) => elem._id === action.payload._id
      );
      state.tasks[index].taskText = action.payload.taskText;
    },
    [deleteTaskMiddleware.fulfilled]: (state, action) => {
      state.tasks = state.tasks.filter((elem) => elem._id !== action.payload);;
    },
    [updateStageMiddleware.fulfilled]: (state, action) => {
      const index = state.tasks.findIndex(
        (elem) => elem._id === action.payload._id
      );
      state.tasks[index].stage = action.payload.stage;
    }
  },
});

export const {
    addInitialTasks,
    addTaskToStore,
    updateTaskTextInStore,
    deleteTaskFromStore,
    updateStageInStore,
} = tasksSlice.actions;

export default tasksSlice.reducer;