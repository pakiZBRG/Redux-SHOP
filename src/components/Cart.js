import React, {useState} from 'react';
import Fade from 'react-reveal/Fade';


export default function Cart({cartItems, removeItem, createOrder}){
    const [checkout, setCheckout] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const uploadOrder = e => {
        e.preventDefault();
        const order = {
            name,
            email,
            address,
            cartItems
        }
        createOrder(order)
    }

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
                <Fade left cascade>
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
                </Fade>
            </div>
            {cartItems.length !== 0 &&
            <>
                <div className='cart'>
                    <div className='total' style={{marginRight: '.7rem'}}>
                        Total: $ <strong>{(cartItems.reduce((a, c) => a + (c.price*c.count), 0)).toFixed(2)}</strong>
                    </div>
                    <button
                        onClick={() => setCheckout(true)}
                        className='button primary'
                    >
                        Proceed
                    </button>
                </div>
                {checkout && 
                    <div className='cart'>
                        <form onSubmit={uploadOrder}>
                            <Fade right cascade>
                                <ul className='form-container'>
                                    <li>
                                        <label htmlFor='email'>Email: </label>
                                        <input 
                                            type='email' 
                                            name='email' 
                                            onChange={e => setEmail(e.target.value)}
                                            required 
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor='name'>Name: </label>
                                        <input 
                                            type='text' 
                                            name='name' 
                                            onChange={e => setName(e.target.value)}
                                            required 
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor='address'>Address: </label>
                                        <input 
                                            type='text' 
                                            name='address' 
                                            onChange={e => setAddress(e.target.value)}
                                            required 
                                        />
                                    </li>
                                    <li>
                                        <button 
                                            className='button primary' 
                                            type='submit'
                                        >
                                            Checkout
                                        </button>
                                    </li>
                                </ul>
                            </Fade>
                        </form>
                    </div>
                }
            </>
            }
            
        </div>
    )
}