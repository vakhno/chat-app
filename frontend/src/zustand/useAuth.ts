import { create } from 'zustand';

const useAuth = create((set) => ({
	authUser: JSON.parse(localStorage.getItem('chat-user')) || null,
	setAuthUser: (authUser) => {
		set({ authUser });
		localStorage.setItem('chat-user', JSON.stringify(authUser));
	},
}));

export default useAuth;
