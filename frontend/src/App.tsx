import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuth from './zustand/useAuth';

function App() {
	const { authUser } = useAuth();

	return (
		<div className="p-4 h-screen flex items-center justify-center">
			<Routes>
				<Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />}></Route>
				<Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />}></Route>
				<Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />}></Route>
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
