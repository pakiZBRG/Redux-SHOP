import React, {useState} from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';


function App() {
  const [products, setProducts] = useState(data.products);
  const [cart, setCart] = useState([]);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');

  const removeItem = item => setCart(cart.filter(product => product._id !== item._id));

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
    setCart(cartItems)
  }

  const filterSort = e => {
    console.log(e.target.value);
    setSort(e.target.value);
    setProducts(data.products.slice().sort((a, b) => 
      sort === "lowest" 
        ? 
      (a.price < b.price) ? 1 : -1
        : 
      sort === "highest" 
        ? 
      (a.price > b.price) ? 1 : -1
      : 
      (a._id > b._id) ? 1 : -1));
  }

  const filterSize = e => {
    if(e.target.value === ''){
      setProducts(data.products);
      setSize(e.target.value);
    } else {
      setProducts(data.products.filter(product => product.availableSizes.indexOf(e.target.value) >= 0));
      setSize(e.target.value);
    }    
  }

  return (
    <div className='grid-container'>
      <header>
        <a href="/">Redux Shop</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter 
              count={products.length}
              size={size}
              sort={sort}
              filterSize={filterSize}
              filterSort={filterSort}
            />
            <Products 
              products={products}
              addToCart={addToCart}
            />
          </div>
          <div className='sidebar'>
            <Cart 
              cartItems={cart}
              removeItem={removeItem}
            />
          </div>
        </div>
      </main>
      <footer>
        Nikola Pavlovic &copy; 2020;
      </footer>
    </div>
  );
}

export default App;
 