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
		expect(Cups.insert.calls.mostRecent().args[0]).toEqual({name:"name", tournament:"1", members:[]});
	});

	it("should be possible to update name and tournament", function(){
		spyOn(Cups, "update");
		var cup = new Cup("1", "name", "1");

		cup.name = "otherName";
		cup.tournament = "2";
		cup.save();

		expect(Cups.update).toHaveBeenCalled();
		expect(Cups.update.calls.mostRecent().args[0]).toEqual("1");
		expect(Cups.update.calls.mostRecent().args[1]).toEqual({$set: { name: "otherName", tournament: "2", members: []}});
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
		expect(Cups.update.calls.mostRecent().args[1]).toEqual({$set:{name:"name", tournament:"1", members: ["1"]}});
	});

	it("should not be possible to add user more than once", function(){
		var cup = new Cup(1, "name", 1);
		cup.addMember("1");
		expect(function(){ cup.addMember("1"); }).toThrow();
	});
});