import list from 'reducers/category/categoryListReducers';
import form from 'reducers/category/categoryFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
