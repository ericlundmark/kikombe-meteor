"use strict";
describe("Game", function(){
	it("should be created with home team, away team and start date", function(){
		spyOn(Games, "insert").and.callFake(function(doc, callback){
			callback(null, "1");
		});
		var start = Date.now();
		var game = new Game(null, "home", "away", start);
		expect(game.home.name).toBe("home");
		expect(game.home.score).toBe(0);
		expect(game.away.name).toBe("away");
		expect(game.away.score).toBe(0);
		expect(game.start).toBe(start);
		game.save();

		expect(game.id).toEqual("1");
		expect(Games.insert).toHaveBeenCalled();
		expect(Games.insert.calls.mostRecent().args[0]).toEqual({
			home: {name: "home", score: 0},
			away:{name: "away", score: 0}, 
			start: start
		});
	});
	it("should possible to update the names, scores and start time", function(){
		spyOn(Games, "update");
		var start = Date.now();
		var game = new Game("1", "home", "away", start);

		game.home.name = "h";
		game.away.name = "a";
		game.setScore(1, 1);
		expect(game.home.score).toBe(1);
		expect(game.away.score).toBe(1);
		game.save();

		expect(Games.update).toHaveBeenCalled();
		expect(Games.update.calls.mostRecent().args[0]).toEqual("1");
		expect(Games.update.calls.mostRecent().args[1]).toEqual({$set:{
			home: {name: "h", score: 1},
			away:{name: "a", score: 1}, 
			start: start
		}});
	});

	it("should not save when home is undefined", function(){
		var start = Date.now();
		var game = new Game(null, null, "away", start);
		expect(function(){game.save();}).toThrow();
	});
	it("should not save when away is undefined", function(){
		var start = Date.now();
		var game = new Game(null, "home", null, start);
		expect(function(){game.save();}).toThrow();
	});
	it("should not save when start date is undefined", function(){
		var start = Date.now();
		var game = new Game(null, "home", "away", null);
		expect(function(){game.save();}).toThrow();
	});
});