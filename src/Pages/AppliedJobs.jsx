import React from "react";
import { useJobContext } from "../Context/JobContext";
import { 
  IonContent, 
  IonPage, 
  IonFooter,
  IonCard,
  IonCardContent,
  IonChip,
  IonLabel
} from '@ionic/react';
import Footer from "../Components/Footer";

const AppliedJobs = () => {
  const { applied } = useJobContext();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-2xl font-bold text-center">
                {applied.length === 0 ? `No Applied Jobs` : `Applied Jobs`}
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applied.map((job) => {
                  const {
                    id,
                    role,
                    contract,
                    location,
                    position,
                    company,
                  } = job;
                  return (
                    <IonCard 
                      key={id} 
                      routerLink={`/singlejob/${id}`}
                      button
                      className="ion-no-margin"
                    >
                      <IonCardContent>
                        <div className="flex flex-col">
                          <h3 className="text-xl font-semibold mb-2">
                            {position}
                          </h3>
                          <h4 className="text-lg font-medium mb-4">
                            {company}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            <IonChip color="dark">
                              <IonLabel>{role}</IonLabel>
                            </IonChip>
                            <IonChip color="dark">
                              <IonLabel>{contract}</IonLabel>
                            </IonChip>
                            <IonChip color="dark">
                              <IonLabel>{location}</IonLabel>
                            </IonChip>
                          </div>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <Footer />
      </IonFooter>
    </IonPage>
  );
};

export default AppliedJobs;
