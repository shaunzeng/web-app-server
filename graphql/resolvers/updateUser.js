module.exports = function updateUser(parent, args, context, info) {
	return new Promise(function(resolve, reject){
		var db = context.database;

		db.open(function(err, db){
			assert.equal(err, null);

			db
			.collection('user')
			.update(
				{'username':'shaunzeng'}, 
				{$set:{'phone':0000000000}},
				function(err, result){
					db.close();
					resolve(result);
				});
		});
	})
}