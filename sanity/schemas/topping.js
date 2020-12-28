import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // computer name
  name: 'topping',
  // visible titel
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza name',
      type: 'string',
      description: 'What is the name of the topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'What is the name of the topping',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: (fields) => ({
      title: `${fields.name} ${fields.vegetarian ? 'plant' : ''}`,
    }),
  },
};
