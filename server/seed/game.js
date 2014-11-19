Meteor.startup(function () {
	var tournament = Tournaments.findOne();
	if (tournament) {
		HTTP.get("http://worldcup.sfg.io/matches",
			function (error, result) {
				if (!error) {
					result.data.forEach(function (g){
						var game = new Game(null, g.home_team.country, g.away_team.country, Date.parse(g.datetime));
						game.setScore(g.home_team.goals, g.away_team.goals);
						var id = game.save();
						tournament.addGame(id, "1");
					});
					tournament.save();
				}
			});
	}
});