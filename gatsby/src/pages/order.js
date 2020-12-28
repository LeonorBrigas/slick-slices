import Img from 'gatsby-image';
import React from 'react';
import PizzaOrder from '../components/PizzaOrder';
import SEO from '../components/SEO';
import MenuItemStyles from '../styles/MenuItemStyles';
import OrdersStyles from '../styles/OrderStyles';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';


export default function OrderPage({ data }) {
	const pizzas = data.pizzas.nodes;
	const { values, updateValue } = useForm({
		name: '',
		email: '',
		mapleSyrup: '',
	});
	const {
		order,
		addToOrder,
		removeFromOrder,
		error,
		loading,
		message,
		submitOrder
	} = usePizza({ pizzas, values: values });

	if (message) {
		return <p>{ message }</p>;
	}
	return (
		<>
			<SEO title="Order a pizza!" />
			<OrdersStyles onSubmit={ submitOrder }>
				<fieldset disabled={ loading }>
					<legend>
						Your Info
					</legend>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						value={ values.name }
						onChange={ updateValue }
					/>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						id="email"
						value={ values.email }
						onChange={ updateValue }
					/>
					<input
						type="mapleSyrup"
						name="mapleSyrup"
						className="mapleSyrup"
						id="mapleSyrup"
						value={ values.mapleSyrup }
						onChange={ updateValue }
					/>
				</fieldset>
				<fieldset disabled={ loading } className="menu">
					<legend>
						Menu
					</legend>
					{ pizzas.map((pizza) => (
						<MenuItemStyles key={ pizza.id }>
							<Img width="50" height="50" fluid={ pizza.image.asset.fluid } alt={ pizza.name } />
							<div>
								<h2>
									{ pizza.name }
								</h2>
							</div>
							<div>
								{ [ 'S', 'M', 'L' ].map((size) => (
									<button
										type="button"
										key={ size }
										onClick={ (() => addToOrder({
											id: pizza.id,
											size,
										})) }>
										{ size } { formatMoney(calculatePizzaPrice(pizza.price, size)) }
									</button>
								)) }
							</div>
						</MenuItemStyles>
					)) }
				</fieldset>
				<fieldset disabled={ loading } className="order">
					<legend>
						Order
					</legend>
					<PizzaOrder
						order={ order }
						removeFromOrder={ removeFromOrder }
						pizzas={ pizzas }
					/>
				</fieldset>
				<fieldset disabled={ loading } >
					<h3>Your total is { formatMoney(calculateOrderTotal(order, pizzas)) }</h3>
					<div>
						{ error ? <p>Error: { error }</p> : '' }
					</div>
					<button type="submit" disabled={ loading }>{ loading ? 'Placing Order...' : 'Order Ahead' }</button>
				</fieldset>
			</OrdersStyles>
		</>

	);
}

export const query = graphql`
	query {
					pizzas: allSanityPizza {
					nodes {
					name
				id
				price
				slug {
					current
				}
				image {
					asset {
					fluid(maxWidth: 100) {
					...GatsbySanityImageFluid
				}
					}
				}
			}
		}

	}
`;
