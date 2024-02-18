import React, { useState } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import theme from './imgs/Analysis-pana.svg';
import '../constants/font.css';
import '../constants/form.css';
import { useHistory } from 'react-router';

const Assignation: React.FC = () => {
    const history = useHistory()
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        bienacquis: '',
        utilisateur: '',
        grp: '',
        datedebut: '',
        datefin: ''
    });

    const   handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = () => {
        // Envoyer les données du formulaire
        console.log(formData)
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='assignation-container'>
                    <img src={theme} alt="" />
                </div>
                <div className="bienvenue">
                    <p className='nunito-bold'>Assignation</p>
                </div>
                {step === 1 && (
                    <div className="form-container">
                        <IonItem>
                            <IonLabel position="stacked">Materiel</IonLabel>
                            <IonSelect value={formData.bienacquis} onIonChange={(e) => setFormData({ ...formData, bienacquis: e.detail.value })}>
                                <IonSelectOption value="ordinateur">Ordinateur</IonSelectOption>
                                <IonSelectOption value="imprimante">Imprimante</IonSelectOption>
                                <IonSelectOption value="scanner">Scanner</IonSelectOption>
                                {/* Ajoutez d'autres options selon vos besoins */}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Utilisateur/Grp</IonLabel>
                            <IonSelect value={formData.utilisateur || formData.grp} onIonChange={(e) => setFormData({ ...formData, utilisateur: e.detail.value, grp: e.detail.value })}>
                                <IonSelectOption value="utilisateur">Utilisateur</IonSelectOption>
                                <IonSelectOption value="grp">Groupe</IonSelectOption>
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
                            <IonLabel position="stacked">Date de début</IonLabel>
                            <IonDatetime
                                value={formData.datedebut}
                                onIonChange={(e) => {
                                    if (typeof e.detail.value === 'string') {
                                        setFormData({ ...formData, datedebut: e.detail.value });
                                    }
                                }}
                            ></IonDatetime>
                        </IonItem>
                        <div className="btn">
                            <button className='button' onClick={handlePreviousStep}> Precedant</button>

                            <button className='button' onClick={handleNextStep}> Suivant</button>

                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className="form-container">
                        <IonItem>
                            <IonLabel position="stacked">Date de fin</IonLabel>
                            <IonDatetime
                                value={formData.datefin}
                                onIonChange={(e) => {
                                    if (typeof e.detail.value === 'string') {
                                        setFormData({ ...formData, datefin: e.detail.value });
                                    }
                                }}
                            ></IonDatetime>
                        </IonItem>
                        <div className="btn">
                            <button className='button' onClick={handlePreviousStep}> Precedant</button>

                            <button className='button' onClick={handleSubmit}> Valider</button>

                        </div>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Assignation;
