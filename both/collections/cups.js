Cups = new Mongo.Collection('cups');

/*
 * Add query methods like this:
 *  Cup.findPublic = function () {
 *    return Cup.find({is_public: true});
 *  }
 */
 Cup = function(id, name, tournament){
 	this._id = id;
 	this._name = name;
 	this._tournament = tournament;
 	this._members = [];
 }

 Cup.prototype = {
 	get id(){
 		return this._id;
 	},
 	get name(){
 		return this._name;
 	},
 	get tournament(){
 		return this._tournament;
 	},
 	get members(){
 		return this._members;
 	},
 	set name(value){
 		this._name = value;
 	},
 	set tournament(value){
 		this._tournament = value;
 	}, 
 	save: function(callback){
 		if(!this.name){
 			throw new Meteor.Error("Name must be defined!");
 		};
 		if (!this.tournament) {
 			throw new Meteor.Error("Tournament must be defined!")
 		};
 		var that = this;
 		var doc = {name: this._name, tournament: this._tournament, members: this._members};
 		if (this._id) {
 			Cups.update(this._id, {$set: doc}, callback);
 		} else{
 			Cups.insert(doc, function(error, result){
 				that._id = result;

 				if (callback != null) {
                    callback.call(that, error, result);
                }
 			});
 		};
 	},
 	addMember: function(member){
 		if (_.contains(this._members, member)) {
 			throw new Meteor.Error("User already added!");
 		};
 		this._members.push(member);
 	}
 }