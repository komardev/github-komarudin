import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import './App.scss'
import { Header } from '../components'


const App = () => {
  const clientId = process.env.CLIENT_ID
  const [userAcc, setUserAcc] = useState('')
  const [search, setSearch] = useState('komarudinn')

  useEffect(() => {
    searchAcc()
  }, [clientId])

  const searchAcc = () => {
    console.log(search);
    axios.get(`/${search}?client_id=${clientId}`).then(res => {
      console.log(res.data);
      setUserAcc(res.data)
    }).catch(err => {
      console.log(err);
    })
  }


  return (
    <div>
      <Header />
      {/* Searchbar */}
      <div className="search">
        <div className="search__input">
          <input onChange={(e) => { setSearch(e.target.value) }} value={search} type="text" placeholder="Enter a Github username..." />
          <i onClick={() => searchAcc()} className="fa fa-search"></i>
        </div>
      </div>

      {/* Main Content */}
      <div onClick={() => window.open(userAcc.html_url)} className="main">
        <img className="main__image" src={userAcc.avatar_url} alt="" />
        <div className="info">
          <h3 className="info__name">{userAcc.name}</h3>
          <h3 className="info__username">@{userAcc.login}</h3>
          {userAcc.location && (<h5 className="info__location"><i className="fa fa-map-marker" aria-hidden="true"></i> {userAcc.location}</h5>)}
          <small className="info__icon"><i className="fa fa-folder-o" aria-hidden="true"></i> {userAcc.public_repos} Repos</small>
          <small className="info__icon"><i className="fa fa-user-o" aria-hidden="true"></i> {userAcc.followers} Followers</small>
        </div>
      </div>
    </div>
  )
}

export default App
