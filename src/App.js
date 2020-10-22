import React, {useState} from 'react';
import data from './data.json';
import Products from './components/Products';


function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');

  return (
    <div className='grid-container'>
      <header>
        <a href="/">Redux Shop</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Products products={products}/>
          </div>
          <div className='sidebar'>
            Cart Items
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
 