import list from 'reducers/goal_type/goal_typeListReducers';
import form from 'reducers/goal_type/goal_typeFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
