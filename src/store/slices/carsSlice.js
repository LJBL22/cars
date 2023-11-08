import { createSlice, nanoid } from "@reduxjs/toolkit";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    searchTerm: '',
    carList: []
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    addCar(state, action) {
      // assumption: 寫下來以記住 payload 的型態
      // action.payload === { name: 'abc', cost: 14000 };
      state.carList.push({
        // 無法從另個 slice 取得，因此要自己從頭(a.payload)寫
        name: action.payload.name,
        cost: action.payload.cost,
        id: nanoid(), // tool from react-redux
      });
    },
    removeCar(state, action) {
      // assumption: 寫下來以記住 payload 的型態
      // action.payload === { id: xxx };
      console.log(action); //{type: 'car/removeCar', payload: '3NO6ZvKSJWO-_LFAwGs2O'}
      console.log(action.payload);
      const nextList = state.carList.filter((car) => {
        return car.id !== action.payload
      }) // 因為這裡傳入的是 id ，而進到這個 mini-reducer 後，對比到 action.payload
      // Payload holds the actual data
      // payload is a non-official, community accepted(de facto) naming convention for the property that holds the actual data in a Redux action object.
      state.carList = nextList;
    },
  }
}
)

export const {
  changeSearchTerm, addCar, removeCar
} = carsSlice.actions;
export const carsReducer = carsSlice.reducer;