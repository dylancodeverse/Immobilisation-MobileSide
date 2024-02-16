import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/first/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>

      <IonContent fullscreen>
        <ExploreContainer/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
