// import "./App.css";
import "../src/index.css";
import React, { useEffect } from 'react';
import { Redirect, Route } from "react-router-dom";
import { 
  IonApp, 
  IonRouterOutlet, 
  setupIonicReact,
  IonContent,
  IonPage,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  useIonRouter
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { App as CapacitorApp } from '@capacitor/app';
import About from "./Pages/About";
import Jobs from "./Pages/Jobs";
import SingleJob from "./Pages/SingleJob";
import ErrorPage from "./Pages/ErrorPage";
import AppliedJobs from "./Pages/AppliedJobs";
import JobApplicationForm from "./Pages/JobApplicationForm";
import Navbar from "./Components/Navbar";
import Image from "./assets/job.svg";

// Initialize Ionic React
setupIonicReact({
  mode: 'md'
});

const App = () => {
  const ionRouter = useIonRouter();

  useEffect(() => {
    const handleBackButton = () => {
      const currentPath = window.location.pathname;
      if (currentPath === '/jobs') {
        CapacitorApp.exitApp();
      } else {
        ionRouter.goBack();
      }
    };

    CapacitorApp.addListener('backButton', handleBackButton);

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [ionRouter]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonMenu contentId="main">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <Navbar />
            </IonContent>
          </IonMenu>
          
          <div className="ion-page" id="main">
            <IonHeader className="ion-no-border">
              <IonToolbar className="navbar-toolbar">
                <IonButtons slot="start">
                  <IonMenuButton />
                </IonButtons>
                <IonButtons slot="end">
                  <IonButton 
                    routerLink="/" 
                    routerDirection="root" 
                    fill="clear"
                    className="logo-button"
                  >
                    <img src={Image} alt="logo" className="h-8" />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-top">
              <IonRouterOutlet>
                <Route exact path="/" render={() => <Redirect to="/jobs" />} />
                <Route exact path="/jobs" component={Jobs} />
                <Route exact path="/about" component={About} />
                <Route exact path="/applied" component={AppliedJobs} />
                <Route exact path="/singlejob/:id" component={SingleJob} />
                <Route exact path="/singlejob/:id/apply" component={JobApplicationForm} />
                <Route exact path="/error" component={ErrorPage} />
                <Route render={() => <Redirect to="/error" />} />
              </IonRouterOutlet>
            </IonContent>
          </div>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
