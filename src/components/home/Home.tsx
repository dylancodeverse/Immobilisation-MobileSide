import React from 'react';
import './home.css'; // Importez votre fichier CSS pour les styles
import img from './Company-pana.svg';
import news from './Heavy box-pana.svg'
import users from './users.svg'
import maintenance from './Maintenance-rafiki.svg'
import list from './Task-pana.svg'
import './cards.css'


const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="background-shape"></div>
            <img src={img} alt="" className="image" />

            <div className="bienvenue">
                <p className='nunito-bold'>
                    Les services
                </p>
            </div>
            
            <div className="iconslist">
                <div className="card">
                    <img src={news} alt="" className='icon-card' />
                    <p className='nunito-light-kely'> Acquisition</p>
                </div>
                <div className="card">
                    <img src={users} alt="" className='icon-card' />
                    <p className='nunito-light-kely'> Assignation</p>
                </div>
                <div className="card">
                    <img src={maintenance} alt="" className='icon-card' />
                    <p className='nunito-light-kely'>Composants</p>
                </div>
                <div className="card">
                    <img src={list} alt="" />
                    <p className='nunito-light-kely'> Liste noire</p>
                </div>
                
            </div>
            <div className='footer'>nothing</div>

        </div>

    );
};

export default Home;

