import { useSelector } from 'react-redux';

const CarValue = () => {
  const totalCost = useSelector((state) => {
    const data = state.cars.carList;
    let total = 0;
    data.map((car) => {
      return (total += car.cost);
    });
    console.log(total);
    return total;
  });
  return (
    <div>
      <h3 className='subtitle is-3'>Total Value: ${totalCost}</h3>
    </div>
  );
};

export default CarValue;
