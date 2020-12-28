import calculatePizzaPrice from './calculatePizzaPrice';

// loop through every item in the order
// calc total for that pizza
// add that total for running total
export default function calculateOrderTotal(order, pizzas) {
	return order.reduce((runningTotal, item) => {
		const pizza = pizzas.find(
			(singlePizza) => singlePizza.id === item.id
		);
		return runningTotal + calculatePizzaPrice(pizza.price, item.size);
	}, 0);
}
