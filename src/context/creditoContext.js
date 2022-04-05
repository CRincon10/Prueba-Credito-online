import React, { createContext, useReducer } from 'react'
import creditoReducer from './creditoReducer'

// Initial state
const initialState = {
  

  creditos: [],
  informacionCredito: '',
  creditoParaConsulta: [],
  creditosPorTipo: [[],[],[],[],[],[],[],[],[],[]],
  estoyEditandoCredito: false,
  cualCreditoEstoyEditando: [],
  // AQUÍ VAN TODAS LAS VARIABLES, ARRAYS, OBJETOS, ETC DEL GLOBAL STATE DE LA APLICACIÓN
}

// Create Context
export const CreditoContext = createContext(initialState)

// Provider component
export const CreditoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(creditoReducer, initialState)

  // *** ACTIONS ***

  // Cambiar el texto de "variable1"
  // function agregarUsuario(new_user) {
  //   let arregloUsuarios = state.listaDeUsuarios
  //   let usuario = new_user.length - 1
  //   usuario = new_user.charAt(usuario)
  //   usuario = {ultimaLetra: usuario}
  //   arregloUsuarios.push(usuario)
  //   salvarDatos(JSON.stringify(arregloUsuarios))
  //   dispatch({
  //     type: 'AGREGAR_USUARIO',
  //     payload: arregloUsuarios
  //   })
  // }

  // function salvarDatos(datos) {
  //   // salvar al LocalStorage(datos)
  // }


  // function guardarCreditos() {
  //   localStorage.setItem('creditos', JSON.stringify(state.creditos))
  // }

  // function cargarCreditos() {
  //   let creditos = JSON.parse(localStorage.getItem('creditos'))
  //   dispatch({
  //     type: 'CARGAR_CREDITOS',
  //     payload: creditos
  //   })
  // }

  function modificarCreditoEditado(credito) {
    let tipoCredito = state.cualCreditoEstoyEditando[0]
    let numeroDeCredito = state.cualCreditoEstoyEditando[1]
    let nuevoCredito = credito
    nuevoCredito.tipoCredito = tipoCredito
    let arreglo = state.creditosPorTipo
    arreglo[tipoCredito][numeroDeCredito] = nuevoCredito
    localStorage.setItem('creditos', JSON.stringify(arreglo))
    dispatch({
      type: 'EDITAR_CREDITO',
      payload: arreglo
    })
  }
 

  function agregarNuevoCredito(credito){
    let ultimoDigito = credito.Ndocumento.toString().charAt(credito.Ndocumento.toString().length - 1)
    ultimoDigito = parseInt(ultimoDigito)
    let arreglo = state.creditosPorTipo
    let nuevoCredito = credito
    nuevoCredito.tipoCredito = ultimoDigito
    arreglo[ultimoDigito].push(nuevoCredito)
    localStorage.setItem('creditos', JSON.stringify(arreglo))
    dispatch({
      type: 'AGREGAR_CREDITO',
      payload: arreglo
    })
  }

  function cargarCreditos() {
    let arreglo = JSON.parse(localStorage.getItem('creditos'))
    if (arreglo !== null) {
      dispatch({
        type: 'CARGAR_CREDITOS',
        payload: arreglo
      })
    }
  }

  function mostrarInformacionCredito(credito){
    
    dispatch({
      type: 'MOSTRAR_INFORMACION',
      payload: credito
      
    })
  }



  function consultarCredito( credito ){
    
    let simuladorCredito = [], plazo = parseInt(credito.plazo), interes = ''
    let periodo = 0, amortizacion = '', cuota = '', capitalPendiente = parseInt(credito.valor)
    
    simuladorCredito.push({periodo: periodo, interes: interes, amortizacion: amortizacion, cuota: cuota, capitalPendiente: credito.valor})

    for( let i = 0; i < plazo ; i++ ){
      periodo++
      interes = parseInt(capitalPendiente * (credito.tasa / 100))
      amortizacion = parseInt(credito.valor / plazo)
      cuota = (amortizacion + interes)
      capitalPendiente = (capitalPendiente - amortizacion)
      simuladorCredito.push({
        periodo: periodo, 
        interes: interes, 
        amortizacion: amortizacion, 
        cuota: cuota, 
        capitalPendiente: capitalPendiente
      })
      
    }

    dispatch({
      type: 'CONSULTAR_CREDITO',
      payload: simuladorCredito
      
    })
  }


  function limpiarFormulario(){
    dispatch({
      type: 'LIMPIAR_FORMULARIO',
      payload: []
    })
  }

  function borrarCredito(tipoCredito, numeroDeCredito){
    let arreglo = state.creditosPorTipo
    arreglo[tipoCredito].splice(numeroDeCredito, 1)
    localStorage.setItem('creditos', JSON.stringify(arreglo))
    dispatch({
      type: 'BORRAR_CREDITO',
      payload: arreglo
      
    })
  }

  function cambiarEstadoEditar(value){
    dispatch({
      type: 'CAMBIAR_ESTADO_EDITAR',
      payload: value
      
    })
  }

  function editarCredito(credito, tipoCredito, numeroDeCredito){
    consultarCredito(credito)
    mostrarInformacionCredito(credito)
    dispatch({
      type: 'RECORDAR_CREDITO_A_EDITAR',
      payload: [tipoCredito, numeroDeCredito]      
    })
  }


  // *** PROVIDER ***

  return (
    <CreditoContext.Provider 
      value={{
        creditos: state.creditos,
        creditoParaConsulta: state.creditoParaConsulta,
        informacionCredito: state.informacionCredito,
        creditosPorTipo: state.creditosPorTipo,
        estoyEditandoCredito: state.estoyEditandoCredito,
        cualCreditoEstoyEditando: state.cualCreditoEstoyEditando,
        
        agregarNuevoCredito,
        consultarCredito,
        mostrarInformacionCredito,
        cargarCreditos,
        limpiarFormulario,
        borrarCredito,
        editarCredito,
        cambiarEstadoEditar,
        modificarCreditoEditado

      }}
    >
      { children }
    </CreditoContext.Provider>
  )
}
