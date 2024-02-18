import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonDatetime, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import theme from './imgs/Heavy box-pana.svg';
import '../constants/font.css';
import '../constants/form.css';
import { useHistory } from 'react-router';
import { fetchDepots, fetchNatures, fetchUsers } from '../../utils/API';

const Acquisition: React.FC = () => {
    const history = useHistory();
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState({
        natureid: '',
        depot: '',
        dateacquis: '',
        idtypeamortissement: '',
        anneeamorti: '',
        achat: '',
        debutUtilisation: '',
        etatgeneral: '',
        user: '',
        description: ''
    });
    
    const [natures, setNatures] = useState<string[]>([]);
    const [depots, setDepots] = useState<string[]>([]);
    const[users ,setUsers] = useState<string []>([])
    useEffect(() => {
        fetchNatures().then(natureIds => setNatures(natureIds));
        fetchDepots().then(depotNames => setDepots(depotNames));
        fetchUsers().then(users => setUsers(users))
    }, []);

    const handleNextStep = () => {
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
                <div className='acquisition-container'>
                    <img src={theme} alt="" />
                </div>
                <div className="bienvenue">
                    <p className='nunito-bold'>Acquisition</p>
                </div>
                <div className="form-container">
                    {step === 1 && (
                        <>
                            <IonItem>
                                <IonLabel position="stacked">Nature ID</IonLabel>
                                <IonSelect value={formData.natureid} onIonChange={(e) => setFormData({ ...formData, natureid: e.detail.value })}>
                                    {natures.map((nature, index) => (
                                        <IonSelectOption key={index} value={nature}>{nature}</IonSelectOption>
                                    ))}
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Dépôt</IonLabel>
                                <IonSelect value={formData.depot} onIonChange={(e) => setFormData({ ...formData, depot: e.detail.value })}>
                                    {depots.map((depot, index) => (
                                        <IonSelectOption key={index} value={depot}>{depot}</IonSelectOption>
                                    ))}
                                </IonSelect>
                            </IonItem>

                            <div className="btn">
                                <button className='button' onClick={handleNextStep}>Suivant</button>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <IonItem>
                                <IonLabel position="stacked">Date d'acquisition</IonLabel>
                                <IonDatetime 
                                    value={formData.dateacquis} 
                                    onIonChange={(e) => {
                                        if (typeof e.detail.value === 'string') {
                                            setFormData({ ...formData, dateacquis: e.detail.value })
                                        }
                                    }}
                                ></IonDatetime>
                            </IonItem>
                            <div className="btn">
                                <button className='button' onClick={handlePreviousStep}>Précédent</button>
                                <button className='button' onClick={handleNextStep}>Suivant</button>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <IonItem>
                                <IonLabel position="stacked">Type d'amortissement</IonLabel>
                                <IonSelect value={formData.idtypeamortissement} onIonChange={(e) => setFormData({ ...formData, idtypeamortissement: e.detail.value })}>
                                    <IonSelectOption value="lineaire">Lineaire</IonSelectOption>
                                    <IonSelectOption value="degressif">Degressif</IonSelectOption>
                                    {/* Ajoutez d'autres options selon vos besoins */}
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Année d'amortissement</IonLabel>
                                <IonInput value={formData.anneeamorti} onIonChange={(e) => setFormData({ ...formData, anneeamorti: e.detail.value! })}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Achat</IonLabel>
                                <IonInput value={formData.achat} onIonChange={(e) => setFormData({ ...formData, achat: e.detail.value! })}></IonInput>
                            </IonItem>
                            <div className="btn">
                                <button className='button' onClick={handlePreviousStep}>Précédent</button>
                                <button className='button' onClick={handleNextStep}>Suivant</button>
                            </div>
                        </>
                    )}
                    {step === 4 && (
                        <>
                            <IonItem>
                                <IonLabel position="stacked">Début d'utilisation</IonLabel>
                                <IonDatetime value={formData.debutUtilisation} onIonChange={(e) => 
                                {
                                    if (typeof e.detail.value === 'string') {
                                        setFormData({ ...formData, debutUtilisation: e.detail.value! })
                                    }
                                }
                                    }>
                                        
                                    </IonDatetime>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">État général</IonLabel>
                                <IonInput value={formData.etatgeneral} onIonChange={(e) => setFormData({ ...formData, etatgeneral: e.detail.value! })}></IonInput>
                            </IonItem>
                            <div className="btn">
                                <button className='button' onClick={handlePreviousStep}>Précédent</button>
                                <button className='button' onClick={handleNextStep}>Suivant</button>
                            </div>
                        </>
                    )}
                    {step === 5 && (
                        <>
                            <IonItem>
                                <IonLabel position="stacked">Utilisateur</IonLabel>
                                <IonSelect value={formData.user} onIonChange={(e) => setFormData({ ...formData, user: e.detail.value })}>
                                    {users.map((user, index) => (
                                        <IonSelectOption key={index} value={user}>{user}</IonSelectOption>
                                    ))}
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Description</IonLabel>
                                <IonInput value={formData.description} onIonChange={(e) => setFormData({ ...formData, description: e.detail.value! })}></IonInput>
                            </IonItem>
                            <div className="btn">
                                <button className='button' onClick={handlePreviousStep}>Précédent</button>
                                <button className='button' onClick={handleSubmit}>Valider</button>
                            </div>
                        </>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Acquisition;
