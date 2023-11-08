import { useDispatch, useSelector } from 'react-redux';
import { removeCar } from '../store/slices/carsSlice';
import { createSelector } from '@reduxjs/toolkit';

const CarList = () => {
  const dispatch = useDispatch();
  const memoizedCarList = createSelector(
    (state) => state.cars.carList,
    (state) => state.cars.searchTerm,
    (carList, searchTerm) => {
      return carList.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  );

  const data = useSelector(memoizedCarList);
  // 曾想合併但似乎無法也無必要，最後拆開寫
  const name = useSelector((state) => {
    return state.form.name;
  });

  //// 原始教案的簡潔寫法（但少了 memoized ）：
  // const { data, name } = useSelector(
  //   ({ form, cars: { carList, searchTerm } }) => {
  //     const filteredCarList = carList.filter((car) =>
  //       car.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     return { data: filteredCarList, name: form.name };
  //   }
  // );
  const handleCarDelete = (car) => {
    // action.payload === { id: xxx };
    dispatch(removeCar(car.id));
  };
  const renderedCars = data.map((car) => {
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase());
    return (
      <div key={car.id} className={`panel ${bold && 'bold'}`}>
        <p>
          {car.name} - ${car.cost}
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
