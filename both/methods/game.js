/*****************************************************************************/
/* Game Methods */
/*****************************************************************************/

Meteor.methods({
 /*
  * Example:
  *  '/app/game/update/email': function (email) {
  *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
  *  }
  *
  */

  '/app/game/create': function (game) {
  	Game.create(game);
  }
  
  
});
