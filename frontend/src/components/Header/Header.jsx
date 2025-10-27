import React from 'react'
import './Header.css'


const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Our food-ordering website allows users to browse delicious meals, add them to their cart, and place orders easily online</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header