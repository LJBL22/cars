import { useDispatch, useSelector } from 'react-redux';
import { removeCar } from '../store/slices/carsSlice';
import { createSelector } from '@reduxjs/toolkit';

const CarList = () => {
  const dispatch = useDispatch();
  // 與其讓名單跟 search 綁在一起 -> 正確做法：初始顯示的就是 filteredList
  // // short ver DOESN'T WORK
  // const memoizedCars = createSelector(({ cars: { searchTerm, carList } }) => {
  //   return carList.filter((car) =>
  //     car.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  const memoizedCars = createSelector(
    (state) => state.cars.carList,
    (state) => state.cars.searchTerm,
    (carList, searchTerm) => {
      return carList.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  );

  const carList = useSelector(memoizedCars);

  const reminder = useSelector((state) => {
    const inputText = state.form.name;
    const data = state.cars.carList;
    const matchList = data.filter((car) => {
      if (car.name.toLowerCase() === inputText.toLowerCase()) {
        return true;
      }
    });
  });
  //// 對照我的寫法：
  // const carList = useSelector((state) => {
  //   const data = state.cars.carList;
  //   const searchTerm = state.cars.searchTerm;
  //   const filteredCarList = data.filter((car) => {
  //     return car.name.includes(searchTerm.toLowerCase());
  //   });
  //   return filteredCarList;
  // });
  const handleCarDelete = (car) => {
    // action.payload === { id: xxx };
    dispatch(removeCar(car.id));
  };
  const renderedCars = carList.map((car) => {
    return (
      <div key={car.id} className='panel'>
        <p>
          {true ? (
            <b>
              {car.name} - ${car.cost}
            </b>
          ) : (
            `${car.name} - $${car.cost}`
          )}
        </p>
        <button
          className='button is-danger'
          onClick={() => handleCarDelete(car)}
        >
          Delete
        </button>
      </div>
    );
  });
  return (
    <div className='car-list'>
      <ul>{renderedCars}</ul>
      <hr />
    </div>
  );
};

export default CarList;
