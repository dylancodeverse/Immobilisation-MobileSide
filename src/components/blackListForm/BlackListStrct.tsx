import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonAlert } from '@ionic/react';
import theme from './imgs/manipulation-bro.svg';
import '../constants/font.css';
import '../constants/form.css';
import './override.css'
import { useHistory } from 'react-router';
import { fetchGrpUsers, fetchUsers } from '../../utils/API';

const BlackListStrict: React.FC = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        user: '',
        isGrp: true
    });
    const [users, setUsers] = useState<string[]>([]);
    const [groups, setGroups] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await fetchUsers();
            const groupsData = await fetchGrpUsers();
            setUsers(usersData);
            setGroups(groupsData);
        };
    
        fetchData();
    }, []);

    const handleUserChange = (user: string) => {
        setFormData({ user: user, isGrp: false });
    };

    const handleGrpChange = (grp: string) => {
        setFormData({ user: grp, isGrp: true });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/strict', {
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
                    <p className='nunito-bold'>Black List Strict</p>
                </div>
                <div className="bienvenue deux">
                <p className='nunito-light-kely'> On doit choisir soit utilisateur soit groupe mais pas les deux en meme temps</p>

                </div>

                <div className="form-container">
                    <IonItem>
                        <IonLabel position="stacked">Utilisateur</IonLabel>
                        <IonSelect value={formData.user} onIonChange={(e) => handleUserChange(e.detail.value)}>
                            {users.map((user: string) => (
                                <IonSelectOption key={user} value={user}>{user}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Groupe</IonLabel>
                        <IonSelect value={formData.user} onIonChange={(e) => handleGrpChange(e.detail.value)}>
                            {groups.map((group: string) => (
                                <IonSelectOption key={group} value={group}>{group}</IonSelectOption>
                            ))}
                        </IonSelect>
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

export default BlackListStrict;
