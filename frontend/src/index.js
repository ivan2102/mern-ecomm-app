import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import ShippingAddress from './screens/ShippingAddress';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import OrderDetail from './screens/OrderDetail';
import UserProfile from './screens/UserProfile';
import OrdersAdminList from './screens/admin/OrdersAdminList';
import ProductsAdminList from './screens/admin/ProductsAdminList';
import UpdateProduct from './screens/admin/UpdateProduct';
import UsersList from './screens/admin/UsersList';
import UpdateUser from './screens/admin/UpdateUser';

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={ <Home/> } />
      <Route path='/search/:keyword' element={<Home />} />
      <Route path='/page/:pageNumber' element={<Home />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<Home />} />
      <Route path='/product/:id' element={ <ProductDetails/> } />
      <Route path='/cart' element={ <Cart/> } />
      <Route path='/login' element={ <Login/> } />
      <Route path='/register' element={ <Register /> } />
      
      <Route path='' element={<PrivateRoute />}>
      <Route path='/shipping' element={ <ShippingAddress />} />
      <Route path='/payment' element={<Payment />} />
      <Route path='placeorder' element={<PlaceOrder />} />
      <Route path='/order/:id' element={<OrderDetail />} />
      <Route path='/profile' element={<UserProfile />} />
      
      </Route>

      <Route path='' element={ <AdminRoute /> }>
      <Route path='/admin/orderlist' element={<OrdersAdminList />} />
      <Route path='/admin/productlist' element={<ProductsAdminList />} />
      <Route path='/admin/productlist/:pageNumber' element={<ProductsAdminList />} />
      <Route path='/admin/product/:id/edit' element={<UpdateProduct />} />
      <Route path='/admin/userlist' element={<UsersList />} />
      <Route path='/admin/user/:id/edit' element={<UpdateUser />} />
      </Route>

     </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
    <PayPalScriptProvider deferLoading={ true }>
    <RouterProvider router={router} />
    </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
