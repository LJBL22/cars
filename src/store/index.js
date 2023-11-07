import { configureStore } from "@reduxjs/toolkit";

import { changeName, changeCost, formReducer } from './slices/formSlice'
import {
  changeSearchTerm, addCar, removeCar, carsReducer
} from './slices/carsSlice'

const store = configureStore({
  reducer: {
    form: formReducer,
    cars: carsReducer,
  }
})
export { store, changeName, changeCost, changeSearchTerm, addCar, removeCar } // export action creators