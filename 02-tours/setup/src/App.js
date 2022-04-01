import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';
function App() {
	const [loading, setLoading] = useState(true);
	const [tours, setTours] = useState([]);

	const fetchTours = async () => {
		setLoading(true);
		try {
			const response = await fetch(url);
			const tours = await response.json();
			setLoading(false);
			setTours(tours);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTours();
	}, []);

	const deleteTour = (id) => {
		setTours(tours.filter((tour) => tour.id !== id));
	};

	if (loading)
		return (
			<main>
				<Loading />
			</main>
		);

	if (tours.length === 0) {
		return (
			<div className="title">
				<button className="btn" onClick={fetchTours}>
					Refresh
				</button>
			</div>
		);
	}

	return (
		<main>
			<Tours tours={tours} deleteTour={deleteTour} />
		</main>
	);
}

export default App;
