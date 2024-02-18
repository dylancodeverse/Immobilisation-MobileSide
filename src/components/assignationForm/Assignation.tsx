import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import theme from './imgs/Analysis-pana.svg';
import '../constants/font.css';
import '../constants/form.css';
import { useHistory } from 'react-router';
import { fetchBienAcquis, fetchGrpUsers, fetchUsers } from '../../utils/API';

const Assignation: React.FC = () => {
    const history = useHistory();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        bienacquis: '',
        utilisateur: null,
        grp: null,
        datedebut: '',
        datefin: ''
    });
    const [users, setUsers] = useState<string[]>([]);
    const [grpUsers, setGrpUsers] = useState<string[]>([]);
    const [materiels, setMateriels] = useState<string[]>([]);
    useEffect(() => {
        async function fetchData() {
            const usersData = await fetchUsers();
            const grpUsersData = await fetchGrpUsers();
            setUsers(usersData);
            setGrpUsers(grpUsersData);

            const bienAcquis = await fetchBienAcquis();
            const materielNames = bienAcquis.map((bien: any) => bien.bienacquisid);
            setMateriels(materielNames);
        }
        fetchData();
    }, []);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = () => {
        // Envoyer les données du formulaire
        console.log(formData);
    };

    const handleUserChange = (value: string) => {
        setFormData({ ...formData, utilisateur: value, grp: null });
    };

    const handleGrpChange = (value: string) => {
        setFormData({ ...formData, utilisateur: null, grp: value });
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
                                {materiels.map((materiel, index) => (
                                    <IonSelectOption key={index} value={materiel}>{materiel}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Utilisateur</IonLabel>
                            <IonSelect value={formData.utilisateur} onIonChange={(e) => handleUserChange(e.detail.value)}>
                                {users.map((user, index) => (
                                    <IonSelectOption key={index} value={user}>{user}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Groupe</IonLabel>
                            <IonSelect value={formData.grp} onIonChange={(e) => handleGrpChange(e.detail.value)}>
                                {grpUsers.map((grpUser, index) => (
                                    <IonSelectOption key={index} value={grpUser}>{grpUser}</IonSelectOption>
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
                            <button className='button' onClick={handlePreviousStep}> Précédant</button>
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
                            <button className='button' onClick={handlePreviousStep}> Précédant</button>
                            <button className='button' onClick={handleSubmit}> Valider</button>
                        </div>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Assignation;
