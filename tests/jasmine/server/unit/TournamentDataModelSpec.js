"use strict";
describe("Tournament", function(){
	it("should be created with name, start and end date", function(){
		spyOn(Tournaments, "insert").and.callFake(function(doc, callback) {
            // simulate async return of id = "1";
            callback(null, "1");
        });

		var startDate = Date.now();
		var endDate = startDate + 1;
		var tournament = new Tournament(null, "Tournament", startDate, endDate);

		expect(tournament.name).toBe("Tournament");
		expect(tournament.startDate).toBe(startDate);
		expect(tournament.endDate).toBe(endDate);

		tournament.save();

		expect(tournament.id).toEqual("1");

		expect(Tournaments.insert).toHaveBeenCalled();
		expect(Tournaments.insert.calls.mostRecent().args[0]).toEqual({name:"Tournament",
			startDate: startDate, endDate: endDate, groups: [],author:null});
	});

	it("should be possible to update the name, start date and end date", function(){
		spyOn(Tournaments, "update");
		var startDate = Date.now();
		var endDate = startDate + 1;
		var tournament = new Tournament("1", "VM", startDate, endDate);

		var updatedStartDate = endDate + 1;
		var updatedEndDate = updatedStartDate + 1;

		tournament.name = "EM";
		tournament.startDate = updatedStartDate
		tournament.endDate = updatedEndDate
		tournament.save();

        // use last call to access arguments
        expect(Tournaments.update).toHaveBeenCalled();
        expect(Tournaments.update.calls.mostRecent().args[0]).toEqual("1");
        expect(Tournaments.update.calls.mostRecent().args[1]).toEqual({$set: { name: "EM", startDate:updatedStartDate,
        	endDate: updatedEndDate, groups: []}});
    });

	it("should not save when name is not defined", function(){
		var tournament = new Tournament(null, null, new Date(), new Date());
		expect(function(){tournament.save();}).toThrow();
	});
	it("should not save when startDate is not defined", function(){
		var tournament = new Tournament(null, "VM", null, new Date());
		expect(function(){tournament.save();}).toThrow();
	});
	it("should not save when endDate is not defined", function(){
		var tournament = new Tournament(null, "VM", new Date(), null);
		expect(function(){tournament.save();}).toThrow();
	});
	it("should not save when endDate is earlier the same as startDate", function(){
		var date = Date.now();
		var tournament = new Tournament(null, "VM", date, date);
		expect(function(){tournament.save();}).toThrow();
	});

	it("should be inactive when endDate has passed", function(){
		var date = Date.now();
		var tournament = new Tournament(null, "VM", date-2, date - 1);
		expect(tournament.active).toEqual(false);
	});

	it("should be possible to remove tournament", function () {
		spyOn(Tournaments, "remove");

		var tournament = new Tournament("1");
		tournament.delete();

        // use last call to access arguments
        expect(Tournaments.remove).toHaveBeenCalled();
        expect(Tournaments.remove.calls.mostRecent().args[0]).toEqual("1");
    });

	it("should be possible to add a group to a tournament", function(){
		spyOn(Tournaments, "update");
		var startDate = Date.now();
		var tournament = new Tournament("1", "VM", startDate, startDate + 1);
		tournament.addGroup("A");
		expect(tournament.groups.length).toBe(1);
		tournament.save();

		expect(Tournaments.update).toHaveBeenCalled();
		expect(Tournaments.update.calls.mostRecent().args[0]).toEqual("1");
		expect(Tournaments.update.calls.mostRecent().args[1]).toEqual({$set: { name: "VM", startDate: startDate,
			endDate: startDate + 1, groups: [{name: "A", games: []}]}});
	});

	it("should not be possible not add the same group twice", function(){
		var tournament = new Tournament("1");
		tournament.addGroup("A");
		expect(function(){ tournament.addGroup("A") }).toThrow();
	});

	it("should be possible to add a game to a group", function(){
		spyOn(Tournaments, "update");
		var startDate = Date.now();
		var tournament = new Tournament("1", "VM", startDate, startDate + 1);

		var group = "A";
		tournament.addGroup(group);

		var game = new Game("home", "away", startDate);
		tournament.addGame(game, group);
		expect(tournament.getGroup(group).games.length).toBe(1);

		tournament.save();

		expect(Tournaments.update).toHaveBeenCalled();
		expect(Tournaments.update.calls.mostRecent().args[0]).toEqual("1");
		expect(Tournaments.update.calls.mostRecent().args[1]).toEqual({$set: { name: "VM", startDate: startDate,
			endDate: startDate + 1, groups: [{name: "A", games: [game]}]}});
	});

	it("should not be possible to add a game to a group that doesnt exist", function(){
		var startDate = Date.now();
		var tournament = new Tournament("1", "VM", startDate, startDate + 1);

		var game = new Game("home", "away", startDate);
		expect(function(){tournament.addGame(game, "A")}).toThrow();
	});

	it("should not be possible to add a game without a group", function(){
		var startDate = Date.now();
		var tournament = new Tournament("1", "VM", startDate, startDate + 1);

		var game = new Game("home", "away", startDate);
		expect(function(){tournament.addGame(game, null)}).toThrow();
	});
});