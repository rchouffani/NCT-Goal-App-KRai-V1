import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'OPCO_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'OPCO_FORM_FIND_STARTED',
      });

      axios.get(`/opco/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'OPCO_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPCO_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/opco'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'OPCO_FORM_CREATE_STARTED',
      });

      axios.post('/opco', { data: values }).then((res) => {
        dispatch({
          type: 'OPCO_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Opco created' });
        dispatch(push('/admin/opco'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPCO_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'OPCO_FORM_UPDATE_STARTED',
      });

      await axios.put(`/opco/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'OPCO_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Opco updated' });
        dispatch(push('/admin/opco'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPCO_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
