import styled from 'styled-components';

const OrdersStyles = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	fieldset {
		grid-column: span 2;
		max-height: 600px;
		overflow: auto;
		display: grid;
		gap: 1rem;
		align-content: start;
		&.order, &.menu {
			grid-column: span 1;
		}
	}
	/* to hide from the bot
	 scale it to zero */
	.mapleSyrup {
		display: none;
	}
	@media(max-width: 900px) {
		fieldset.menu,
		fieldset.order {
			grid-column: span 2;
		}
	}
`;

export default OrdersStyles;
