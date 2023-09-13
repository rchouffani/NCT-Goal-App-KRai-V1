const goalsFields = {
  id: { type: 'id', label: 'ID' },

  OpCo: {
    type: 'relation_one',
    label: 'Op Co',

    options: [{ value: 'value', label: 'value' }],
  },

  Category: {
    type: 'relation_one',
    label: 'Category',

    options: [{ value: 'value', label: 'value' }],
  },

  Goal_Type: {
    type: 'relation_one',
    label: 'Goal Type',

    options: [{ value: 'value', label: 'value' }],
  },

  Date: {
    type: 'datetime',
    label: 'Date',

    options: [{ value: 'value', label: 'value' }],
  },

  Due_Date: {
    type: 'datetime',
    label: 'Due Date',

    options: [{ value: 'value', label: 'value' }],
  },

  Goal_Number: {
    type: 'decimal',
    label: 'Goal Number',

    options: [{ value: 'value', label: 'value' }],
  },

  Goal_UOM: {
    type: 'string',
    label: 'Goal UOM',

    options: [{ value: 'value', label: 'value' }],
  },

  Period: {
    type: 'string',
    label: 'Period',

    options: [{ value: 'value', label: 'value' }],
  },

  Goal_Number_Direction: {
    type: 'relation_one',
    label: 'Goal Number Direction',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default goalsFields;
