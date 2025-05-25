import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Shows from './pages/Shows';
import MasterDetail from './pages/MasterDetail';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/shows" element={<Shows />} />
				<Route path="/masterDetail/:idShow" element={<MasterDetail />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;