import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonAlert } from '@ionic/react';
import '../constants/font.css';
import '../constants/form.css';
import './override.css';
import { useHistory } from 'react-router';
import theme from './imgs/manipulation-bro.svg';
import { fetchNatures } from '../../utils/API';

const BlackListHier: React.FC = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        natureid: '',
        hierarchie: 10
    });
    const [natureIDs, setNatureIDs] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

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

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/hierarchique', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la soumission des données');
            }

            const data = await response.text(); // Récupère la réponse textuelle
            if (data === 'OK') {
                setAlertMessage('Données soumises avec succès!');
                setShowAlert(true);
            } else {
                throw new Error(data); // Lance une erreur avec le message de la réponse
            }
        } catch (error) {
            setAlertMessage(error.message || 'Erreur lors de la soumission des données');
            setShowAlert(true);
            console.error('Erreur:', error.message);
        }
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
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Alert'}
                    message={alertMessage}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};

export default BlackListHier;
