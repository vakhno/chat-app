import useConversation from '../zustand/useConversation';
import { useGetLastMessage } from '../hooks/useGetMessages';
import useSocket from '../zustand/useSocket';

const Conversation = ({ conversation, lastIndex }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { lastMessage } = useGetLastMessage(conversation._id);
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocket();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
				${isSelected ? 'bg-sky-500' : ''}
				`}
				onClick={() => setSelectedConversation(conversation)}>
				<div className={`avatar ${isOnline ? 'online' : ''}`}>
					<div className="w-12 rounded-full">
						<img src={conversation.profilePic} alt="user avatar" />
					</div>
				</div>
				<div className="flex flex-col flex-1">
					<div className="flex gap-3 justify-between">
						<div className="flex flex-col">
							<p className="font-bold text-gray-200">{conversation.fullName}</p>
							<p className=" text-gray-200">{lastMessage}</p>
						</div>
						<span className="text-xl">{':]'}</span>
					</div>
				</div>
			</div>
			{!lastIndex ? <div className="divider my-0 py-0 h-1"></div> : null}
		</>
	);
};

export default Conversation;
