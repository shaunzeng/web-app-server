module.exports = function createUser(parent, args, context, info){
	return new Promise(function(resolve, reject){

		var db = context.database;

		db.open(function(err, db){
			assert.equal(err, null);

			var user = args;

			bcrypt.hash(user.password, 12, function(err, hash){
				console.log(user)
				assert.equal(err, null);
				user.password = hash;
				user.testField = [1,2,3];

				db
				.collection('users')
				.insertOne(args)
				.then(function(result){
					console.log(result);
					db.close();
					resolve('fake token');
				})
			});	
		});
	});
}