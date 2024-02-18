import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton } from '@ionic/react';
import '../constants/font.css';
import '../constants/form.css';
import './override.css';
import { useHistory } from 'react-router';
import theme from './imgs/manipulation-bro.svg';
import {  fetchNatures } from '../../utils/API';

const BlackListHier: React.FC = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        natureid: '',
        hierarchie: 10
    });
    const [natureIDs, setNatureIDs] = useState<string[]>([]);

    useEffect(() => {
        const fetchNatureIDsData = async () => {
            try {
                const natureIDsData = await fetchNatures();
                setNatureIDs(natureIDsData);
            } catch (error) {
                console.error('Error fetching nature IDs:', error);
            }
        };

        fetchNatureIDsData();
    }, []);

    const handleNatureidChange = (natureid: string) => {
        setFormData({ natureid, hierarchie: 4 });
    };

    const handleHierarchieChange = (hierarchie: number) => {
        setFormData({ ...formData, hierarchie });
    };

    const handleSubmit = () => {
        // Envoyer les données du formulaire
        console.log(formData);
        // Rediriger vers une autre page si nécessaire
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='assignation-container'>
                    <img src={theme} alt="" />
                </div>
                <div className="bienvenue">
                    <p className='nunito-bold'>Gestion hierarchique</p>
                </div>
                
                <div className='bienvenue deux'>
                    <p className='nunito-light-kely'>L'assignation des biens depend d'une certaine hierarchie .<br></br>On doit choisir soit utilisateur soit groupe mais pas les deux en même temps</p>
                </div>
                <div className="form-container">
                    <IonItem>
                        <IonLabel position="stacked">Nature ID</IonLabel>
                        <IonSelect value={formData.natureid} onIonChange={(e) => handleNatureidChange(e.detail.value)}>
                            {natureIDs.map((natureID: string, index: number) => (
                                <IonSelectOption key={index} value={natureID}>{natureID}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Hiérarchie</IonLabel>
                        <IonInput type="number" value={formData.hierarchie} onIonChange={(e) => handleHierarchieChange(Number(e.detail.value))}></IonInput>
                    </IonItem>
                    <div className="btn">
                        <button className='button' onClick={handleSubmit}>Valider</button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default BlackListHier;
