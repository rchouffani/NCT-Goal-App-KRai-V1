import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'GOAL_TYPE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'GOAL_TYPE_FORM_FIND_STARTED',
      });

      axios.get(`/goal_type/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'GOAL_TYPE_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'GOAL_TYPE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/goal_type'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'GOAL_TYPE_FORM_CREATE_STARTED',
      });

      axios.post('/goal_type', { data: values }).then((res) => {
        dispatch({
          type: 'GOAL_TYPE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Goal_type created' });
        dispatch(push('/admin/goal_type'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'GOAL_TYPE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'GOAL_TYPE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/goal_type/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'GOAL_TYPE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Goal_type updated' });
        dispatch(push('/admin/goal_type'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'GOAL_TYPE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
