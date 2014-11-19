"use strict";
describe("Cups", function(){
	it("should be created by logged in user", function(done){
		Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
			expect(err).toBeUndefined();

			var cup = new Cup(null, "name", "1");

			var id = cup.save(function(error, result) {
				expect(error).toBeUndefined();

				Cups.remove(id);

				Meteor.logout(function() {
					done();
				});
			});
		});
	});

	it("should not be created by non logged in users", function (done) {
		var cup = new Cup(null, "name", "1");

		var id = cup.save(function(error, result) {
			expect(error.error).toBe(403);
			done();
		});
	});
	
	it("should be possible to update by owner", function(done){
		Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
			expect(err).toBeUndefined();

			var cup = new Cup(null, "name", "1");

			var id = cup.save(function(error, result) {
				expect(error).toBeUndefined();
				cup.save(function(error, result){
					expect(error).toBeUndefined();

					Cups.remove(id);
					Meteor.logout(function() {
						done();
					});
				});
			});
		});
	});
	it("should not be possible to be updated by non owner", function(done){
		Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
			expect(err).toBeUndefined();

			var cup = new Cup(null, "name", "1");

			var id = cup.save(function(error, result) {
				expect(error).toBeUndefined();
				Meteor.loginWithPassword("normal@kikombe.com", "normal3210", function(err){
					cup.save(function(error, result){
						expect(error.error).toBe(403);
						Cups.remove(id);
						Meteor.logout(function() {
							done();
						});
					});
				});
			});
		});
	});
});