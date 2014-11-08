// Meteor.startup(function () {
// 	Tournament.remove({});
// 	if (Tournament.find().count() === 0) {		
// 		HTTP.get("http://worldcup.sfg.io/teams/",
// 			function (error, result) {
// 				if (!error) {
// 					var tournament = {
// 						name: "VM 2014",
// 						author: null,
// 						startDate: Date.parse("2014-06-12T17:00:00.000-03:00"),
// 						endDate: Date.parse("2014-07-13T16:00:00.000-03:00"),
// 						groups: []
// 					};
// 					result.data.forEach(function (entry){
// 						var index=-1;
// 						var group = _.find(tournament.groups, function(group){
// 							index++;
// 							return group.name == entry.group_id;
// 						});
// 						if (group) {
// 							group.teams.push(entry.country);
// 							tournament.groups[index] = group;
// 						}else{
// 							group = {
// 								name: entry.group_id,
// 								teams: [ entry.country ],
// 								games: []
// 							}
// 							tournament.groups.push(group);
// 						}
// 					});
// 					Tournament.insert(tournament, function(error, success){
// 						console.log(success);
// 					});
// 				}
// 			});
// 	}
// });