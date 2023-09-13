const journeyFields = {
  id: { type: 'id', label: 'ID' },

  journey: {
    type: 'string',
    label: 'Journey',

    options: [{ value: 'value', label: 'value' }],
  },

  OpCo: {
    type: 'relation_one',
    label: 'Op Co',

    options: [{ value: 'value', label: 'value' }],
  },

  Journey_Date: {
    type: 'datetime',
    label: 'Journey Date',

    options: [{ value: 'value', label: 'value' }],
  },

  Journey_Status: {
    type: 'enum',
    label: 'Journey Status',

    options: [
      { value: 'Completed', label: 'Completed' },

      { value: 'Canceled', label: 'Canceled' },

      { value: 'Pending', label: 'Pending' },
    ],
  },
};

export default journeyFields;
