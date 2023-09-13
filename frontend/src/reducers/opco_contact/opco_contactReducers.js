import list from 'reducers/opco_contact/opco_contactListReducers';
import form from 'reducers/opco_contact/opco_contactFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
