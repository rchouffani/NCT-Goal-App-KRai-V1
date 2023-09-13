import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'ADDRESS_STATE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'ADDRESS_STATE_FORM_FIND_STARTED',
      });

      axios.get(`/address_state/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'ADDRESS_STATE_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ADDRESS_STATE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/address_state'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'ADDRESS_STATE_FORM_CREATE_STARTED',
      });

      axios.post('/address_state', { data: values }).then((res) => {
        dispatch({
          type: 'ADDRESS_STATE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Address_state created' });
        dispatch(push('/admin/address_state'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ADDRESS_STATE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ADDRESS_STATE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/address_state/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'ADDRESS_STATE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Address_state updated' });
        dispatch(push('/admin/address_state'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ADDRESS_STATE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
