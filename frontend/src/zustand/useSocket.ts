import { create } from 'zustand';

const useSocket = create((set) => ({
	socket: null,
	setSocket: (socket) => set({ socket }),
	onlineUsers: [],
	setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
}));

export default useSocket;
