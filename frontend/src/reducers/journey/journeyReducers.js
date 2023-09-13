import list from 'reducers/journey/journeyListReducers';
import form from 'reducers/journey/journeyFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
