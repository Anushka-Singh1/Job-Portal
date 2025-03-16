import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useJobContext } from "../Context/JobContext";
import { IonContent, IonPage, IonButton, IonSpinner, IonFooter } from '@ionic/react';
import Footer from "../Components/Footer";

function SingleJob() {
  const { singleJob, isSingleLoading, getSingleJob, applied } = useJobContext();
  const { id } = useParams();
  const [isJobPreviouslyApplied, setIsJobPreviouslyApplied] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getSingleJob(id);
      }
    };
    fetchData();
  }, [id, getSingleJob]);

  useEffect(() => {
    const checkIfApplied = () => {
      if (!applied?.length || !id) return false;
      return applied.some(appliedJob => appliedJob.id === parseInt(id));
    };
    
    setIsJobPreviouslyApplied(checkIfApplied());
  }, [applied, id]);

  if (isSingleLoading || !singleJob?.position) {
    return (
      <IonPage>
        <IonContent>
          <div className="flex items-center justify-center h-full">
            <IonSpinner name="circular" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const {
    position,
    body,
    company,
    role,
    level,
    postedAt,
    contract,
    location,
    languages = [],
    tools = [],
  } = singleJob;

  return (
    <IonPage>
      <IonContent>
        <div className="container mx-auto p-4 mt-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <h1 className="text-2xl font-bold text-black">{position}</h1>
              <p className="text-gray-700">Posted {postedAt}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-800">
                {company}, {location}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Job Description</h2>
              <p className="text-gray-700 text-justify">{body}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Job Specifications</h2>
              <div className="space-y-2">
                <p className="text-gray-700">{role}</p>
                <p className="text-gray-700">{level}</p>
                <p className="text-gray-700">{contract}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Skills and Tools Required</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <span key={index} className="bg-gray-200 px-3 py-1 rounded">
                    {lang}
                  </span>
                ))}
                {tools.map((tool, index) => (
                  <span key={index} className="bg-gray-200 px-3 py-1 rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <IonButton
                routerLink={isJobPreviouslyApplied ? undefined : `/singlejob/${id}/apply`}
                disabled={isJobPreviouslyApplied}
                color={isJobPreviouslyApplied ? "medium" : "dark"}
                className="w-full md:w-auto"
                fill={isJobPreviouslyApplied ? "outline" : "solid"}
                style={{
                  opacity: isJobPreviouslyApplied ? '0.7' : '1',
                  '--background': isJobPreviouslyApplied ? 'var(--ion-color-medium)' : undefined,
                  '--color': isJobPreviouslyApplied ? 'var(--ion-color-medium-contrast)' : undefined
                }}
              >
                {isJobPreviouslyApplied ? 'Applied' : 'Apply'}
              </IonButton>
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

export default SingleJob;
