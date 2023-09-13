import list from 'reducers/initiative/initiativeListReducers';
import form from 'reducers/initiative/initiativeFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
