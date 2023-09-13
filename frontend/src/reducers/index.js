import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import category from 'reducers/category/categoryReducers';

import top_category from 'reducers/top_category/top_categoryReducers';

import customer from 'reducers/customer/customerReducers';

import opco from 'reducers/opco/opcoReducers';

import goal_type from 'reducers/goal_type/goal_typeReducers';

import initiative from 'reducers/initiative/initiativeReducers';

import opco_address from 'reducers/opco_address/opco_addressReducers';

import opco_contact from 'reducers/opco_contact/opco_contactReducers';

import goals from 'reducers/goals/goalsReducers';

import goal_number_direction from 'reducers/goal_number_direction/goal_number_directionReducers';

import journey from 'reducers/journey/journeyReducers';

import address_state from 'reducers/address_state/address_stateReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    category,

    top_category,

    customer,

    opco,

    goal_type,

    initiative,

    opco_address,

    opco_contact,

    goals,

    goal_number_direction,

    journey,

    address_state,
  });
