import React, { useEffect } from 'react';
import '../home/home.css'; 
import img from '../home/imgs/Task-pana.svg';
import man from  './imgs/manipulation-bro.svg'
import './cardsoverride.css'
import '../home/cards.css'
import { IonContent, IonPage } from '@ionic/react';
import { handleClick } from '../../utils/utils';
const BlackList: React.FC = () =>{
    return (
        <IonPage>
            <IonContent fullscreen> 
                <div className="home-container">
                    <div className="background-shape"></div>
                    <img src={img} alt="" className="image" />

                    <div className="bienvenue">
                        <p className='nunito-bold'>
                            Gerer les assignations & liste noire
                        </p>
                    </div>
                    
                    <div className="iconslist">
                        <div className="card ov" onClick={()=>handleClick("/strict")}>
                            <img src={man} alt="" className='icon-card lst' />
                            <p className='nunito-light-kely'> Mode strict</p>
                        </div>
                        <div className="card ov" onClick={()=>handleClick("/specifique")}>
                            <img src={img} alt="" className='icon-card lst'  />
                            <p className='nunito-light-kely'> Mode specifique</p>
                        </div>
                        <div className="card ov" onClick={()=>handleClick("/hierarchique")}>
                            <img src={man} alt="" className='icon-card lst' />
                            <p className='nunito-light-kely'>Mode hierarchique</p>
                        </div>
                        
                    </div>
                    <div className='footer'>nothing</div>

                </div>
            </IonContent>
        </IonPage>        
    )
}

export default BlackList ;