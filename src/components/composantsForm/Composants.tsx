import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption, IonAlert } from '@ionic/react';
import theme from './imgs/Maintenance-rafiki.svg';
import '../constants/font.css';
import '../constants/form.css';
import { useHistory } from 'react-router';
import { fetchBienAcquis, fetchNatures } from '../../utils/API';

const Composants: React.FC = () => {
    const history = useHistory();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        bienacquisid: '',
        naturefille: '',
        datechangement: '',
        etat: ''
    });
    const [natureFilles, setNatureFilles] = useState<any[]>([]);
    const [bienAcquis, setBienAcquis] = useState<any[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchNatureData = async () => {
            try {
                const natureData = await fetchNatures();
                setNatureFilles(natureData);
            } catch (error) {
                console.error('Error fetching natures:', error);
            }
        };
        const fetchBienAcquisData = async () => {
            try {
                const bienAcquisData = await fetchBienAcquis();
                const materielNames = bienAcquisData.map((bien: any) => bien.bienacquisid);
                setBienAcquis(materielNames);
            } catch (error) {
                console.error('Error fetching bien acquis:', error);
            }
        };

        fetchNatureData();
        fetchBienAcquisData();
    }, []);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/historisationconfiguration', {
                method: 'PUT',
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
                setStep(1);
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
                    <p className='nunito-bold'>Maintenance</p>
                </div>
                {step === 1 && (
                    <div className="form-container">
                        <IonItem>
                            <IonLabel position="stacked">Bien Acquis ID</IonLabel>
                            <IonSelect value={formData.bienacquisid} onIonChange={(e) => setFormData({ ...formData, bienacquisid: e.detail.value })}>
                                {bienAcquis.map((materiel, index) => (
                                    <IonSelectOption key={index} value={materiel}>{materiel}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Nature Fille</IonLabel>
                            <IonSelect value={formData.naturefille} onIonChange={(e) => setFormData({ ...formData, naturefille: e.detail.value })}>
                                {natureFilles.map((nature: any, index: number) => (
                                    <IonSelectOption key={index} value={nature}>{nature}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        <div className="btn">
                            <button className='button' onClick={handleNextStep}> Suivant</button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="form-container">
                        <IonItem>
                            <IonLabel position="stacked">Date de Changement</IonLabel>
                            <IonDatetime
                                value={formData.datechangement}
                                onIonChange={(e) => {
                                    if (typeof e.detail.value === 'string') {
                                        setFormData({ ...formData, datechangement: e.detail.value });
                                    }
                                }}
                            ></IonDatetime>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Etat</IonLabel>
                            <IonSelect value={formData.etat} onIonChange={(e) => setFormData({ ...formData, etat: e.detail.value })}>
                                <IonSelectOption value="0">0</IonSelectOption>
                                <IonSelectOption value="1">1</IonSelectOption>
                                <IonSelectOption value="2">2</IonSelectOption>
                                <IonSelectOption value="3">3</IonSelectOption>
                                <IonSelectOption value="4">4</IonSelectOption>
                                <IonSelectOption value="5">5</IonSelectOption>
                                <IonSelectOption value="6">6</IonSelectOption>
                                <IonSelectOption value="7">7</IonSelectOption>
                                <IonSelectOption value="8">8</IonSelectOption>
                                <IonSelectOption value="9">9</IonSelectOption>
                                <IonSelectOption value="10">10</IonSelectOption>
                                <IonSelectOption value="-10">-10</IonSelectOption>
                                {/* Ajoutez d'autres options selon vos besoins */}
                            </IonSelect>
                        </IonItem>
                        <div className="btn">
                            <button className='button' onClick={handlePreviousStep}> Précédent</button>
                            <button className='button' onClick={handleSubmit}> Valider</button>
                        </div>
                    </div>
                )}
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Notification'}
                    message={alertMessage}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};

export default Composants;
