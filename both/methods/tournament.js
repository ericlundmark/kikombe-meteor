/*****************************************************************************/
/* Tournament Methods */
/*****************************************************************************/

Meteor.methods({
 /*
  * Example:
  *  '/app/tournament/update/email': function (email) {
  *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
  *  }
  *
  */
  '/app/tournament/create': function (tournament) {
  	tournament.createdAt = Date.now();
  	return Tournament.insert(tournament);
  },
  '/app/tournament/update/addGroup': function (tournament, group) {
  	var g = { name: group, games: [] };
  	return Tournament.update({_id: tournament}, {$push: {groups: g}});
  },
  '/app/tournament/find/group/byTeamName': function (tournamentId, teamName) {
    var tournament = Tournament.findOne(tournamentId);
    return _.find(tournament.groups, function(group){
      return _.contains(group.teams, teamName);
    });
  },

  '/app/tournament/update/group/addGame': function (tournamentId, groupName, game) {
    var e =Tournament.find({"groups.name": groupName});
    console.log(e.fetch());
    Tournament.update({_id: tournamentId, "groups.name": groupName}, {$push: {"groups.$.games": game}});
  }
});
