import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // computer name
  name: 'pizza',
  // visible titel
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza name',
      type: 'string',
      description: 'Name of pizza',
    },
    // pizza name
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    // image
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    // price
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of pizza in cents',
      validation: (Rule) => Rule.min(1000),
      // Todo: Add custom input component
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      // 1 to many relations
      // array of options
      type: 'array',
      // to relate to toppings.js
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      const tops = Object.values(toppings).filter(Boolean);
      // 1. filter undefined toppings out
      console.log('STAY');
      // 2. return the preview object for the pizza
      return {
        title,
        media,
        subtitle: tops.join(', '),
      };
    },
  },
};
