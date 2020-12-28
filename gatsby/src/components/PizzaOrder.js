import Img from 'gatsby-image';
import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

export default function PizzaOrder({
	order,
	pizzas,
	removeFromOrder
}) {
	return (
		<>
			{ order.map((item, index) => {
				const pizza = pizzas.find((pizza) => pizza.id === item.id);
				return (
					<MenuItemStyles key={ `${item.id}-${index}` }>
						<Img fluid={ pizza.image.asset.fluid } />
						<h2>{ pizza.name }</h2>
						<p>{ formatMoney(calculatePizzaPrice(pizza.price, item.size)) }</p>
						<button
							type="button"
							className="remove"
							title={ `Remove ${item.size} ${pizza.name} from Order` }
							onClick={ () => removeFromOrder(index) }>
							&times;
						</button>
					</MenuItemStyles>
				);
			}) }
		</>
	);
}
