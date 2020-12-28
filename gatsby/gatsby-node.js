import fetch from 'isomorphic-fetch';
import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
	// 1. get a template for this page
	const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
	// 2. query all pizzas
	const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

	// 3. loop over each pizza and create a page for that pizza
	data.pizzas.nodes.forEach((pizza) =>
		actions.createPage({
			// url for this new page
			path: `pizza/${pizza.slug.current}`,
			component: pizzaTemplate,
			context: {
				slug: pizza.slug.current,
			},
		})
	);
}

async function turnToppingsIntoPages({ graphql, actions }) {
	// 1. get a template for this page
	const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
	// 2. query all toppings
	const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
    }
  `);

	// 3. create page for that topping
	data.toppings.nodes.forEach((topping) => {
		actions.createPage({
			// url for this new page
			path: `topping/${topping.name}`,
			component: toppingsTemplate,
			context: {
				topping: topping.name,
				// TODO regex for a topping
			},
		});
	});
	// 4. pass topping data through Pizza.js
}

async function fetchBeersAndTurnIntoNodes({
	actions,
	createNodeId,
	createContentDigest,
}) {
	// 1. Fetch a  list of beers
	const res = await fetch('https://sampleapis.com/beers/api/ale');
	const beers = await res.json();
	// 2. Loop over each one
	for (const beer of beers) {
		// create a node for each beer
		const nodeMeta = {
			id: createNodeId(`beer-${beer.name}`),
			parent: null,
			children: [],
			internal: {
				type: 'Beer',
				mediaType: 'application/json',
				contentDigest: createContentDigest(beer),
			},
		};
		// 3. Create a node for that beer
		actions.createNode({
			...beer,
			...nodeMeta,
		});
	}
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
	// 1. query all slicemasters
	const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
	// 2. turn each slidemaster into their own page (TODO)
	data.slicemasters.nodes.forEach((slicemaster) => {
		actions.createPage({
			component: path.resolve('./src/templates/Slicemaster.js'),
			path: `/slicemaster/${slicemaster.slug.current}`,
			context: {
				name: slicemaster.person,
				slug: slicemaster.slug.current,
			},
		});
	});

	// 3. figure out how many pages there are based on how many slicemasters there are and how many per page
	const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
	const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
	console.log(
		`There are ${data.slicemasters.totalCount} total people and we have ${pageCount} pages with ${pageSize} per page`
	);
	// 4. loop from 1 to n and create the pages for them
	Array.from({ length: pageCount }).forEach((_, i) => {
		console.log(`Creating page ${i}`);
		actions.createPage({
			path: `/slicemasters/${i + 1}`,
			component: path.resolve(`./src/pages/slicemasters.js`),
			// this is pass to the template when we create it
			context: {
				skip: i * pageSize,
				currentPage: i + 1,
				pageSize,
			},
		});
	});
}

// sourcing nodes(piece of data)
export async function sourceNodes(params) {
	// fetch a list of beers and source them into our gatsby api
	await Promise.all([ fetchBeersAndTurnIntoNodes(params) ]);
}

exports.createPages = async (params) => {
	// create pages dynamically
	// 1. pizzas
	// 2. toppings
	await Promise.all([
		turnPizzasIntoPages(params),
		turnToppingsIntoPages(params),
		turnSlicemastersIntoPages(params),
	]);
	// 3. slicemaster
};
