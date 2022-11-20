import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const userId = 1;
	const navigate = useNavigate();

	const publishBlog = async () => {
		try {
			const response = await axios.post(
				`https://jsonplaceholder.typicode.com/posts/`,
				{ title, body, userId }
			);
			console.log(response);
			if (response.status === 201) {
				navigate('/', { replace: true });
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		publishBlog();
	};
	return (
		<div className="create">
			<h2>Add new blog</h2>
			<form onSubmit={handleSubmit}>
				<label>Blog title</label>
				<input
					type="text"
					name="title"
					id=""
					required
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label>Blog Body</label>
				<textarea
					name="body"
					onChange={(e) => setBody(e.target.value)}
				></textarea>
				{isLoading ? (
					<button disabled>Publishing...</button>
				) : (
					<button>Submit</button>
				)}
			</form>
		</div>
	);
}

export default CreateBlog;
