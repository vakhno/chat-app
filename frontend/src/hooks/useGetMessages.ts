import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

export const useGetSelectedConversationMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) {
			getMessages();
		}
	}, [selectedConversation?._id]);

	return { messages, loading };
};

export const useGetLastMessage = (conversationId) => {
	const { messages } = useConversation();
	const [lastMessage, setLastMessage] = useState('');

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await fetch(`/api/messages/${conversationId}`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				if (data.length) {
					setLastMessage(data[data.length - 1]?.message);
				} else {
					setLastMessage(null);
				}
			} catch (error) {
				toast.error(error.message);
			}
		};

		if (conversationId) {
			getMessages();
		}
	}, [messages]);

	return { lastMessage };
};
