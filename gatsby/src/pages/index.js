import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestdata';

function CurrentlySlicing({ slicemasters }) {
	return (
		<div>
			<h2 className="center">
				<span className="mark tilt">Slicemasters On</span>
				<p>Standing by, ready to slice you up!</p>
			</h2>
			{ !slicemasters && <LoadingGrid count={ 4 } /> }
			{ slicemasters && !slicemasters?.length && (<p>No one is working right now!</p>) }
			{ slicemasters?.length && <ItemGrid items={ slicemasters } /> }
		</div>
	);
}
function HotSlices({ hotSlices }) {
	return (
		<div>
			<h2 className="center">
				<span className="mark tilt">HotSlices On</span>
				<p>Come on by, buy the slice!</p>
			</h2>
			{ !hotSlices && < LoadingGrid count={ 4 } /> }
			{ hotSlices && !hotSlices?.length && (<p>Nothing in the case</p>) }
			{ hotSlices?.length && <ItemGrid items={ hotSlices } /> }
		</div>
	);
}

export default function HomePage() {
	const { slicemasters, hotSlices } = useLatestData();
	return (
		<div className="center">
			<h1>the best pizza Downtown!</h1>
			<p>Open 11am to 11 pm every single day</p>
			<HomePageGrid >
				<CurrentlySlicing slicemasters={ slicemasters } />
				<HotSlices hotSlices={ hotSlices } />
			</HomePageGrid>
		</div>
	);
}