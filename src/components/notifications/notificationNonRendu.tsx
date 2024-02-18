import React, { useState, useEffect } from 'react';
import { IonContent, IonPage } from "@ionic/react";
import '../home/home.css'; 
import img from './imgs/Warning-rafiki.svg'
import times  from './imgs/time flies-amico.svg'
import { UseNavigation } from "../../utils/utils";
import  './badge.css'
import axios from 'axios';
import { fetchNonRendu } from '../../utils/API';

const NotificationNonRendu : React.FC =() =>{
    const { handleClick } = UseNavigation();
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetchNonRendu();
                setNotifications(response);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    return(
        <IonPage>
            <IonContent fullscreen>
                <div className="home-container">
                    <img src={img} alt="" className="image" />
                    <div className="bienvenue">
                        <p className='nunito-bold'>
                            Les matériels à rendre
                        </p>
                    </div>
                    
                    <div className="iconslist">
                        {notifications.map((notification, index) => (
                            <div key={index} className="card ov" onClick={()=>handleClick("/")}>
                                <img src={times} alt="" className='icon-card lst' />
                                <p className='nunito-light-kely'>
                                    {notification.datefin} pour {notification.utilisateur ? notification.utilisateur : notification.grputilisateur} a expiré pour "{notification.bienacquis}"
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className='footer'>nothing</div>
                </div>
            </IonContent>
        </IonPage>    
    );
}

export default NotificationNonRendu