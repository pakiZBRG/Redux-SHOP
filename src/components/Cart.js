import React from 'react';

export default function Cart({cartItems, removeItem}){
    return(
        <div>
            {cartItems.length === 0
            ?
            <div className='cart cart-header'>
                Cart is empty
            </div>
            :
            <div className='cart cart-header'>
                {cartItems.length} item(s) in cart
            </div>
            }
            <div className='cart'>
                <ul className='cart-items'>
                    {cartItems.map(item => 
                        <li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title}/>
                            </div>
                            <div>
                                {item.title}
                                <div className='right'>
                                    {item.count} x $ {item.price} {' '}
                                    <button className='button' onClick={() => removeItem(item)}>
                                        <i className='fa fa-trash'></i>
                                    </button>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            {cartItems.length !== 0 &&
                <div className='cart'>
                    <div className='total' style={{marginRight: '.7rem'}}>
                        Total: $ <strong>{(cartItems.reduce((a, c) => a + (c.price*c.count), 0)).toFixed(2)}</strong>
                    </div>
                    <button className='button primary'>Proceed</button>
                </div>
            }
        </div>
    )
}