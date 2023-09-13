import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'OPCO_ADDRESS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'OPCO_ADDRESS_FORM_FIND_STARTED',
      });

      axios.get(`/opco_address/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'OPCO_ADDRESS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPCO_ADDRESS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/opco_address'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'OPCO_ADDRESS_FORM_CREATE_STARTED',
      });

      axios.post('/opco_address', { data: values }).then((res) => {
        dispatch({
          type: 'OPCO_ADDRESS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Opco_address created' });
        dispatch(push('/admin/opco_address'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPCO_ADDRESS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'OPCO_ADDRESS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/opco_address/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'OPCO_ADDRESS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Opco_address updated' });
        dispatch(push('/admin/opco_address'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPCO_ADDRESS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
