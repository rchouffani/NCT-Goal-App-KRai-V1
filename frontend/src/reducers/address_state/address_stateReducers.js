import list from 'reducers/address_state/address_stateListReducers';
import form from 'reducers/address_state/address_stateFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
