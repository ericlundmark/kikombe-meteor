"use strict";
describe("Game", function(){
	it("should be created with start date, home and away team", function(){
		spyOn(Games, "insert").and.callFake(function(doc, callback){
			callback(null, 1);
		});
		var startDate = Date.now();
		var game = new Game(null, "home", "away", startDate);

		expect(game.home).toBe("home");
		expect(game.away).toBe("away");
		expect(game.start).toBe(startDate);

		game.save();

		expect(game.id).toEqual(1);

		expect(Games.insert).toHaveBeenCalled();
		expect(Games.insert.calls.mostRecent().args[0]).toEqual({home:"home",
			away: "away", start: startDate});
	});

	it("should be possible to update start date, home and away team", function(){
		spyOn(Games, "update");

		var startDate = Date.now();
		var game = new Game(1, "home", "away", startDate);
		
		game.home = "away";
		game.away = "home";
		game.start = startDate + 1;
		game.save();
		expect(Games.update).toHaveBeenCalled();
		expect(Games.update.calls.mostRecent().args[0]).toEqual(1);
		expect(Games.update.calls.mostRecent().args[1]).toEqual({$set: { home: "away", away: "home", start: startDate + 1}});
	});

	it("should not save when home is undefined", function(){
		var game = new Game(null, null, "away", Date.now());
		expect(function(){game.save();}).toThrow();
	});

	it("should not save when away is undefined", function(){
		var game = new Game(null, "home", null, Date.now())
		expect(function(){game.save();}).toThrow();
	});

	it("should not save when start date is undefined", function(){
		var game = new Game(null, "home", "away", null);
		expect(function(){game.save();}).toThrow();
	});
});