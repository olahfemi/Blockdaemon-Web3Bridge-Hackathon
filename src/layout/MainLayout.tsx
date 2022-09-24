import React, { Fragment } from 'react'
import Header from '../components/Header'

const MainLayout = ({children}: any) => {
  return (
    <div className='bg-dark' style={{minHeight: "100%"}}>
      <div className='mx-8 md:mx-18 lg:mx-24'>
        <Header />
        {children}
      </div>
    </div>
  )
}

export default MainLayout