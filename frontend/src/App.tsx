import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuth from './zustand/useAuth';
import useSocket from './zustand/useSocket';
import { useEffect } from 'react';
import io from 'socket.io-client';

function App() {
	const { authUser } = useAuth();
	const { setSocket, socket, setOnlineUsers } = useSocket();

	useEffect(() => {
		if (authUser) {
			const socket = io('http://localhost:5000', {
				query: {
					userId: authUser._id,
				},
			});
			setSocket(socket);
			// socket.on is used to listen to the event
			socket.on('getOnlineUsers', (users) => {
				setOnlineUsers(users);
			});
			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

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
