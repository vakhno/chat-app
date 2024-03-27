import React from 'react';
import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';
import NoChatSelected from '../components/NoChatSelected';

const MessageContainer = () => {
	const noChatSelected = false;
	return (
		<div className="md:min-w-[450px] flex flex-col">
			{noChatSelected ? (
				<NoChatSelected />
			) : (
				<>
					<div className="bg-slate-500 px-4 py-2 mb-2">
						<span className="label-text">To:</span>
						<span className="text-gray-500 font-bold">Jogn Doe</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};

export default MessageContainer;
