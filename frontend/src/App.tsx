import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className="p-4 h-screen flex items-center justify-center">
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/signup" element={<Signup />}></Route>
			</Routes>
		</div>
	);
}

export default App;
