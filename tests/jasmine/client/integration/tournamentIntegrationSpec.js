"use strict";
describe("Tournament", function(){
	it("should be created by admins", function(){
		Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
			expect(err).toBeUndefined();

            var tournament = new Tournament();
 
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