import { graphql, useStaticQuery } from 'gatsby';
import React from "react";
import Helmet from 'react-helmet';

export default function SEO({ children, location, description, image, title }) {
	const { site } = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					twitter
			}
		}
	}
`);
	return (
		<Helmet titleTemplate={ `%s - ${site.siteMetadata.title}` }>
			<html lang="en" />
			<title>{ title }</title>
			{/* Fav icons */ }
			<link rel="icon" type="image/svg+xml" href="favicon.svg" ></link>
			<link rel="alternate ico" href="/favicon.io"></link>
			{/* Meta tags */ }
			<meta name="viewport" content="width=device=width, initial-scale=1.0" />
			<meta charset="utf-8" />
			<meta name="description" content={ site.siteMetadata.description } />
			{/* open graph (facebook etc) */ }
			{ location && <meta property="og:url" content={ location.href } /> }
			<meta property="og:image" content={ image || "./logo.svg" } />
			<meta property="og:title" content={ title } key="ogtitle" />
			<meta property="og:site_name" content={ title } key="og:site_name" />
			<meta property="og:description" content={ description } key={ "ogdesc" } />
			{ children }
		</Helmet>
	);
}
