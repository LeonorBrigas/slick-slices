import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaGridStyles = styled.div`
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export default function SinglePizzaPage({ data }) {
	console.log(data);
	return (
		<>
			{/* nested shaning */ }
			<SEO title={ data.pizza.name } image={ data.pizza.image?.asset?.fluid?.src } />
			<PizzaGridStyles>
				<Img fluid={ data.pizza.image.asset.fluid } />
				<div>
					<h2>{ data.pizza.name }</h2>
					<ul>
						{ data.pizza.toppings.map((topping) => <li key={ topping.id }>{ topping.name }</li>) }

					</ul>
				</div>
			</PizzaGridStyles>
		</>
	);
}

// this needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
	query($slug: String!) {
		pizza: sanityPizza(slug: {current: {eq: $slug }}) {
			name
			id
			image {
				asset {
					fluid(maxWidth: 800) {
						...GatsbySanityImageFluid
					}
				}
			}
			toppings {
				name
				id
				vegetarian
			}
		}
	}
`;
