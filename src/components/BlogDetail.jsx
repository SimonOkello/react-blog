import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BlogDetail() {
	const { id } = useParams();
	const [blog, setBlog] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const getBlogDetail = async (signal) => {
		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/posts/${id}`,
				{ signal: signal }
			);
			console.log(response.data);
			setBlog(response.data);
			setError(null);
		} catch (error) {
			if (error.name === 'AbortError') {
				console.log('Fetch was aborted');
			}
		}
	};
	const deleteBlog = async (id) => {
		try {
			const response = await axios.delete(
				`https://jsonplaceholder.typicode.com/posts/${id}`
			);
			console.log(response);
			if (response.status === 200) {
				navigate('/', { replace: true });
			} else {
				console.log(response);
			}
		} catch (error) {
			if (error.name === 'AbortError') {
				console.log('Fetch was aborted');
			}
		}
	};
	const handleDelete = () => {
		setIsDeleting(true);
		deleteBlog();
	};

	useEffect(() => {
		const abortCont = new AbortController();
		const signal = abortCont.signal;
		setIsLoading(true);
		getBlogDetail(signal);
		setIsLoading(false);
		return () => abortCont.abort();
	}, []);

	return (
		<div className="blog-details">
			{isLoading && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{blog && (
				<article>
					<h2>{blog.title}</h2>
					<div>{blog.body}</div>
					{isDeleting ? (
						<button disabled>Deleting...</button>
					) : (
						<button onClick={handleDelete}>Delete</button>
					)}
				</article>
			)}
		</div>
	);
}

export default BlogDetail;
