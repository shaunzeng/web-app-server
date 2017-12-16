module.export = function login(parent, args, context, info){
	return new Promise(function(resolve, reject){
		var email = args['email'];
		var db = context.database;

		console.log(args);

		db.open(function(err, db){
			assert.equal(null, err);

			db
			.collection('users')
			.findOne({'email': email}, function(err, user){
				assert.equal(err, null);

				bcrypt.compare(args['password'], user['password'], function(err, hash){
					assert.equal(err, null);
					db.close();

					delete user['password'];

					const token = jwt.sign({
						me:user
					}, context.secret,{
						expiresIn:'1y'
					});

					resolve(token);
				})
			});
		});
	});	  
} 