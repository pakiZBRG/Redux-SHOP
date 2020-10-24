import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cart_action';
import { createOrder, clearOrder } from '../actions/order_action';


function Cart({cart, order, removeFromCart, createOrder, clearOrder}){
    const [checkout, setCheckout] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const uploadOrder = e => {
        e.preventDefault();
        const total = cart.reduce((a, c) => (a + c.price*c.count), 0)
        const order = {
            name,
            email,
            address,
            cart,
            total
        }
        createOrder(order)
    }

    return(
        <div>
            {cart.length === 0
                ?
                <div className='cart cart-header'>
                    Cart is empty
                </div>
                :
                <div className='cart cart-header'>
                    {cart.length} item(s) in cart
                </div>
            }
            {order && 
                <Modal isOpen={true} onRequestClose={clearOrder}>
                    <Zoom>
                        <button 
                            className='close-modal'
                            onClick={clearOrder}
                        >
                            x
                        </button>
                        <div className='order-details'>
                            <h3 className='success-message'>You order has been placed</h3>
                            <h2>OrderID: {order._id}</h2>
                            <ul>
                                <li>Name: <span className='items'>{order.name}</span></li>
                                <li>Email: <span className='items'>{order.email}</span></li>
                                <li>Address: <span className='items'>{order.address}</span></li>
                                <li>Date: <span className='items'>{order.createdAt}</span></li>
                                <li>Cart: {order.cart.map(item => <span className='items' key={item._id}>{item.count} x {item.title}</span>)}</li>
                                <li>Total: <span className='items'>$ {order.total}</span></li>
                            </ul>
                        </div>
                    </Zoom>
                </Modal>
            }
            <div className='cart'>
                <Fade left cascade>
                    <ul className='cart-items'>
                        {cart.map(item => 
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}/>
                                </div>
                                <div>
                                    {item.title}
                                    <div className='right'>
                                        {item.count} x $ {item.price} {' '}
                                        <button 
                                            className='button' 
                                            onClick={() => removeFromCart(item)}
                                        >
                                            <i className='fa fa-trash'></i>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </Fade>
            </div>
            {cart.length !== 0 &&
            <>
                <div className='cart'>
                    <div className='total' style={{marginRight: '.7rem'}}>
                        Total: $ <strong>{(cart.reduce((a, c) => a + (c.price*c.count), 0)).toFixed(2)}</strong>
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

const mapStateToProps = state => ({
    cart: state.cart.cart,
    order: state.order.order
})

export default connect(
    mapStateToProps, 
    {
        removeFromCart,
        createOrder,
        clearOrder
    }
)(Cart);