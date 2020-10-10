import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import './App.scss'
import { Header } from '../components'


const App = () => {
  const clientId = process.env.CLIENT_ID
  const [userAcc, setUserAcc] = useState('')

  useEffect(() => {
    axios.get(`/komarudinn?client_id=${clientId}`).then(res => {
      console.log(res.data);
      setUserAcc(res.data)
    }).catch(err => {
      console.log(err);
    })
  }, [clientId])


  return (
    <div>
      <Header />
      {/* Searchbar */}
      <div className="search">
        <div className="search__input">
          <input type="text" placeholder="Enter a Github username..." />
          <i className="fa fa-search"></i>
        </div>
      </div>

      {/* Main Content */}
      <div onClick={() => window.open(userAcc.html_url)} className="main">
        <img className="main__image" src={userAcc.avatar_url} alt="" />
        <div>
          <h3 className="main__name">{userAcc.name}</h3>
          <h3 className="main__username">@{userAcc.login}</h3>
        </div>
      </div>
    </div>
  )
}

export default App
