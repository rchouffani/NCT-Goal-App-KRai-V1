const categoryFields = {
  id: { type: 'id', label: 'ID' },

  Category: {
    type: 'string',
    label: 'Category',

    options: [{ value: 'value', label: 'value' }],
  },

  top_category: {
    type: 'relation_one',
    label: 'Top Category',

    options: [{ value: 'value', label: 'value' }],
  },

  Disabled_Status: {
    type: 'boolean',
    label: 'Disabled Status',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default categoryFields;
