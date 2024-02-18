import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonAlert } from '@ionic/react';
import '../constants/font.css';
import '../constants/form.css';
import './override.css';
import theme from './imgs/manipulation-bro.svg';
import { useHistory } from 'react-router';
import { fetchGrpUsers, fetchBienAcquis, fetchUsers } from '../../utils/API';

const BlackListSpec: React.FC = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        user: '',
        isGrp: false,
        bienacquis: ''
    });
    const [users, setUsers] = useState<string[]>([]);
    const [groups, setGroups] = useState<string[]>([]);
    const [bienAcquis, setBienAcquis] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await fetchUsers();
                const groupsData = await fetchGrpUsers();
                const bienAcquisData = await fetchBienAcquis();
                setUsers(usersData);
                setGroups(groupsData);
                const materielNames = bienAcquisData.map((bien: any) => bien.bienacquisid);
                setBienAcquis(materielNames);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleUserChange = (user: string) => {
        setFormData({ user: user, isGrp: false, bienacquis: '' });
    };

    const handleGrpChange = (grp: string) => {
        setFormData({ user: grp, isGrp: true, bienacquis: '' });
    };

    const handleBienacquisChange = (bienacquis: string) => {
        setFormData({ ...formData, bienacquis });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/specifique', {
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
                    <p className='nunito-bold'>Blacklist Specifique</p>
                </div>
                <div className='bienvenue deux'>
                    <p className='nunito-light-kely'>On doit choisir soit utilisateur soit groupe mais pas les deux en même temps</p>
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
                    <IonItem>
                        <IonLabel position="stacked">Bien acquis</IonLabel>
                        <IonSelect value={formData.bienacquis} onIonChange={(e) => handleBienacquisChange(e.detail.value)}>
                            {bienAcquis.map((bien: string) => (
                                <IonSelectOption key={bien} value={bien}>{bien}</IonSelectOption>
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

export default BlackListSpec;
