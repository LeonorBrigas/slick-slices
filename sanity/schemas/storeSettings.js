import { MdStore as icon } from 'react-icons/md';

export default {
  // computer name
  name: 'storeSettings',
  // visible titel
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Store name',
      type: 'string',
      description: 'Name of pizza',
    },
    {
      name: 'slicemaster',
      title: 'Slicemasters currently slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'hotSlices currently available',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
