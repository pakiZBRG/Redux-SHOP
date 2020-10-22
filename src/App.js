import React, {useState} from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';


function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');

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
 