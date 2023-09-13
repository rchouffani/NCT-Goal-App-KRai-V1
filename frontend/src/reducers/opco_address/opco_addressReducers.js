import list from 'reducers/opco_address/opco_addressListReducers';
import form from 'reducers/opco_address/opco_addressFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
