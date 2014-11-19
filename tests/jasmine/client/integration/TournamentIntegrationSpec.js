"use strict";
describe("Tournament", function(){
	it("should be created by admins", function(done){
		Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
			expect(err).toBeUndefined();
            var startDate = Date.now();
            var tournament = new Tournament(null, "VM", startDate, startDate + 1);

            var id = tournament.save(function(error, result) {
                expect(error).toBeUndefined();

                Tournaments.remove(id);

                Meteor.logout(function() {
                    done();
                });
            });
        });
	});
    it("should not be created by non admins", function(done){
        Meteor.loginWithPassword("normal@kikombe.com", "normal3210", function(err){
            expect(err).toBeUndefined();
            var startDate = Date.now();
            var tournament = new Tournament(null, "VM", startDate, startDate + 1);

            var id = tournament.save(function(error, result) {
                expect(error.error).toBe(403);

                Meteor.logout(function() {
                    done();
                });
            });
        });
    });

    it("should be possible to be updated by admin", function(done){
        Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
            expect(err).toBeUndefined();
            var startDate = Date.now();
            var tournament = new Tournament(null, "VM", startDate, startDate + 1);

            var id = tournament.save(function(error, result) {
                expect(error).toBeUndefined();

                tournament.save(function(error, result){
                    expect(error).toBeUndefined();
                    Tournaments.remove(id);

                    Meteor.logout(function() {
                        done();
                    });
                });
            });
        });
    });
    it("should not be possible to be updated by non admins", function(done){
        Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
            expect(err).toBeUndefined();
            var startDate = Date.now();
            var tournament = new Tournament(null, "VM", startDate, startDate + 1);

            var id = tournament.save(function(error, result) {
                Meteor.logout(function() {
                   Meteor.loginWithPassword("admin@kikombe.com", "normal3210", function(err){
                    tournament.save(function(error, result){
                        expect(error.error).toBe(403);
                        Tournaments.remove(id);
                        Meteor.logout(function(){
                            done();
                        });
                    });
                });
               });
            });
        });
    });
    it("should be able to receive games", function(done){
        Meteor.loginWithPassword("admin@kikombe.com", "admin3210", function(err){
            expect(err).toBeUndefined();
            
            var startDate = Date.now();
            var tournament = new Tournament(null, "VM", startDate, startDate + 1);
            tournament.addGroup("A");

            var game = new Game(null, "home", "away", startDate);
            var gameId = game.save(function(error, result){
                expect(error).toBeUndefined();
            });
            tournament.addGame(game.id, "A");

            var tournamentId = tournament.save(function(error, result){
                expect(error).toBeUndefined();
                Tournaments.remove(tournamentId);
                Games.remove(gameId);
                Meteor.logout(function(){
                    done();
                });
            });
        });
    });
});