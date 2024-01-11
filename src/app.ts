import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/message.response';
import OrdersService from './services/orders.service';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.set('views', __dirname + '/views');
// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/kitchen', function(req, res) {
  res.render('pages/kitchen', {orders: OrdersService.retrive()});
});


app.get('/about', function(req, res) {
  res.render('pages/about');
});


// app.get('/orders/new', function(req, res) {
//   res.render('pages/orders-new', {orders: OrdersService.createOrder()});
// });



app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
