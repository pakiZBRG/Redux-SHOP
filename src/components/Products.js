import React from 'react';

export default function Product({products, addToCart}){
    return(
        <div>
            <ul className='products'>
                {products.map(product => 
                <li key={product._id}>
                    <div className='product'>
                        <a href={`/${product._id}`}>
                            <img src={product.image} alt={product.title}/>
                            <p>{product.title}</p>
                        </a>
                        <div className='product-price'>
                            <div>$ {product.price}</div>
                            <button 
                                onClick={() => addToCart(product)}
                                className='button primary'
                            >
                                <i className="fa fa-shopping-cart"></i> Cart
                            </button>
                        </div>
                    </div>
                </li>
                )}
            </ul>
        </div>
    )
}