import React from 'react'
import emptyCart from '../assets/img/empty-cart.png'
import {Link} from "react-router-dom";

const CartEmpty = () => {
  return (
    <>
    <div className='cart cart--empty'>
        <h2>Кошик пустує...</h2>
        <p>
            Для того, щоб додати піцу до кошика, додайте її на головній сторінці!
        </p>
        <img src= {emptyCart} alt = 'emptyCart'/>
        <Link to = "/">
        <a className='button button-black'>
            <span>Повернутися до головної</span>
        </a>
        </Link>
       
    </div>
    </>
  )
}
export default CartEmpty