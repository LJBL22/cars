import { useDispatch, useSelector } from 'react-redux';
import { addCar, changeCost, changeName } from '../store'; // 4. import the creator fn

const CarForm = () => {
  const dispatch = useDispatch(); // 5. call hook to get access to dispatch fn
  const { name, cost } = useSelector((state) => {
    return {
      name: state.form.name,
      cost: state.form.cost,
    };
  });

  const handleNameChange = (event) => {
    // 0. event handler (with event.target.value)
    dispatch(changeName(event.target.value)); // 6. some event happened, call action creator (to get an action) -> payload as arg -> dispatch it
  };
  const handleCostChange = (event) => {
    const carCost = parseInt(event.target.value) || 0;
    // abc1234 似乎可以通過... 也許 Number比較好? 或著這是後端在驗證的
    // xx 無法，因為 input type="number" 已經避免掉這件事
    dispatch(changeCost(carCost));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCar({ name, cost })); // action.payload === { name: 'abc', cost: 14000 };
    dispatch(changeName(''));
    dispatch(changeCost(''));
  };
  return (
    <div className='car-form panel'>
      <h4 className='subtitle is-3'>Add Car</h4>
      <form onSubmit={handleSubmit}>
        <div className='field-group'>
          <div className='field'>
            <label className='label'>Car Name</label>
            <input
              className='input is-expanded'
              value={name || ''} // 避免出現預設
              onChange={handleNameChange}
              type='text'
            />
          </div>
          <div className='field'>
            <label className='label'>Value</label>
            <input
              className='input is-expanded'
              value={cost || ''} // 避免預設 0 的錯誤呈現
              onChange={handleCostChange}
              type='number'
              min='0' // 沒效？
            />
          </div>
        </div>
        <div className='field'>
          <button className='button is-link'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
