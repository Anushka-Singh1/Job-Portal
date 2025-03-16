import React from "react";
import { IonFooter, IonToolbar, IonTitle } from '@ionic/react';

function Footer() {
  return (
    <IonFooter className="ion-no-border">
      <IonToolbar color="dark" className="text-center">
        <IonTitle size="small">
          &copy; 2025 Job Listing Portal. All rights reserved.
        </IonTitle>
      </IonToolbar>
    </IonFooter>
  );
}

export default Footer;
