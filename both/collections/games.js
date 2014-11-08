Games = new Mongo.Collection('games');

/*
 * Add query methods like this:
 *  Game.findPublic = function () {
 *    return Game.find({is_public: true});
 *  }
 */
 Game = function(id, home, away, start){
 	this._id = id;
 	this._home = home;
 	this._away = away;
 	this._start = start;
 }
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
 	set home(value){
 		this._home=value;
 	},
 	set away(value){
 		this._away=value;
 	},
 	set start(value){
 		this._start=value;
 	},
 	save: function(callback){
 		if (!this.home) {
 			throw new Meteor.Error("Home must be defined!");
 		};
 		if (!this.away) {
 			throw new Meteor.Error("Away must be defined!")
 		};
 		if (!this.start) {
 			throw new Meteor.Error("Start must be defined!");
 		};

 		var that = this;
 		var doc = {home: this.home, away: this.away, start: this.start};
 		
 		if (this.id) {
 			Games.update(this.id, {$set: doc}, callback);
 		} else{
 			Games.insert(doc, function(error, result){
 				that._id = result;
 			});
 		};
 		
 	}
 }