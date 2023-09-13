import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'CATEGORY_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'CATEGORY_FORM_FIND_STARTED',
      });

      axios.get(`/category/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'CATEGORY_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CATEGORY_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/category'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'CATEGORY_FORM_CREATE_STARTED',
      });

      axios.post('/category', { data: values }).then((res) => {
        dispatch({
          type: 'CATEGORY_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Category created' });
        dispatch(push('/admin/category'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CATEGORY_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CATEGORY_FORM_UPDATE_STARTED',
      });

      await axios.put(`/category/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'CATEGORY_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Category updated' });
        dispatch(push('/admin/category'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CATEGORY_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
