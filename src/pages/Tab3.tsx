import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import Analytics from '../components/analytics/Analytics';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Analytics/>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
