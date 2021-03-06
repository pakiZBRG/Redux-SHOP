import React from 'react';
import { filterProducts, sortProducts } from '../actions/product_action';
import { connect } from 'react-redux';


function Filter({size, sort, filteredProducts, products, filterProducts, sortProducts}) {
    return(
        !filteredProducts ? <div>Loading...</div> :
        <div className='filter'>
            <div className='filter-result'>
                {filteredProducts.length} products
            </div>
            <div className='filter-sort'>
                Order: 
                <select value={sort} onChange={(e) => sortProducts(filteredProducts, e.target.value)}>
                    <option value='latest'>Latest</option>
                    <option value='highest'>Highest Price</option>
                    <option value='lowest'>Lowest Price</option>
                </select>
            </div>
            <div className='filter-size'>
                Filter: 
                <select value={size} onChange={(e) => filterProducts(products, e.target.value)}>
                    <option value="">All</option>
                    <option value="XS">XS</option>
                    <option value="M">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems
});

export default connect(mapStateToProps, {filterProducts, sortProducts})(Filter);