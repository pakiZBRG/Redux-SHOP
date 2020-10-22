import React from 'react';

export default function Product({products}){

    return(
        <div>
            <ul className='products'>
                {products.map(({_id, image, title, price }) => 
                <li key={_id}>
                    <div className='product'>
                        <a href={`/${_id}`}>
                            <img src={image} alt={title}/>
                            <p>{title}</p>
                        </a>
                        <div className='product-price'>
                            <div>$ {price}</div>
                            <button className='button primary'>
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