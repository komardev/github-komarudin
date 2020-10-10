import React from 'react'
import './Header.scss'

const Header = () => {
    return (
        <div className="head">
            <img className="head__image" src={require('../../assets/svg/github-logo.svg')} alt="github-logo" />
            <h3>Github Finder</h3>
        </div>
    )
}

export default Header
