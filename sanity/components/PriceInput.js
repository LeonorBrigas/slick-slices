// you need to deal with onChange event
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import React from 'react';

function createPatchFrom(value) {
  console.log('Does it work?');
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

// format price according to location
const formatMoney = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      {/* everytime you provide a value you need an onChange method */}
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};
