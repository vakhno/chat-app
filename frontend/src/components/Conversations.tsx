import React from 'react';
import Covnersation from '../components/Conversation';

const Conversations = () => {
	return (
		<div className="py-2 felx flex-col overflow-auto">
			<Covnersation />
			<Covnersation />
			<Covnersation />
			<Covnersation />
		</div>
	);
};

export default Conversations;
