Meteor.startup(function () {
	Tournaments.remove({});
	if (Tournaments.find().count() === 0) {		
		HTTP.get("http://worldcup.sfg.io/teams/",
			function (error, result) {
				if (!error) {
					var tournament = new Tournament(null, "VM 2014", Date.parse("2014-06-12T17:00:00.000-03:00"), Date.parse("2014-07-13T16:00:00.000-03:00"),"1");
					result.data.forEach(function (entry){
						try{
							tournament.addGroup(entry.group_id);
						}catch(error){
							console.log("Group error");
						}
					});
					tournament.author = "admin";
					tournament.save(function(error, result){
						if (result) {
							console.log("Success");
						} else{
							console.log(error);
						};
					});
				}
			});
	}
});