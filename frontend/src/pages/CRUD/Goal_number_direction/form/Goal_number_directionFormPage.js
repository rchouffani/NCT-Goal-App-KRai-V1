import React, { useState, useEffect } from 'react';
import Goal_number_directionForm from 'pages/CRUD/Goal_number_direction/form/Goal_number_directionForm';
import { push } from 'connected-react-router';
import actions from 'actions/goal_number_direction/goal_number_directionFormActions';
import { connect } from 'react-redux';

const Goal_number_directionFormPage = (props) => {
  const { dispatch, match, saveLoading, findLoading, record, currentUser } =
    props;

  const [dispatched, setDispatched] = useState(false);

  const isEditing = () => {
    return !!match.params.id;
  };

  const isProfile = () => {
    return match.url === '/app/profile';
  };

  const doSubmit = (id, data) => {
    if (isEditing() || isProfile()) {
      dispatch(actions.doUpdate(id, data, isProfile()));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  useEffect(() => {
    if (isEditing()) {
      dispatch(actions.doFind(match.params.id));
    } else {
      if (isProfile()) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const currentUserId = currentUser.user.id;
        dispatch(actions.doFind(currentUserId));
      } else {
        dispatch(actions.doNew());
      }
    }
    setDispatched(true);
  }, [match, dispatch]);

  return (
    <React.Fragment>
      {dispatched && (
        <Goal_number_directionForm
          saveLoading={saveLoading}
          findLoading={findLoading}
          currentUser={currentUser}
          record={isEditing() || isProfile() ? record : {}}
          isEditing={isEditing()}
          isProfile={isProfile()}
          onSubmit={doSubmit}
          onCancel={() => dispatch(push('/admin/goal_number_direction'))}
        />
      )}
    </React.Fragment>
  );
};

function mapStateToProps(store) {
  return {
    findLoading: store.goal_number_direction.form.findLoading,
    saveLoading: store.goal_number_direction.form.saveLoading,
    record: store.goal_number_direction.form.record,
    currentUser: store.auth.currentUser,
  };
}

export default connect(mapStateToProps)(Goal_number_directionFormPage);
