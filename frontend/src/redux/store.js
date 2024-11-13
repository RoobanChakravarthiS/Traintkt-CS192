import { configureStore } from '@reduxjs/toolkit'
import islogginreducer from "../redux/features/login/IsLoged"
import userReducer from "../redux/features/user/user"
export default configureStore({
  reducer: {
    islogged : islogginreducer,
    user: userReducer
  },
})