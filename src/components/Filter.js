import React from 'react';

export default function Filter({count, size, sort, filterSize, filterSort}) {
    return(
        <div className='filter'>
            <div className='filter-result'>
                {count} products
            </div>
            <div className='filter-sort'>
                Order: 
                <select value={sort} onChange={filterSort}>
                    <option>Latest</option>
                    <option value='highest'>Highest Price</option>
                    <option value='lowest'>Lowest Price</option>
                </select>
            </div>
            <div className='filter-size'>
                Filter: 
                <select value={size} onChange={filterSize}>
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