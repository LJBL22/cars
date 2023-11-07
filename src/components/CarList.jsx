import { useSelector } from 'react-redux';

const CarList = () => {
  const cars = useSelector((state) => {
    return state.cars.carList;
  });
  // console.log(cars);

  const renderedCars = cars.map((car) => {
    return (
      <div key={car.id} className='panel'>
        <p>
          {car.name} - ${car.cost}
        </p>
      </div>
    );
  });
  return (
    <div>
      <ul>{renderedCars}</ul>
    </div>
  );
};

export default CarList;
