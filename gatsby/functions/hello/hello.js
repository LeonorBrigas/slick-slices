// exports.handler = async (event, context) => {
// 	console.log(event);
// 	return {
// 		statusCode: 200,
// 		body: 'Hello!!',
// 	};
// };

module.exports = async (req, res) => ({
	statusCode: 200,
	body: 'Hello!!',
});
