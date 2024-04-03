import { useEffect, useRef } from 'react';
import Message from '../components/Message';
import { useGetSelectedConversationMessages } from '../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../hooks/useListenMessages';

const Messages = () => {
	const { messages, loading } = useGetSelectedConversationMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 100);
	}, [messages]);

	return (
		<div className="px-4 flex-1 overflow-auto">
			{!loading && messages.length
				? messages.map((message) => (
						<div key={message._id} ref={lastMessageRef}>
							<Message message={message} />
						</div>
				  ))
				: null}
			{loading ? [...Array(3)].map((_, index) => <MessageSkeleton key={index} />) : null}
			{!loading && !messages.length ? <p>'Send a message to start a conversation'</p> : null}
		</div>
	);
};

export default Messages;
