import list from 'reducers/goal_number_direction/goal_number_directionListReducers';
import form from 'reducers/goal_number_direction/goal_number_directionFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
