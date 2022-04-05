// Node modules
import React, { useState } from 'react'

// Provider from context
import { CreditoProvider } from './context/creditoContext'

// Layout components
import Navbar from './components/ui/Navbar'
import HomeScreen from './components/principal/HomeScreen'

// Main components
import CreditosUsuario from './components/creditos/CreditosUsuario'
import ConsultarCreditos from './components/creditos/ConsultarCreditos'


// Styles
import './styles.css'

const CrediFinancieraApp = () => {

  // page = 0     --> HomeScreen
  // page = 1     --> CreditosUsuario
  // page = 2     --> SolicitarCredito

  const [page, setPage] = useState(0)
  const changeScreen = (val) => { setPage(val) }
  console.log('Active screen: ' + page)
  
  return (
    <CreditoProvider>

      <div>
        <Navbar changeScreen = {changeScreen} activePage = {page} />
      </div> 

      <div>
        {page === 0 && <HomeScreen changeScreen = {changeScreen} />}
        {page === 1 && <CreditosUsuario changeScreen = {changeScreen} />}
        {page === 2 && <ConsultarCreditos changeScreen = {changeScreen} />}
      </div>

    </CreditoProvider>
  )
}

export default CrediFinancieraApp
