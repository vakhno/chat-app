import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../zustand/useAuth';

type inputsTypes = {
	fullName: string;
	username: string;
	password: string;
	confirmPassword: string;
	gender: string;
};
const handleInputErrors = ({
	fullName,
	username,
	password,
	confirmPassword,
	gender,
}: inputsTypes) => {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error('Please fill all fields');
		return false;
	}

	if (password !== confirmPassword) {
		toast.error('Password do not match');
		return false;
	}

	if (password.length < 6) {
		toast.error('Password must be at least 6 characters');
		return false;
	}

	return true;
};

const useSignUp = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuth();
	const signup = async ({ fullName, username, password, confirmPassword, gender }: inputsTypes) => {
		setLoading(true);
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) {
			return;
		}
		try {
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			const data = await res.json();

			if (data.error) {
				throw new Error(data.error);
			}
			//localstorage & context
			localStorage.setItem('chat-user', JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { loading, signup };
};

export default useSignUp;
