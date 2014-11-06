Meteor.startup(function () {
	var t = Tournament.find();
	if (t.count() === 1) {
		if (t.fetch()[0].groups) {
			HTTP.get("http://worldcup.sfg.io/matches",
			function (error, result) {
				if (!error) {
					var tournament = Tournament.findOne();
					result.data.forEach(function (game){
						var g = {
							home: {name: game.home_team.country, goals: game.home_team.goals},
							away: {name: game.away_team.country, goals: game.away_team.goals},
							start: Date.parse(game.datetime)
						}
						var group = Meteor.call('/app/tournament/find/group/byTeamName', tournament._id ,g.home.name);
						Meteor.call('/app/tournament/update/group/addGame', tournament._id, group.name, g);
					});
				}
			});
		};
	}
});