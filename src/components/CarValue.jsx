import { useSelector } from 'react-redux';

const CarValue = () => {
  const totalCost = useSelector(
    ({ cars: { searchTerm, carList } }) =>
      carList
        .filter((car) =>
          car.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .reduce((acc, car) => acc + car.cost, 0) // array.prototype.reduce() 將陣列累加縮減成一數/值
    // let total = 0;
    // for (let car of data) {
    //   total += car.cost;
    // }
    // return total;

    // my code
    // // data.map((car) => {
    // //   return (total += car.cost);
    // // });
  );
  return <div className='car-value'>Total Value: ${totalCost}</div>;
};

export default CarValue;
