import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
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
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);

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
                    <p className='nunito-bold'>Black List Strict</p>
                </div>
                <div className="bienvenue deux">
                <p className='nunito-light-kely'> On doit choisir soit utilisateur soit groupe mais pas les deux en meme temps</p>

                </div>

                <div className="form-container">
                    <IonItem>
                        <IonLabel position="stacked">Utilisateur</IonLabel>
                        <IonSelect value={formData.user} onIonChange={(e) => handleUserChange(e.detail.value)}>
                            {users.map((user: any) => (
                                <IonSelectOption key={user} value={user}>{user}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Groupe</IonLabel>
                        <IonSelect value={formData.user} onIonChange={(e) => handleGrpChange(e.detail.value)}>
                            {groups.map((group: any) => (
                                <IonSelectOption key={group} value={group}>{group}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                    <div className="btn">
                        <button className='button' onClick={handleSubmit}>Valider</button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default BlackListStrict;
