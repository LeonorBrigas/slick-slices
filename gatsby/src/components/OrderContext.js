import React, { useState } from 'react';

// Create a order context
const OrderContext = React.createContext();

// create a provider (component that will live in a higher level)
export function OrderProvider({ children }) {
	// we need to stick state in here
	const [ order, setOrder ] = useState([]);
	return (
		<OrderContext.Provider value={ [ order, setOrder ] }>
			{children }
		</OrderContext.Provider>
	);
}

export default OrderContext;
