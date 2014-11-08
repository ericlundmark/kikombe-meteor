"use strict";
describe("Cups", function(){
	it("should be created by logged in user", function(){
		Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
			expect(err).toBeUndefined();

			var cup = new Cups(null, "name", "1");

			var id = tournament.save(function(error, result) {
				expect(error).toBeUndefined();

				Tutorials.remove(id);

				Meteor.logout(function() {
					done();
				});
			});
		});
	});
});