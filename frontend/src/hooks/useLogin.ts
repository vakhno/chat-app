import { useState } from 'react';
import useAuth from '../zustand/useAuth';
import toast from 'react-hot-toast';

type loginType = {
	username: string;
	password: string;
};

const handleInputErrors = ({ username, password }: loginType) => {
	if (!username || !password) {
		toast.error('Please fill all fields');
		return false;
	}
	return true;
};

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuth();

	const login = async ({ username, password }: loginType) => {
		setLoading(true);
		try {
			const success = handleInputErrors({ username, password });
			if (!success) {
				return;
			}
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
			const data = await res.json();

			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem('chat-user', JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;
