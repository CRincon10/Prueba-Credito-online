import React, { Fragment, useContext, useEffect } from 'react'
import { CreditoContext } from '../../context/creditoContext'

import'./home.css'

 const HomeScreen = ({ changeScreen }) => {
  const {
    cargarCreditos
    
    
  } = useContext(CreditoContext)

  useEffect(() => {
    cargarCreditos()
    // eslint-disable-next-line
  }, [])
  

  return (
    <Fragment>

      <section className="wrap wrap-content">
        <section id="info">
    
          <div id="cards">

            <div 
            onClick={() => changeScreen(1)}
            id="card">
              <p id="icons" className="icon">H</p>
              <h2 className="category">Solicita Credito</h2>
              <p className="description"></p>
          
            </div>

            <div 
            onClick={() => changeScreen(2)}
            id="card">
                <p id="icons" className="icon">_</p>
                <h2 className="category">Consulta Historial de creditos</h2>
                <p className="description">
                    
                </p>
            </div>

            <div id="card">
                <p id="icons" className="icon">S</p>
                <h2 className="category">Ajustes de perfil</h2>
                <p className="description">
                    
                </p>
            </div>

            <div id="card">
                <p id="icons" className="icon">u</p>
                <h2 className="category">Covertura</h2>
                <p className="description">
                    
                </p>
            </div>

            <div id="card">
                <p id="icons" className="icon">a</p>
                <h2 className="category">Documentación</h2>
                <p className="description">
                    
                </p>
            </div>

          </div>
        </section>
      </section>
      
    </Fragment>
  )
}

export default HomeScreen
