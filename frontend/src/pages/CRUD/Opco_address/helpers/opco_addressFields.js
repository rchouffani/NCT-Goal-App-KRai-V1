const opco_addressFields = {
  id: { type: 'id', label: 'ID' },

  Street: {
    type: 'string',
    label: 'Street',

    options: [{ value: 'value', label: 'value' }],
  },

  City: {
    type: 'string',
    label: 'City',

    options: [{ value: 'value', label: 'value' }],
  },

  ZipCode: {
    type: 'string',
    label: 'Zip Code',

    options: [{ value: 'value', label: 'value' }],
  },

  Country: {
    type: 'string',
    label: 'Country',

    options: [{ value: 'value', label: 'value' }],
  },

  OpCo: {
    type: 'relation_one',
    label: 'Op Co',

    options: [{ value: 'value', label: 'value' }],
  },

  Head_Quarter: {
    type: 'boolean',
    label: 'Head Quarter',

    options: [{ value: 'value', label: 'value' }],
  },

  Long: {
    type: 'string',
    label: 'Long',

    options: [{ value: 'value', label: 'value' }],
  },

  latit: {
    type: 'string',
    label: 'Latit',

    options: [{ value: 'value', label: 'value' }],
  },

  Address_Name: {
    type: 'string',
    label: 'Address Name',

    options: [{ value: 'value', label: 'value' }],
  },

  address_state: {
    type: 'relation_one',
    label: 'Address State',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default opco_addressFields;
