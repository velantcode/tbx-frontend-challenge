import React from 'react'
import Header from './Components/Header'
import TableComponent from './Components/TableComponent'

export default function App () {
  return (
    <div className='App'>
      <Header />

      <div className='container'>
        <TableComponent />
      </div>
    </div>
  )
}
