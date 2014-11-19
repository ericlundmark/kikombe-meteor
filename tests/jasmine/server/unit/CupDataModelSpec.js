"use strict";
describe("Cup", function(){
	it("should be created with name and tournament", function(){
		spyOn(Cups, "insert").and.callFake(function(doc, callback){
			callback(null, "1");
		});

		var cup = new Cup(null, "name", "1");
		expect(cup.name).toBe("name");
		expect(cup.tournament).toBe("1");

		cup.save();

		expect(cup.id).toEqual("1");
		expect(Cups.insert).toHaveBeenCalled();
		expect(Cups.insert.calls.mostRecent().args[0]).toEqual({name:"name", tournament:"1",
			members:[], predictions: [], owner: null});
	});

	it("should be possible to update name and tournament", function(){
		spyOn(Cups, "update");
		var cup = new Cup("1", "name", "1");

		cup.name = "otherName";
		cup.tournament = "2";
		cup.save();

		expect(Cups.update).toHaveBeenCalled();
		expect(Cups.update.calls.mostRecent().args[0]).toEqual("1");
		expect(Cups.update.calls.mostRecent().args[1]).toEqual({$set: { name: "otherName", tournament: "2",
			members: [], predictions: []}});
	});

	it("should not be possible to save when name is undefined", function(){
		var cup = new Cup(null, null, "1");
		expect(function(){ cup.save(); }).toThrow();
	});

	it("should not be possible to save when tournament is undefined", function(){
		var cup = new Cup(null, "name", null);
		expect(function(){ cup.save(); }).toThrow();
	});

	it("should be possible to add users", function(){
		spyOn(Cups, "update");
		var cup = new Cup("1", "name", "1");
		cup.addMember("1");

		expect(cup.members.length).toBe(1);
		cup.save();

		expect(cup.id).toEqual("1");
		expect(Cups.update).toHaveBeenCalled();
		expect(Cups.update.calls.mostRecent().args[0]).toEqual("1");
		expect(Cups.update.calls.mostRecent().args[1]).toEqual({$set:{name:"name", tournament:"1",
			members: ["1"], predictions: []}});
	});

	it("should not be possible to add user more than once", function(){
		var cup = new Cup(1, "name", 1);
		cup.addMember("1");
		expect(function(){ cup.addMember("1"); }).toThrow();
	});

	it("should be possible to add a user prediction of a game", function(){
		spyOn(Cups, "update");
		var cup = new Cup("1", "name", "1");
		cup.addPrediction("1", 1, 1);
		expect(cup.predictions.length).toBe(1);

		cup.save();
		expect(Cups.update).toHaveBeenCalled();
		expect(Cups.update.calls.mostRecent().args[0]).toEqual("1");
		var expectedCup = {
			name: "name",
			tournament: "1",
			members: [],
			predictions: [
			{
				game: "1",
				prediction: { home: 1, away: 1},
				user: Meteor.userId()
			}
			]
		}
		expect(Cups.update.calls.mostRecent().args[1]).toEqual({ $set: expectedCup });
	});

	it("should only be possible for a member to add one prediction per game", function(){
		var cup = new Cup("1", "name", "1");
		cup.addPrediction("1", 1, 1);
		expect(function(){cup.addPrediction("1", 1, 2);}).toThrow();
	});

	it("should be possible to update a prediction", function(){
		spyOn(Cups, "update");
		var cup = new Cup("1", "name", "1");
		cup.addPrediction("1", 1, 1);
		cup.updatePrediction("1", 1, 2);
		cup.save();

		expect(Cups.update).toHaveBeenCalled();
		expect(Cups.update.calls.mostRecent().args[0]).toEqual("1");
		var expectedCup = {
			name: "name",
			tournament: "1",
			members: [],
			predictions: [
			{
				game: "1",
				prediction: { home: 1, away: 2},
				user: Meteor.userId()
			}
			]
		}
		expect(Cups.update.calls.mostRecent().args[1]).toEqual({ $set: expectedCup });
	});
	
	it("should not be possible to update a prediction that does not exist", function(){
		var cup = new Cup("1", "name", "1");
		expect(function(){cup.updatePrediction("1", 1, 2);}).toThrow();
	});
});