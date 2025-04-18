import React, { useEffect } from 'react'
import './Home.css'
import CardList from '../CardList/CardList'
import Filter from '../Filter/Filter'
import Navbar from '../Navbar/Navbar/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
 

  return (
    <>
   
      <Navbar  />
        <div className='home-main'>
          <div className='home-left-panel'>
            <Filter />
          </div>

          <div className='home-right-panel'>
            <CardList />
          </div>
        </div>
      
    </>
  )
}

export default Home
