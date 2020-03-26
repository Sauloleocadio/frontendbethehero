import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import '../../global.css';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
  const history = useHistory();

  const [incidents, setIncidents] = useState([]);


  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function HandleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch {
      alert('Error while deleting case, try again')
    }
  }


  function HandleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>

        <img src={logoImg} alt="be the hero"/>
        <span>Welcome back, {ongName}</span>


        <Link className="button" to="/incidents/new">Register new incident</Link>
        <button onClick={HandleLogout} type="button"><FiPower size={18} color="#E02041" /></button>
      </header>

      <h1>Incidents registered</h1>

      <ul> 
        {incidents.map(incident => (
        <li key={incident.id}>
          <strong>INCIDENT:</strong>
          <p>{incident.title}</p>
        
          <strong>DESCRIPTION:</strong>
          <p>{incident.description}</p>
                
          <strong>VALUE:</strong>
          <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)}</p>
        
          <button onClick={ () => HandleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
        ))}
      </ul>
    </div>
  )
}