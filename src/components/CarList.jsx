import { useDispatch, useSelector } from 'react-redux';
import { removeCar } from '../store/slices/carsSlice';

const CarList = () => {
  const dispatch = useDispatch();
  // 與其讓名單跟 search 綁在一起 -> 正確做法：初始顯示的就是 filteredList
  const carList = useSelector(({ cars: { searchTerm, carList } }) => {
    return carList.filter((car) => {
      return car.name.toLowerCase().includes(searchTerm.toLowerCase());
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
