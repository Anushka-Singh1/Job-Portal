import React from "react";
import { useFilterContext } from "../Context/FilterContext";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonChip } from '@ionic/react';

function MainJobList() {
  const { filter_jobs } = useFilterContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filter_jobs.map((curElem) => {
        const { id, title, body, role, contract, location, position, company } = curElem;
        return (
          <IonCard key={id} routerLink={`/singlejob/${id}`} button>
            <IonCardContent>
              <div className="flex flex-col">
                <IonCardTitle className="text-xl font-bold mb-2">
                  {position}
                </IonCardTitle>
                <IonCardSubtitle className="text-lg mb-4">
                  {company}
                </IonCardSubtitle>
                <div className="flex flex-wrap gap-2">
                  <IonChip color="dark">
                    {role}
                  </IonChip>
                  <IonChip color="dark">
                    {contract}
                  </IonChip>
                  <IonChip color="dark">
                    {location}
                  </IonChip>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        );
      })}
    </div>
  );
}

export default MainJobList;
