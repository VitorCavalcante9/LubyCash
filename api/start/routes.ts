/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';
import GetClientsService from 'App/services/GetClientsService';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

Route.get('/', async () => {
  return { hello: 'world' };
});

// Admins
Route.group(() => {
  Route.post('/admins', 'AdminsController.store');
  Route.get('/admins', 'AdminsController.show');
  Route.put('/admins', 'AdminsController.update');
  Route.delete('/admins', 'AdminsController.destroy');
}).middleware(['auth']);

Route.post('/sessions', 'SessionController.store');

// Passwords
Route.post('/passwords', 'ForgotPasswordController.store');
Route.put('/passwords', 'ForgotPasswordController.update');

// Clients
Route.post('/clients', 'ClientsController.store');

// Transactions
Route.get('/transactions', 'TransactionsController.index').middleware('auth');

// Route.get('/test', async ({ response }: HttpContextContract) => {
//   const service = new GetClientsService();
//   const test = await service.execute();
//   return response.json({ test });
// });
