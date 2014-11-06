/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
});

App.helpers = {
	format: function (date){
		return moment(date).format(App.datetimeFormat);
	},
	log: function (data){
		console.log(data);
	}
};

_.each(App.helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});
