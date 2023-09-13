const opco_contactFields = {
  id: { type: 'id', label: 'ID' },

  First_Name: {
    type: 'string',
    label: 'First Name',

    options: [{ value: 'value', label: 'value' }],
  },

  Last_Name: {
    type: 'string',
    label: 'Last Name',

    options: [{ value: 'value', label: 'value' }],
  },

  Title: {
    type: 'string',
    label: 'Title',

    options: [{ value: 'value', label: 'value' }],
  },

  Email: {
    type: 'string',
    label: 'Email',

    options: [{ value: 'value', label: 'value' }],
  },

  OpCo: {
    type: 'relation_one',
    label: 'Op Co',

    options: [{ value: 'value', label: 'value' }],
  },

  Status: {
    type: 'boolean',
    label: 'Status',

    options: [{ value: 'value', label: 'value' }],
  },

  user: {
    type: 'relation_one',
    label: 'User',

    options: [{ value: 'value', label: 'value' }],
  },

  Full_Name: {
    type: 'string',
    label: 'Full Name',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default opco_contactFields;
