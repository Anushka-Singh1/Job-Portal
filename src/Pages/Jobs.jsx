import React from "react";
import FilterSection from "../Components/FilterSection";
import { useFilterContext } from "../Context/FilterContext";
import MainJobList from "../Components/MainJobList";
import { IonContent, IonPage, IonFooter } from '@ionic/react';
import Footer from "../Components/Footer";

function Jobs() {
  const { filter_jobs } = useFilterContext();
  
  return (
    <IonPage>
      <IonContent>
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <FilterSection />
          </div>
          <div className="bg-white rounded-lg shadow-sm flex flex-col">
            <div className="px-4 border-b">
              <p className="text-gray-700 font-medium text-center">
                {filter_jobs ? filter_jobs.length : 0} Jobs Found
              </p>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <MainJobList />
            </div>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <Footer />
      </IonFooter>
    </IonPage>
  );
}

export default Jobs;
