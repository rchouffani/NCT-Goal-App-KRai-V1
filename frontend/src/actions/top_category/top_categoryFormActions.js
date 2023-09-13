import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'TOP_CATEGORY_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'TOP_CATEGORY_FORM_FIND_STARTED',
      });

      axios.get(`/top_category/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'TOP_CATEGORY_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TOP_CATEGORY_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/top_category'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'TOP_CATEGORY_FORM_CREATE_STARTED',
      });

      axios.post('/top_category', { data: values }).then((res) => {
        dispatch({
          type: 'TOP_CATEGORY_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Top_category created' });
        dispatch(push('/admin/top_category'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TOP_CATEGORY_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'TOP_CATEGORY_FORM_UPDATE_STARTED',
      });

      await axios.put(`/top_category/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'TOP_CATEGORY_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Top_category updated' });
        dispatch(push('/admin/top_category'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'TOP_CATEGORY_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
