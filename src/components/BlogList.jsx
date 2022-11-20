import React from 'react';
import { Link } from 'react-router-dom';

function BlogList({ blogs }) {
	return (
		<div>
			{blogs.map((blog) => (
				<div className="blog-preview" key={blog.id}>
					<Link to={`/blogs/${blog.id}`}>
						<h4>{blog.title}</h4>
						<article>{blog.body}</article>
					</Link>
				</div>
			))}
		</div>
	);
}

export default BlogList;
