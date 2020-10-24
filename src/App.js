import React, {useState} from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';


function App() {
  const [cart, setCart] = useState(
    (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []
  );

    const createOrder = order => {
      alert('Need to save an order '+ order.name);
    }

  const removeItem = item => {
    const removeItem = cart.filter(product => product._id !== item._id);
    setCart(removeItem)
    localStorage.setItem('cart', JSON.stringify(removeItem));
  }

  const addToCart = product => {
    const cartItems = [...cart];
    let inCart = false;
    cartItems.forEach(item => {
      if(item._id === product._id){
        item.count++;
        inCart = true
      }
    });
    if(!inCart){
      cartItems.push({...product, count: 1})
    }
    setCart(cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

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
              <Products
                addToCart={addToCart}
              />
            </div>
            <div className='sidebar'>
              <Cart 
                cartItems={cart}
                removeItem={removeItem}
                createOrder={createOrder}
              />
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

export default App;
 