import { Meteor } from 'meteor/meteor';

export default function authentication(userId, token) {
    let UserData = Meteor.users.findOne({ _id: userId });
    if (UserData) {
        let activeUser = UserData ? UserData.isActive : false;
        if (!activeUser) {
            return {
                isActive: activeUser,
                authorise: false,
                message: 'Your account has been suspended',
            };
        } else if (UserMaster.checkToken(token, userId) && UserData.isActive) {
            Meteor.call('setUserLastActivityTime', userId);
            return { isActive: activeUser, authorise: true, message: 'Authentication Pass' };
        } else {
            return { isActive: activeUser, authorise: false, message: 'Session Expired' };
        }
    } else {
        return { isActive: activeUser, authorise: false, message: 'User not found' };
    }

}