//import moment from 'moment'
import Swal from 'sweetalert2'
import React, { Fragment, useContext, useState, useEffect } from 'react'
import { CreditoContext } from '../../context/creditoContext'

import'./creditos.css'

const CreditosUsuario = ({ changeScreen }) => {
  
  const {
    creditoParaConsulta,
    consultarCredito,
    agregarNuevoCredito,
    informacionCredito,
    mostrarInformacionCredito,
    limpiarFormulario,
    estoyEditandoCredito,
    modificarCreditoEditado
    
  } = useContext(CreditoContext)
  
  
  useEffect(() => {
    return () => {limpiarFormulario()}
    // eslint-disable-next-line
  }, [])

  const [nombre, setNombre] = useState(informacionCredito === '' ? '' : informacionCredito.nombre)
  const [documento, setDocumento] = useState(informacionCredito === '' ? '' : informacionCredito.documento)
  const [Ndocumento, setNdocumento] = useState(informacionCredito === '' ? '' : informacionCredito.Ndocumento)
  const [valor, setValor] = useState(informacionCredito === '' ? '' : informacionCredito.valor)
  const [tasa, setTasa] = useState(informacionCredito === '' ? '' : informacionCredito.tasa)
  const [plazo, setPlazo] = useState(informacionCredito === '' ? '' : informacionCredito.plazo)


  return (
    <Fragment>
      
      
      <div className='main_content'>
        
        <div className='contenido'>
          <div className='formulario_credito'>
           
            <h3 className='h3_formulario'>Solicitud de Crédito</h3>
            
            <div className='formulario_credito_usuario'>

              <div>
                <input 
                  type="text" 
                  name="nombre"  
                  placeholder="Nombre"
                  autoComplete='off'
                  value={nombre}
                  onChange={ (event) => setNombre(event.target.value) }
                  autoFocus
                  required
                />

              </div>
            
              <div>
                <select 
                  type="text" 
                  name="documento" 
                  placeholder="Tipo de documento"
                  value={documento}
                  onChange={ (event) => setDocumento(event.target.value) }
                  required
                >
                  <option disabled='on' value="">--Tipo de documento--</option>
                  <option value="1">Cedula</option>
                  <option value="2">Pasaporte</option>
                  <option value="3">Cedula de extranjeria</option>
                </select>

              </div>

              <div>
                <input 
                  type="number" 
                  name="Ndocumento"  
                  placeholder="Número de documento"
                  value={Ndocumento}
                  onChange={ (event) => setNdocumento(event.target.value) }                       
                  required        
                  
                />

              </div>
            
              <div>
              <input 
                  type ="number" 
                  name="valor"  
                  placeholder="Valor Credito"
                  value={valor}
                  onChange={ (event) => setValor(event.target.value) }               
                  required
              />

              </div>

              <div>
                <input 
                type ="number" 
                name="tasa"  
                placeholder="Tasa de interes"
                value={tasa}
                onChange={ (event) => setTasa(event.target.value) }             
                required
              />

              </div>

              <div>
                <input 
                  type ="number" 
                  name="plazo"  
                  placeholder="Plazo"
                  value={plazo}
                  onChange={ (event) => setPlazo(event.target.value) }             
                  required
                />

              </div>

              <div>
                <button   
                
                onClick={() => {
                  if(nombre === '' || Ndocumento === '' || valor === '' || tasa === '' || plazo === ''){
                    Swal.fire('Error','Por favor llene todos los campos','error')  
                  }else{
                    mostrarInformacionCredito({nombre, documento, Ndocumento, valor, tasa, plazo}) 
                    consultarCredito({nombre, documento, Ndocumento, valor, tasa, plazo})
                  }

                  
                }}
                >Enviar Datos
                </button>

              </div>

            </div>
          
          </div>

        

        <div className='credito_table'>
        {informacionCredito !== '' && <h3 className='h3_credito'>Información del crédito</h3>}
        {
          informacionCredito !== '' && 
          
          <table>
            <thead>
              <tr>
              <th>Nombre</th>
                <th>Tipo de documento</th>
                <th>Número de documento</th>
                <th>Valor</th>
                <th>Tasa de interes</th>
                <th>Plazo</th>
              </tr>
            </thead>
            <tbody>
              
              <tr key={informacionCredito.Ndocumento}>
                <th scope="row">{informacionCredito.nombre}</th>
                  <td>{
                      informacionCredito.documento === '1' ? 'Cedula' : 
                      informacionCredito.documento === '2' ? 'Pasaporte' :
                      informacionCredito.documento === '3' ? 'Cedula de extranjeria' :
                      'Cedula'
                    }</td>
                  <td>{informacionCredito.Ndocumento}</td>
                  <td>{parseInt(informacionCredito.valor).toLocaleString("es-CO")}</td>
                  <td>{informacionCredito.tasa + '%'}</td>
                  <td>{informacionCredito.plazo}</td>
              </tr>
             
            </tbody>
             
          </table>
        
        }        

        {creditoParaConsulta.length>0 && <h3 className='h3_credito'>Simulación de crédito</h3>}
        {
          creditoParaConsulta.length>0 && 
          
          <table>
            <thead>
              <tr>
              <th>Periodo</th>  
                <th>Intereses</th>
                <th>Amortizacion de capital</th>
                <th>Cuota</th>
                <th>Capital Pendiente</th>
              </tr>
            </thead>
            <tbody>
              {
                creditoParaConsulta.map(credito => (
                  
                  <tr key={credito.periodo}>
                  <th scope="row">{ parseInt(credito.periodo).toLocaleString("es-CO") }</th>
                  <td>{credito.interes === '' ? '' : parseInt(credito.interes).toLocaleString("es-CO")}</td>
                  <td>{credito.interes === '' ? '' : parseInt(credito.amortizacion).toLocaleString("es-CO")}</td>
                  <td>{credito.interes === '' ? '' : parseInt(credito.cuota).toLocaleString("es-CO")}</td>
                  <td>{parseInt(credito.capitalPendiente).toLocaleString("es-CO")}</td>

                  

                </tr>))
              }  
             
            </tbody>
              
          </table>
        
        }        

        {
          creditoParaConsulta.length>0 && 
          <button 
            className='btn'
            disabled={creditoParaConsulta.length === 0}
            onClick={() => { 
              estoyEditandoCredito 
                ? modificarCreditoEditado({nombre, documento, Ndocumento, valor, tasa, plazo,tipoCredito:Ndocumento}) 
                : agregarNuevoCredito({nombre, documento, Ndocumento, valor, tasa, plazo,tipoCredito:Ndocumento});
              changeScreen(0);
            }}
            >
              { estoyEditandoCredito ? 'Editar crédito' : 'Guardar crédito'}

            
          </button>

        }    
        </div>

        </div>  
      </div>

    </Fragment>
  )
}

export default CreditosUsuario





