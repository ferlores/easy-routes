module.exports = {
	prefixes: ['admin'],
	rules: [
		{ 
			url: '/',
			type: 'GET',
			target: {
				controller: 'controller1',
				action: 'index'
			}
		}
	]
}
