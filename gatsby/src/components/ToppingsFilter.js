import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';


const ToppingsStyles = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 4rem;
	a {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 0 1rem;
		align-items: center;
		padding: 5px;
		background: var(--grey);
		border-radius: 2px;
		font-size: clamp (1.5rem, 1.4vw, 2.5rem);
	}
	.count {
		background: white;
		padding: 2px 5px;
	}
	.active {
		background: var(--yellow);
	}
`;



function countPizzasInToppings(pizzas) {
	// return the pizzas with counts
	const counts = pizzas
		.map(pizza => pizza.toppings)
		.flat()
		.reduce((acc, topping) => {
			// check if it is an existing topping
			const existingTopping = acc[ topping.id ];
			// if it is increment by 1
			if (existingTopping) {
				// console.log('Existing topping', existingTopping.name);
				existingTopping.count += 1;
			}
			// else create a new entry in acc and set it to 1
			else {
				acc[ topping.id ] = {
					id: topping.id,
					name: topping.name,
					count: 1,
				};
			}
			return acc;
		}, {});
	// sort them based on their count
	const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count);
	return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
	// get a list of all the toppings
	// get a list of all the pizzas with their toppings
	const { toppings, pizzas } = useStaticQuery(graphql`
		query {
			# to rename to toppings
			toppings: allSanityTopping {
				nodes {
					name
					id
					vegetarian
					}
				}
				pizzas: allSanityPizza {
					nodes {
						toppings {
							name
							id
						}
					}
				}
			}
	`);
	// console.log({ toppings, pizzas });
	// count how many pizzas are in each topping
	const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
	// console.log(toppingsWithCounts);
	// loop over the list of toppings and display the topping and the count of pizzas in the that topping

	//link it up

	return (
		<ToppingsStyles>
			<Link to='/pizzas'>
				<span className="name">All</span>
				<span className="count">{ pizzas.nodes.length }</span>
			</Link>
			{toppingsWithCounts.map((topping) => (
				<Link
					to={ `/topping/${topping.name}` }
					key={ topping.id }
					className={ topping.name === activeTopping ? 'active' : '' }
				>
					<span className="name">{ topping.name }</span>
					<span className="count">{ topping.count }</span>
				</Link>
			)) }
		</ToppingsStyles>
	);
}
