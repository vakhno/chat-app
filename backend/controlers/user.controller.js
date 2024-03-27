import User from '../model/user.model.js';

const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;
		// all users, but without current auth user
		const filterredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
		// const allUsers = await User.find();

		res.status(200).json(filterredUsers);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};

export default getUsersForSidebar;
