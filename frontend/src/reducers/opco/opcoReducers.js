import list from 'reducers/opco/opcoListReducers';
import form from 'reducers/opco/opcoFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
