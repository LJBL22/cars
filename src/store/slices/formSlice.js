import { createSlice } from "@reduxjs/toolkit";
import { addCar } from "./carsSlice";

const formSlice = createSlice({
  name: "form",
  initialState: { // 一個物件
    name: '',
    cost: 0
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload; // 直接取到 initialState 去改，賦值鍵入的 string
    },
    changeCost(state, action) {
      state.cost = action.payload; // 直接取到 initialState 去改，賦值鍵入的 number
    },
  },
  extraReducers(builder) {
    builder.addCase(addCar, (state, action) => {
      state.name = '';
      state.cost = 0;
    })
  }
})

export const { changeName, changeCost } = formSlice.actions;
export const formReducer = formSlice.reducer;
