import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'OPCO_CONTACT_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'OPCO_CONTACT_FORM_FIND_STARTED',
      });

      axios.get(`/opco_contact/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'OPCO_CONTACT_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPCO_CONTACT_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/opco_contact'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'OPCO_CONTACT_FORM_CREATE_STARTED',
      });

      axios.post('/opco_contact', { data: values }).then((res) => {
        dispatch({
          type: 'OPCO_CONTACT_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Opco_contact created' });
        dispatch(push('/admin/opco_contact'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPCO_CONTACT_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'OPCO_CONTACT_FORM_UPDATE_STARTED',
      });

      await axios.put(`/opco_contact/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'OPCO_CONTACT_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Opco_contact updated' });
        dispatch(push('/admin/opco_contact'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPCO_CONTACT_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
