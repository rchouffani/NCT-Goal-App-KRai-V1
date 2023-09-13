const top_categoryFields = {
  id: { type: 'id', label: 'ID' },

  Top_Category: {
    type: 'string',
    label: 'Top Category',

    options: [{ value: 'value', label: 'value' }],
  },

  Top_Category_Details: {
    type: 'string',
    label: 'Top Category Details',

    options: [{ value: 'value', label: 'value' }],
  },

  Initiative: {
    type: 'relation_one',
    label: 'Initiative',

    options: [{ value: 'value', label: 'value' }],
  },

  Disable_Status: {
    type: 'boolean',
    label: 'Disable Status',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default top_categoryFields;
