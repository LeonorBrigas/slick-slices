import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
	//1. create some state to hold our order
	// we got rid of this line because we moved the state up to the provider
	// const [ order, setOrder ] = useState([]);
	// now we access both our state and our updater function (setOrder) via context
	const [ order, setOrder ] = useContext(OrderContext);
	const [ error, setError ] = useState();
	const [ loading, setLoading ] = useState(false);
	const [ message, setMessage ] = useState('');

	//2. make function to add things to order
	function addToOrder(orderedPizza) {
		setOrder([ ...order, orderedPizza ]);
	}
	//3. make function to remove things from the order
	function removeFromOrder(index) {
		setOrder([
			// everything before the item we want to remove
			...order.slice(0, index),
			// everything after the item we want to remove
			// if we omit the second arg it will go until the end
			...order.slice(index + 1),
		]);
	}

	// function that is run when someone submits an order
	async function submitOrder(e) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		// setMessage(null);
		// gather all the data
		const body = {
			order: attachNamesAndPrices(order, pizzas),
			total: formatMoney(calculateOrderTotal(order, pizzas)),
			name: values.name,
			email: values.email,
			mapleSyrup: values.mapleSyrup,
		};
		//4. send this data to a serverless function when they checkout (TODO)
		const res = await fetch(
			`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}
		);
		const text = JSON.parse(await res.text());
		// check if everything worked
		// status between 400 and 600 means something went wrong
		if (res.status >= 400 && res.status < 600) {
			setLoading(false); // turn off loading
			setError(text.message);
		} else {
			// it worked
			setLoading(false);
			setMessage("success! come on down for your pizza");
		}
	}

	return {
		order,
		addToOrder,
		removeFromOrder,
		error,
		loading,
		message,
		submitOrder,
	};
}
