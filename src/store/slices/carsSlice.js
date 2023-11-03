import { createSlice, nanoid } from "@reduxjs/toolkit";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    searchTerm: '',
    carList: []
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload; // 取到 initialState 去改，賦值
    },
    addCar(state, action) {
      // assumption: 寫下來以記住 payload 的型態
      // action.payload === { name: 'abc', cost: 14000 };
      state.cars.push({
        // from the other slice
        name: action.payload.name,
        cost: action.payload.cost,
        id: nanoid(), // tool from react-redux
      });
    },
    removeCar(state, action) {
      // assumption: 寫下來以記住 payload 的型態
      // action.payload === { id: xxx };
      const nextList = state.cars.filter((car) => {
        return car.id !== action.payload
      }) // 為什麼是 action.payload?
      state.cars = nextList;
    },
  }
}
)

export const {
  changeSearchTerm, addCar, removeCar
} = carsSlice.actions;
export const formReducer = carsSlice.reducer;