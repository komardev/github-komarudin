import React, { useEffect, useState } from 'react'

// Component
import { Header } from '../components'

// Style
import './App.scss'

// Packages
import axios from '../config/axios'
import moment from 'moment'

const App = () => {
  const clientId = process.env.CLIENT_ID
  const [userAcc, setUserAcc] = useState('')
  const [repos, setRepos] = useState('')
  const [search, setSearch] = useState('komarudinn')
  const [totalCard, setTotalCard] = useState(4)
  const [load, setLoad] = useState(false)


  useEffect(() => {
    searchAcc()
  }, [])

  const searchAcc = async () => {
    try {
      setLoad(true)
      let getUser = await axios.get(`/${search}?client_id=${clientId}`)
      let getRepos = await axios.get(`/${getUser.data.login}/repos`)
      setUserAcc(getUser.data)
      setRepos(getRepos.data)
      setLoad(false)
    } catch (error) {
      setLoad(false)
      if (error.response.status === 404) {
        alert(`Sorry user with username ${search} not found!`)
      }
      console.log(error);
    }
  }


  const rendRepos = (data) => {
    if (data) {
      return data.slice(0, totalCard).map((item, index) => {
        return (
          <div onClick={() => window.open(item.clone_url)} key={index} className="card  ">
            <h4>{item.name}</h4>
            <div className="card__content">
              <small className="lang">{item.language ? item.language : 'Unknown'}</small>
              <small>{moment(item.created_at).format('LL')}</small>
            </div>
          </div>
        )
      })
    }
  }

  const changeCard = () => {
    if (totalCard >= repos.length) {
      setTotalCard(4)
    } else {
      setTotalCard(totalCard + 4)
    }
  }

  return (
    <div>
      <Header />
      {/* Searchbar */}
      {load && (
        <div className="loadbar">
          <img width="130" src={require('../assets/gif/load.gif')} alt="" />
        </div>
      )}
      {!load && (
        <>
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

          {/* Main Repository */}
          <div className="repos">
            <h2>Repositories</h2>
            <div className="">
              {rendRepos(repos)}
            </div>
            <div className="repos__button">
              <button onClick={() => changeCard()}>
                {totalCard >= repos.length ? 'Less More' : 'See More'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )

}

export default App
