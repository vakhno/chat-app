import React, { useState } from 'react';
import GenderCheckbox from '../../components/GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp.ts';

type signUpFields = {
	fullName: string;
	username: string;
	password: string;
	confirmPassword: string;
	gender: string;
};

const Signup = () => {
	const [inputs, setInputs] = useState<signUpFields>({
		fullName: '',
		username: '',
		password: '',
		confirmPassword: '',
		gender: 'male',
	});

	const { loading, signup } = useSignUp();

	const handleCheckboxChange = (value: string) => {
		setInputs({ ...inputs, gender: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
				<h1 className="text-3xl font-semibold text-center text-gray-300">
					Sign Up <span className="text-blue-500">ChatApp</span>
				</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label className="label-p-2">
							<span className="text-base label-text">Full Name</span>
						</label>
						<input
							type="text"
							placeholder="Enter full name"
							className="w-full input input-bordered h-10"
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>
					<div>
						<label className="label p-2">
							<span className="text-base label-text">Username</span>
						</label>
						<input
							type="text"
							placeholder="Enter username"
							className="w-full input input-bordered h-10"
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>
					<div>
						<label className="label p-2">
							<span className="text-base label-text">Password</span>
						</label>
						<input
							type="password"
							placeholder="Enter password"
							className="w-full input input-bordered h-10"
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>
					<div>
						<label className="label p-2">
							<span className="text-base label-text">Confirm password</span>
						</label>
						<input
							type="password"
							placeholder="Confirm password"
							className="w-full input inpur-bordered h-10"
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link
						to={'/login'}
						className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
						Already have an account?
					</Link>

					<div>
						<button
							className="btn btn-block btn-sm mt-2 border border-slate-700"
							disabled={loading}>
							{loading ? <span className="loading loading-spinner"></span> : 'Sign up'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
