Tournaments = new Mongo.Collection('tournaments', {
    transform: function(doc) {
        return new Tutorial(doc._id, doc.name, doc.startDate, doc.endDate);
    }
});

/*
 * Add query methods like this:
 *  Tournament.findPublic = function () {
 *    return Tournament.find({is_public: true});
 *  }
 */
 Tournament = function(id, name, startDate, endDate){
 	this._id=id;
 	this._name=name;
 	this._startDate=startDate;
 	this._endDate=endDate;
    this._groups = [];
 }
 Tournament.prototype = {
 	get id(){
 		return this._id;
 	},
 	get name(){
 		return this._name;
 	},
 	get startDate(){
 		return this._startDate;
 	},
 	get endDate(){
 		return this._endDate;
 	},
 	get author(){
 		return this._author;
 	},
 	get active(){
 		return this._endDate >= Date.now();
 	},
    get groups(){
        return this._groups;
    },
 	set name(value){
 		this._name=value;
 	},
 	set startDate(value){
 		this._startDate=value;
 	},
 	set endDate(value){
 		this._endDate=value;
 	},
 	set author(value){
 		this._author=value;
 	},
    addGame: function(game, group){
        this.getGroup(group).games.push(game);
    },
    addGroup: function(name){
        if (this.getGroup(name)) {
            throw new Meteor.Error("Group already added!");
        };
        var group = { name: name, games: []};
        this._groups.push(group);
    },
    getGroup: function(group){
        return _.findWhere(this._groups, {name: group});
    },
 	save: function(callback) {
 		if (!this.name) {
 			throw new Meteor.Error("Name is not defined!");
 		};
 		if (!this.startDate) {
 			throw new Meteor.Error("Start date is not defined!");
 		};
 		if (!this.endDate) {
 			throw new Meteor.Error("End date is not defined!");
 		};
 		if (this.startDate >= this.endDate) {
 			throw new Meteor.Error("Start date must be before end date");
 		};
        // remember the context since in callback it is changed
        var that = this;
        var doc = {name: this.name, startDate: this.startDate, endDate: this.endDate, groups: this.groups};

        if (this.id) {
        	Tournaments.update(this.id, {$set: doc}, callback);
        } else{
        	doc.author = Meteor.userId();

        	Tournaments.insert(doc, function(error, result) {
        		that._id = result;

        		if (callback != null) {
        			callback.call(that, error, result);
        		}
        	});
        };
    },
    delete: function(callback) {
        Tournaments.remove(this.id, callback);
    }
};