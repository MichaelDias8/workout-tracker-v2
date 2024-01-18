import { configureStore } from '@reduxjs/toolkit'
import programsReducer from './programsSlice'

const store = configureStore({
  reducer: {
    programs: programsReducer 
  },
});

export default store; 