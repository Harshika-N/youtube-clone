
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Home = ({sidebar}) => {

  const [category,setCategory] = useState('0');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return (
    <>
    <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
    <div className={`container ${sidebar?"":'large-container'}`}>
      <Feed category={category} searchQuery={searchQuery}/>
    </div>
    </>
  )
}

export default Home
