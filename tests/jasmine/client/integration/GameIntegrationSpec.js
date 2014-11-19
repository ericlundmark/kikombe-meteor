"use strict";
describe("Games", function(){
	it("should be created by admins", function(done){
		Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
			expect(err).toBeUndefined();
			var date = Date.now();
			var game = new Game(null, "home", "away", date);
			var id = game.save(function(error, result){
				expect(error).toBeUndefined();

				Games.remove(id);

				Meteor.logout(function(){
					done();
				});
			});
		});
	});
	it("should not be created by non admins", function(){
		var date = Date.now();
		var game = new Game(null, "home", "away", date);
		game.save(function(error, result){
			expect(error.error).toBe(403);
		});
	});
	it("should be updated by admins", function(done){
		Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
			expect(err).toBeUndefined(); 
			var date = Date.now();
			var game = new Game(null, "home", "away", date);
			var id = game.save(function(error, result){
				game.save(function(error, result){
					expect(error).toBeUndefined();
					Games.remove(id);
					Meteor.logout(function(){
						done();
					});
				});
			});
		});
	});
});