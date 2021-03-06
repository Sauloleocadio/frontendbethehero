import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  async function HandleRegister(e) {
    e.preventDefault();

    const data ={
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post('/ongs', data);
      alert(`Seu id de acesso ${response.data.id}`);
      history.push('/');
    } catch {
      alert('Error while creating your account try again later')
    }
      
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="be the hero"/>

          <h2>Register</h2>
          <p>Enter the platform and help people find the cases of your NGO.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02051"/>
            Already have an Account
          </Link>
        </section>

        <form onSubmit={HandleRegister}>
          <input 
            placeholder="ONG Name"
            value={name}
            onChange={e => setName(e.target.value)}
            />
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}  
          />

          <div className="input-group">
            <input 
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}