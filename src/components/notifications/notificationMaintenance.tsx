import { IonContent, IonPage, IonBadge, IonBreadcrumbs, IonBreadcrumb, IonIcon } from "@ionic/react";
import '../home/home.css'; 
import img from './imgs/Warning-rafiki.svg'
import materials from './imgs/Computer troubleshooting-rafiki.svg'
import { UseNavigation } from "../../utils/utils";
import  './badge.css'
import { arrowForwardCircle } from "ionicons/icons";
import { fetchMisANveau } from '../../utils/API';
import { useState, useEffect } from 'react';

const NotificationMaintenance : React.FC =() =>{
    const { handleClick } = UseNavigation();
    const [anomalies, setAnomalies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMisANveau();
                setAnomalies(data);
            } catch (error) {
                console.error('Error fetching anomalies:', error);
            }
        };

        fetchData();
    }, []);

    return(
        <IonPage>
            <IonContent fullscreen>
                <div className="home-container">
                    <img src={img} alt="" className="image" />
                    <div className="bienvenue">
                        <p className='nunito-bold'>
                            Les maintenances à faire
                        </p>
                    </div>
                    
                    <div className="iconslist">
                        {anomalies.map((anomalie, index) => (
                            <div key={index} className="card ov" onClick={()=>handleClick("/")}>
                                <img src={materials} alt="" className='icon-card lst' />
                                <p className='nunito-light-kely'>
                                    L'élément <span className="nunito-light"> {anomalie.naturefille} </span> du "{anomalie.bienacquisid}" <br/> avec état {anomalie.etat}/10
                                    <progress value={anomalie.etat} max="10"></progress>

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

export default NotificationMaintenance;
