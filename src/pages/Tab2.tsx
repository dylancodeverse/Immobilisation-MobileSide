import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import Home from '../components/home/Home';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
          <Home/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
