module.exports = function(app){

 var tickets = require('./../controllers/tickets.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');
 var buses = require('./../controllers/buses.server.controller.js');

 
 app.route('/api/tickets')
	.get(tickets.list)
	.post(users.requiresLogin, tickets.create);
	
	app.route('/tickets/search').get(tickets.searchView);
	
		app.route('/tickets/:ticketId').get(tickets.singleTicketView);
	
	app.route('/tickets/:busId/new').get(tickets.createTicket);

  app.route('/api/tickets/:ticketId')
	.get(tickets.read)
  .delete(users.requiresLogin, tickets.delete);
  
app.route('/tickets/ticketList').get(tickets.listView);


	app.route('/api/tickets/edit/:ticketId')
	.get(tickets.read)
	.put(users.requiresLogin, tickets.update);


app.param('ticketId', tickets.ticketByID);
app.param('busId', buses.busByID);

}
