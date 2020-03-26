import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const history = useHistory();
  const [id, setId] = useState('');


  async function HandleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', { id });
      
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero"/>

        <form onSubmit={HandleLogin}>
          <h2>Make your logon</h2>

          <input 
            placeholder="your ID"
            value={id}
            onChange={e => setId(e.target.value)}  
          />
          <button className="button" type="submit">Submit</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02051"/>
            Don't have a registration
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  )
}