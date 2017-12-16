module.exports = function userAdded(){
	return pubsub.asyncIterator(USER_ADDED);
}