import React, { Fragment, useContext } from 'react'
import { CreditoContext } from '../../context/creditoContext'

import'./creditos.css'

const ConsultarCreditos
 = ({ changeScreen }) => {
  
  const {
    
    creditosPorTipo,
    borrarCredito,
    editarCredito,
    cambiarEstadoEditar
    
    
  } = useContext(CreditoContext)

  return (
    <Fragment>

      
      <div className='main_content'>
        
        <section className='creditos_sidebar'>  
                     
          <div className='creditos_new-entrey'>
            <p className='mt-5'>Creditos</p>
          </div>

          <div  >


            {
              creditosPorTipo.filter(tipoCredit => tipoCredit.length > 0).map( (tipoCredito, index) => 
              
               
              <div key={index} >
                <h3> Tipo credito: {tipoCredito[0].tipoCredito} </h3>
                {
                  tipoCredito.map( (credito, index) =>
                    <div key={index} className="consulta_creditos">
                      <div className='credito_entry-body-info' style={{border: '2px solid black' }}>
                        <h5> Crédito # {index} </h5>
                       
                        <div >
                          <p 
                          className='credito_entry-title'>
                              {`${credito.nombre}`}
                          </p>
                          <p className='credito_entry-content'>
                              {`cc ${credito.Ndocumento}`}
                          </p>
                          <p className='credito_entry-content'>
                              {'Valor: '+ parseInt(credito.valor).toLocaleString("es-CO")}
                          </p>
                        
                        </div>

                        <div className='journal__entry-date-box'>
                          
                          <p>
                            <i className ='fas fa-trash'  style={{color: 'white'}} onClick={() => { borrarCredito(credito.tipoCredito, index) }}></i>
                          </p>

                          <p>
                            <i className ='fas fa-pencil-alt'  style={{color: 'white'}} onClick={() => { cambiarEstadoEditar(true); editarCredito(credito, credito.tipoCredito, index); changeScreen(1) }}></i>
                          </p>
                      
                        </div> 
                        

                      </div>

                      


                    </div>
                  )
                }
              </div>
              )
            }

          </div>




          
        </section>


         
      </div>


      

      
      
    </Fragment>
  )
}

export default ConsultarCreditos





