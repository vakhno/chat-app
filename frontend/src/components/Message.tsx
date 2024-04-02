import { extractTime } from '../utils/extractTime';
import useAuth from '../zustand/useAuth';
import useConversation from '../zustand/useConversation';

const Message = ({ message }) => {
	const { authUser } = useAuth();
	const { selectedConversation } = useConversation();
	const isSenderMessage = message.senderId === authUser._id;
	const formatedTime = extractTime(message.createdAt);
	const chatClassname = isSenderMessage ? 'chat-end' : 'chat-start';
	const profilePic = isSenderMessage ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = isSenderMessage ? 'bg-blue-500' : '';

	return (
		<div className={`chat ${chatClassname}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img src={profilePic} alt="user avatar" />
				</div>
			</div>
			<div className={`chat-bubble text-white pb-2 ${bubbleBgColor}`}>{message.message}</div>
			<div className="chat-footer text-white opacity-50 text-xs flex gap-1 items-center">
				{formatedTime}
			</div>
		</div>
	);
};

export default Message;
