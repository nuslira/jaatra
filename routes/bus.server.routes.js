module.exports = function(app){

 var buses = require('./../controllers/buses.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

 app.route('/api/buses')
	.get(buses.list)
	.post(users.requiresLogin, buses.create);
	
	app.route('/buses/new').get(buses.createBus);
	
	app.route('/contact').get(buses.contactView);
	
	app.route('/jaatra/about').get(buses.aboutView);
	app.route('/tickets/success').get(buses.ticket_thakyouView);
	
	app.route('/buses/thankyou').get(buses.thankyouView);

	app.route('/enterpriseList').get(buses.enterpriseListView);

  app.route('/api/buses/:busId')
	.get(buses.read)
  .delete(users.requiresLogin, buses.delete);
  
app.route('/buses/all').get(buses.listView);


	app.route('/api/buses/edit/:busId')
	.get(buses.read)
	.put(users.requiresLogin, buses.update);


app.param('busId', buses.busByID);


}
