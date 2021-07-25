module.exports = client => {
	console.log(`Login as ${client.user.tag}!`);
	client.user.setActivity('Auero Caffe | c!help', {type: 'WATCHING'})
};