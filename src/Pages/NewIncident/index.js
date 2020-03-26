import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const history = useHistory();
  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  async function HandleSubmit(e) {
    e.preventDefault();

    const data = {
      title, 
      ongId,
      description,
      value
    }


    console.log(data);

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });

      alert('Successfuly incident created');
      history.push('/profile');
    } catch {
      alert('Error while creating a new incident')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="be the hero"/>

          <h2>Cadastro</h2>
          <p>Describe the case in detail, to find a hero to solve this</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02051"/>
            Back to home
          </Link>
        </section>

        <form onSubmit={HandleSubmit}>
          <input 
            placeholder="Case title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea  
            placeholder="Describe the case"
            value={description}
            onChange={e => setDescription(e.target.value)}  
          />
          <input 
            placeholder="Value"
            value={value}
            onChange={e => setValue(e.target.value)}  
          />

          <button className="button" type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}