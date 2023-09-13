import list from 'reducers/top_category/top_categoryListReducers';
import form from 'reducers/top_category/top_categoryFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
