import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';


export default function App() {
  return (
    <Provider store={store}>
      <div className='grid-container'>
        <header>
          <a href="/">Redux Shop</a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Filter />
              <Products/>
            </div>
            <div className='sidebar'>
              <Cart/>
            </div>
          </div>
        </main>
        <footer>
          Nikola Pavlovic &copy; 2020;
        </footer>
      </div>
    </Provider>
  );
}