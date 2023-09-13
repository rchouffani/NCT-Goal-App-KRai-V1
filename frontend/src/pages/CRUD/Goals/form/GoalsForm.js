import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import goalsFields from 'pages/CRUD/Goals/helpers/goalsFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import OpcoSelectItem from 'pages/CRUD/Opco/helpers/OpcoSelectItem';

import CategorySelectItem from 'pages/CRUD/Category/helpers/CategorySelectItem';

import Goal_typeSelectItem from 'pages/CRUD/Goal_type/helpers/Goal_typeSelectItem';

import Goal_number_directionSelectItem from 'pages/CRUD/Goal_number_direction/helpers/Goal_number_directionSelectItem';

const GoalsForm = (props) => {
  const {
    isEditing,
    isProfile,
    findLoading,
    saveLoading,
    record,
    onSubmit,
    onCancel,
    modal,
  } = props;

  const iniValues = () => {
    return IniValues(goalsFields, record || {});
  };

  const formValidations = () => {
    return FormValidations(goalsFields, record || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(goalsFields, values || {});
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    }

    return isEditing ? 'Edit Goals' : 'Add Goals';
  };

  const renderForm = () => (
    <Widget title={<h4>{title()}</h4>} collapse close>
      <Formik
        onSubmit={handleSubmit}
        initialValues={iniValues()}
        validationSchema={formValidations()}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <OpcoSelectItem
                  name={'OpCo'}
                  schema={goalsFields}
                  showCreate={!modal}
                  form={form}
                />
              </Grid>

              <Grid item>
                <CategorySelectItem
                  name={'Category'}
                  schema={goalsFields}
                  showCreate={!modal}
                  form={form}
                />
              </Grid>

              <Grid item>
                <Goal_typeSelectItem
                  name={'Goal_Type'}
                  schema={goalsFields}
                  showCreate={!modal}
                  form={form}
                />
              </Grid>

              <Grid item>
                <DatePickerFormItem
                  name={'Date'}
                  schema={goalsFields}
                  showTimeInput
                />
              </Grid>

              <Grid item>
                <DatePickerFormItem
                  name={'Due_Date'}
                  schema={goalsFields}
                  showTimeInput
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'Goal_Number'} schema={goalsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'Goal_UOM'} schema={goalsFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'Period'} schema={goalsFields} />
              </Grid>

              <Grid item>
                <Goal_number_directionSelectItem
                  name={'Goal_Number_Direction'}
                  schema={goalsFields}
                  showCreate={!modal}
                  form={form}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={2}>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={form.handleSubmit}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={form.handleReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={() => onCancel()}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Widget>
  );
  if (findLoading) {
    return <Loader />;
  }
  if (isEditing && !record) {
    return <Loader />;
  }
  return renderForm();
};
export default GoalsForm;
