Games = new Mongo.Collection('games', {transform: function(doc) {
	var game = new Game(doc._id, doc.home.name, doc.away.name, doc.start);
	game.setScore(doc.home.score, doc.away.score);
	return game;
}});

Game = function(id, home, away, start){
	this._id = id;
	this._home = { name: home, score: 0};
	this._away = { name: away, score: 0};
	this._start = start;
};
Game.prototype = {
	get id(){
		return this._id;
	},
	get home(){
		return this._home;
	},
	get away(){
		return this._away;
	},
	get start(){
		return this._start;
	},
	setScore: function(home, away){
		this._home.score = home;
		this._away.score = away;
	},
	save: function(callback){
		if(!this._home.name){
			throw new Meteor.Error("The home teams name must be defined");
		};
		if(!this._away.name){
			throw new Meteor.Error("The away teams name must be defined");
		};
		if(!this._start){
			throw new Meteor.Error("The start date must be defined");
		};
		var doc = {
			home: this._home,
			away: this._away,
			start: this._start
		}
		var that = this;
		if (this._id) {
			Games.update(this._id, {$set: doc}, callback	);
		} else{
			Games.insert(doc, function(error, result){
				that._id = result;

				if (callback != null) {
					callback.call(that, error, result);
				}
			});
		};
	}
};