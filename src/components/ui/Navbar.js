import React, { Fragment } from 'react'


import'./navbar.css'

const Navbar = ({ changeScreen }) => {
  
  return (
    <Fragment>

<div>   
            <header className='header'>
                    <div className='wrap'>
                        <div className='logo'>
                            <span className="gear">S</span>
                            <h3>C-Online</h3>
                        </div>

                        <nav className='nav'>
                            <ul>
                                <li onClick={ ()=>{changeScreen(0)} }>HOME </li>
                                <li onClick={ ()=>{changeScreen(1)} }>SOLICITUD DE CREDITOS</li>
                                <li onClick={ ()=>{changeScreen(2)} }>HISTORIAL CREDITOS</li>
                                <li>CONTACTO</li>
                            
                            </ul>
                        </nav>
                    </div>
            </header>

        </div>
      
    </Fragment>
  )
}

export default Navbar

