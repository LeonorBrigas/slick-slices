import { useState } from 'react';

export default function useForm(defaults) {
	const [ values, setValues ] = useState(defaults);

	function updateValue(e) {
		let value = e.target.value;
		if (e.target.type === 'number') {
			value = parseInt(e.target.value);
		}
		setValues({
			// copying the existing values into it
			...values,
			// update the new value that has changed
			[ e.target.name ]: value,
		});
	}
	return { values, updateValue };
}
