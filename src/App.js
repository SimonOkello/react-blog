import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar, Home, CreateBlog, BlogDetail, NotFound } from './components';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="content">
					<Routes>
						<Route exact path="/" element={<Home />}></Route>
						<Route exact path="/create" element={<CreateBlog />}></Route>
						<Route exact path="/blogs/:id" element={<BlogDetail />}></Route>
						<Route path="*" element={<NotFound />}></Route>
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
