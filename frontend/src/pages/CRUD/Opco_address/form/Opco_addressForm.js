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

import opco_addressFields from 'pages/CRUD/Opco_address/helpers/opco_addressFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import OpcoSelectItem from 'pages/CRUD/Opco/helpers/OpcoSelectItem';

import Address_stateSelectItem from 'pages/CRUD/Address_state/helpers/Address_stateSelectItem';

const Opco_addressForm = (props) => {
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
    return IniValues(opco_addressFields, record || {});
  };

  const formValidations = () => {
    return FormValidations(opco_addressFields, record || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(opco_addressFields, values || {});
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    }

    return isEditing ? 'Edit Opco_address' : 'Add Opco_address';
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
                <InputFormItem
                  name={'Street'}
                  schema={opco_addressFields}
                  autoFocus
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'City'} schema={opco_addressFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'ZipCode'} schema={opco_addressFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'Country'} schema={opco_addressFields} />
              </Grid>

              <Grid item>
                <OpcoSelectItem
                  name={'OpCo'}
                  schema={opco_addressFields}
                  showCreate={!modal}
                  form={form}
                />
              </Grid>

              <Grid item>
                <SwitchFormItem
                  name={'Head_Quarter'}
                  schema={opco_addressFields}
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'Long'} schema={opco_addressFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'latit'} schema={opco_addressFields} />
              </Grid>

              <Grid item>
                <InputFormItem
                  name={'Address_Name'}
                  schema={opco_addressFields}
                />
              </Grid>

              <Grid item>
                <Address_stateSelectItem
                  name={'address_state'}
                  schema={opco_addressFields}
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
export default Opco_addressForm;
