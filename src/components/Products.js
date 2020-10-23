import React, {useState} from 'react';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';


export default function Product({products, addToCart}){
    const [product, setProduct] = useState(null);
    
    const openModal = product => setProduct(product);
    const closeModal = () => setProduct(null);

    return(
        <div>
            <Fade bottom big cascade>
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
            </Fade>
            {product && 
                <Modal isOpen={true} onRequestClose={closeModal}>
                    <Zoom>
                        <button className='button' onClick={closeModal}>x</button>
                        <div className='produc-details'>
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