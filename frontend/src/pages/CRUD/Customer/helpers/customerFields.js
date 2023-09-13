const customerFields = {
  id: { type: 'id', label: 'ID' },

  Customer_Name: {
    type: 'string',
    label: 'Customer Name',

    options: [{ value: 'value', label: 'value' }],
  },

  Customer_id_CW: {
    type: 'int',
    label: 'Customer Id CW',

    options: [{ value: 'value', label: 'value' }],
  },

  Customer_id_Other: {
    type: 'string',
    label: 'Customer Id Other',

    options: [{ value: 'value', label: 'value' }],
  },

  OpCo: {
    type: 'relation_one',
    label: 'Op Co',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default customerFields;
