import React, { useState } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import theme from './imgs/manipulation-bro.svg';
import '../constants/font.css';
import '../constants/form.css';
import './override.css'
import { useHistory } from 'react-router';

const BlackListStrict: React.FC = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        user: '',
        isGrp: true
    });

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
        history.push('/autre-page');
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
                            {/* Mettez vos options utilisateur ici */}
                            <IonSelectOption value="user1">Utilisateur 1</IonSelectOption>
                            <IonSelectOption value="user2">Utilisateur 2</IonSelectOption>
                            <IonSelectOption value="user3">Utilisateur 3</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Groupe</IonLabel>
                        <IonSelect value={formData.user} onIonChange={(e) => handleGrpChange(e.detail.value)}>
                            {/* Mettez vos options groupe ici */}
                            <IonSelectOption value="grp1">Groupe 1</IonSelectOption>
                            <IonSelectOption value="grp2">Groupe 2</IonSelectOption>
                            <IonSelectOption value="grp3">Groupe 3</IonSelectOption>
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
