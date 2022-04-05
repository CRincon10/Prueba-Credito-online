const creditoReducer = (state, action) => {

  switch (action.type) {
    case 'AGREGAR_CREDITO':
    case 'CARGAR_CREDITOS':
    case 'BORRAR_CREDITO':
    case 'EDITAR_CREDITO':
      return {
        ...state,
        creditosPorTipo: action.payload
      }
    
    case 'CONSULTAR_CREDITO':
      return {
        ...state,
        creditoParaConsulta: action.payload,
      }
    
    
    case 'LIMPIAR_FORMULARIO':
      return {
        ...state,
        creditoParaConsulta: action.payload,
        informacionCredito: '',
        estoyEditandoCredito: false,
        cualCreditoEstoyEditando: []
      }  

    case 'MOSTRAR_INFORMACION':
      return {
        ...state,
        informacionCredito: action.payload
      }
    
    case 'CAMBIAR_ESTADO_EDITAR':
      return {
        ...state,
        estoyEditandoCredito: action.payload
      }
    
    case 'RECORDAR_CREDITO_A_EDITAR':
      return {
        ...state,
        cualCreditoEstoyEditando: action.payload
      }
      
      
    default:
      return state
  }
}

export default creditoReducer
