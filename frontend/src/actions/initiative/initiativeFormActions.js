import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'INITIATIVE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'INITIATIVE_FORM_FIND_STARTED',
      });

      axios.get(`/initiative/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'INITIATIVE_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'INITIATIVE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/initiative'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'INITIATIVE_FORM_CREATE_STARTED',
      });

      axios.post('/initiative', { data: values }).then((res) => {
        dispatch({
          type: 'INITIATIVE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Initiative created' });
        dispatch(push('/admin/initiative'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'INITIATIVE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'INITIATIVE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/initiative/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'INITIATIVE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Initiative updated' });
        dispatch(push('/admin/initiative'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'INITIATIVE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
