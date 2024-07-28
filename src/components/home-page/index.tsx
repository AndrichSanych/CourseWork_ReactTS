
import React from 'react'
import Search from '../search'
import { SearchProps } from '../../models/Props'

const HomePage: React.FC = () => {
 const onSearch = (search:SearchProps)=>{
    console.log(search)
 }
  
  return (
    <>
      <Search onSearch={onSearch}/>
      <div className='white-container my-5'>
         <h2 className='mx-auto'>Розділи на сервісі OLX</h2>
      </div>
    </>
  )
}

export default HomePage