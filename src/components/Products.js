import React, {useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import {fetchProducts} from '../actions/product_action';
import {connect} from 'react-redux';


function Product({products, addToCart, fetchProducts}){
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        fetchProducts()
    }, [])

    const openModal = product => setProduct(product);
    const closeModal = () => setProduct(null);

    return(
        <div>
            <Fade bottom big cascade>
                {!products 
                    ? 
                <div>Loading</div> 
                    : 
                <ul className='products'>
                    {products.map(product => 
                    <li key={product._id}>
                        <div className='product'>
                            <a href={`#${product._id}`} onClick={() => openModal(product)}>
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
                }
            </Fade>
            {product && 
                <Modal isOpen={true} onRequestClose={closeModal}>
                    <Zoom>
                        <button className='button close-modal' onClick={closeModal}>x</button>
                        <div className='product-details'>
                            <img src={product.image} alt={product.title}/>
                            <div>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>Sizes: {product.availableSizes.map(size => <button className='button'>{size}</button>)}</p>
                                <div className='product-price'>
                                    <div>$ {product.price}</div>
                                    <button 
                                        className='button primary' 
                                        onClick={() => {
                                            addToCart(product);
                                            closeModal();
                                        }}
                                    >
                                        <i className='fa fa-shopping-cart'></i> Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    products: state.products.items
})


export default connect(mapStateToProps, {fetchProducts})(Product);