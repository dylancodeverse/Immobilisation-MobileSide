import React, { useEffect } from 'react';
import './home.css'; // Importez votre fichier CSS pour les styles
import img from './imgs/Company-pana.svg';
import news from './imgs/Heavy box-pana.svg'
import users from './imgs/users.svg'
import maintenance from './imgs/Maintenance-rafiki.svg'
import list from './imgs/Task-pana.svg'
import './cards.css'
import { hideTabBar, showTabBar } from '../../utils/utils';
import { useHistory } from 'react-router';



const Home: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        showTabBar();
        return () => {
        };
      }, []); 
     
    const handleClick = ( param: any) => {
        history.push(param);
    };
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
                <div className="card" onClick={()=>handleClick("/acquisition")}>
                    <img src={news} alt="" className='icon-card' />
                    <p className='nunito-light-kely'> Acquisition</p>
                </div>
                <div className="card" onClick={()=>handleClick("/assignation")}>
                    <img src={users} alt="" className='icon-card'  />
                    <p className='nunito-light-kely'> Assignation</p>
                </div>
                <div className="card" onClick={()=>handleClick("/composants")}>
                    <img src={maintenance} alt="" className='icon-card' />
                    <p className='nunito-light-kely'>Composants</p>
                </div>
                <div className="card" onClick={()=>handleClick("/blacklist")}>
                    <img src={list} alt="" />
                    <p className='nunito-light-kely'> Liste noire</p>
                </div>
                
            </div>
            <div className='footer'>nothing</div>

        </div>

    );
};

export default Home;

