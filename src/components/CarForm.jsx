import { useDispatch, useSelector } from 'react-redux';
import { addCar, changeCost, changeName } from '../store'; // 4. import the creator fn
import { createSelector } from '@reduxjs/toolkit';

const CarForm = () => {
  const dispatch = useDispatch(); // 5. call hook to get access to dispatch fn

  const memoizedData = createSelector(
    (state) => state.form.name,
    (state) => state.form.cost,
    (name, cost) => {
      return { name, cost };
    }
  );
  const { name, cost } = useSelector(memoizedData);

  const handleNameChange = (event) => {
    // 0. event handler (with event.target.value)
    dispatch(changeName(event.target.value)); // 6. some event happened, call action creator (to get an action) -> payload as arg -> dispatch it
  };
  const handleCostChange = (event) => {
    const carCost = parseInt(event.target.value) || 0; // a habit to prevent uncontrollable browser behaviour
    dispatch(changeCost(carCost));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCar({ name, cost })); // action.payload === { name: 'abc', cost: 14000 };
  };
  return (
    <div className='car-form panel'>
      <h4 className='subtitle is-3'>Add Car</h4>
      <form onSubmit={handleSubmit}>
        <div className='field-group'>
          <div className='field'>
            <label className='label'>Name</label>
            <input
              className='input is-expanded'
              value={name || ''} // 避免出現預設
              onChange={handleNameChange}
              type='text'
            />
          </div>
          <div className='field'>
            <label className='label'>Cost</label>
            <input
              className='input is-expanded'
              value={cost || ''} // 避免預設 0 的錯誤呈現
              onChange={handleCostChange}
              type='number'
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
