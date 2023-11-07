import { useDispatch, useSelector } from 'react-redux';
import { removeCar } from '../store/slices/carsSlice';

const CarList = () => {
  const dispatch = useDispatch();
  const carList = useSelector((state) => {
    return state.cars.carList;
  });
  // console.log(cars);
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
