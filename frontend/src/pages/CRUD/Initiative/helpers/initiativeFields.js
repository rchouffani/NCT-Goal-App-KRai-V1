const initiativeFields = {
  id: { type: 'id', label: 'ID' },

  Initiative: {
    type: 'string',
    label: 'Initiative',

    options: [{ value: 'value', label: 'value' }],
  },

  Initiative_Details: {
    type: 'string',
    label: 'Initiative Details',

    options: [{ value: 'value', label: 'value' }],
  },

  Start_Date: {
    type: 'datetime',
    label: 'Start Date',

    options: [{ value: 'value', label: 'value' }],
  },

  End_Date: {
    type: 'datetime',
    label: 'End Date',

    options: [{ value: 'value', label: 'value' }],
  },

  Disabled_Status: {
    type: 'boolean',
    label: 'Disabled Status',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default initiativeFields;
