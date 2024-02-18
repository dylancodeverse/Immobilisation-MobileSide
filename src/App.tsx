import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, analyticsOutline, notificationsCircleOutline, notificationsCircleSharp, notificationsCircle, notificationsSharp } from 'ionicons/icons'; // Importez les icônes souhaitées
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Assignation from './components/assignationForm/Assignation';
import Acquisition from './components/acquisitionForm/Acquisition';
import Composants from './components/composantsForm/Composants';
import BlackList from './components/blackListForm/BlackList';
import BlackListStrict from './components/blackListForm/BlackListStrct';
import BlackListSpec from './components/blackListForm/BlackListSpec';
import BlackListHier from './components/blackListForm/BlackListHier';
import NotificationChoice from './components/notifications/notificationsChoice';
import NotificationNonRendu from './components/notifications/notificationNonRendu';
import NotificationMaintenance from './components/notifications/notificationMaintenance';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
          <Route path="/assignation">
            <Assignation />
          </Route>
          <Route path="/acquisition">
            <Acquisition />
          </Route>
          <Route path="/composants">
            <Composants/>
          </Route>
          <Route path="/blacklist">
            <BlackList/>
          </Route>
          <Route path="/strict">
            <BlackListStrict/>
          </Route>
          <Route path="/specifique">
            <BlackListSpec/>
          </Route>
          <Route path="/hierarchique">
            <BlackListHier/>
          </Route>
          <Route path="/notifications">
            <NotificationChoice/>
          </Route>
          <Route path="/nonRendu">
            <NotificationNonRendu/>
          </Route>
          <Route path="/maintenance">
            <NotificationMaintenance/>
          </Route>

        </IonRouterOutlet>
        <IonTabBar slot="bottom" className='navtab'>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={homeOutline} /> 
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={analyticsOutline} /> 
            <IonLabel>Analytics</IonLabel>
          </IonTabButton>
          <IonTabButton tab='notifications' href="/notifications">
          <IonIcon aria-hidden="true" icon={notificationsSharp} /> 
            <IonLabel>Notifications</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
