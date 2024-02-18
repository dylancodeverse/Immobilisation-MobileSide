import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonBadge } from "@ionic/react";
import '../home/home.css'; 
import img from './imgs/Warning-rafiki.svg'
import times  from './imgs/time flies-amico.svg'
import materials from './imgs/Computer troubleshooting-rafiki.svg'
import { UseNavigation } from "../../utils/utils";
import './badge.css'

// Importez vos fonctions fetchNonRendu et fetchMisANveau depuis le fichier utils/API
import { fetchNonRendu, fetchMisANveau } from '../../utils/API';

const NotificationChoice : React.FC =() =>{
    const { handleClick } = UseNavigation();
    const [notificationsUsers, setNotificationsUsers] = useState<number>(0);
    const [notificationsMaintenance, setNotificationsMaintenance] = useState<number>(0);

    useEffect(() => {
        // Chargez les données de notification au moment du montage du composant
        const fetchData = async () => {
            try {
                const nonRenduData = await fetchNonRendu();
                const misANiveauData = await fetchMisANveau();
                setNotificationsUsers(nonRenduData.length);
                setNotificationsMaintenance(misANiveauData.length);
            } catch (error) {
                console.error('Error fetching notification data:', error);
            }
        };
        fetchData();
    }, []);

    return(
        <IonPage>
            <IonContent fullscreen>
                <div className="home-container">
                    <div className="background-shape"></div>
                    <img src={img} alt="" className="image" />

                    <div className="bienvenue">
                        <p className='nunito-bold'>
                            Vos notifications du jour
                        </p>
                    </div>
                    
                    <div className="iconslist">
                        <div className="card ov" onClick={()=>handleClick("/nonRendu")}>
                            <img src={times} alt="" className='icon-card lst' />
                            <p className='nunito-light-kely'>Les utilisateurs qui n'ont pas rendu des materiels</p>
                            <IonBadge color="danger" class="badge">{notificationsUsers}</IonBadge>
                        </div>
                        <div className="card ov" onClick={()=>handleClick("/maintenance")}>
                            <img src={materials} alt="" className='icon-card lst'  />
                            <p className='nunito-light-kely'>Maintenance necessaire pour ces materiaux ...</p>
                            <IonBadge class="badge" color="danger" >{notificationsMaintenance}</IonBadge>
                        </div>
                    </div>
                    <div className='footer'>nothing</div>
                </div>
            </IonContent>
        </IonPage>    
    );
}

export default NotificationChoice;
