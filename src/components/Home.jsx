import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogList from './BlogList';

const Home = () => {
	const [blogs, setBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const getBlogs = async (signal) => {
		try {
			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/posts',
				{ signal: signal }
			);
			setBlogs(response.data);
			setError(null);
		} catch (error) {
			if (error.name === 'AbortError') {
				console.log('Fetch was aborted');
			} else {
				console.error(error.message);
				setIsLoading(false);
				setError(error.message);
			}
		}
	};

	useEffect(() => {
		const abortCont = new AbortController();
		const signal = abortCont.signal;
		getBlogs(signal);
		setIsLoading(false);
		return () => abortCont.abort();
	}, []);

	return (
		<div className="home">
			<h2>Latest Blogs</h2>
			{error && <div>{error}</div>}
			{isLoading && <div>Loading...</div>}
			{blogs && <BlogList blogs={blogs} />}
		</div>
	);
};

export default Home;
