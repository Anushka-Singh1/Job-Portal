import React from "react";
import { IonContent, IonPage, IonFooter } from '@ionic/react';
import Footer from "../Components/Footer";

const About = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-700 mb-4">
              Welcome to our job portal! We are dedicated to connecting talented professionals 
              with exciting career opportunities.
            </p>
            <p className="text-gray-700 mb-4">
              Our platform makes it easy to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Search for jobs based on your preferences</li>
              <li>Filter by contract type, role, and location</li>
              <li>Apply directly through our platform</li>
              <li>Track your job applications</li>
            </ul>
            <p className="text-gray-700">
              Start your job search journey with us today!
            </p>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <Footer />
      </IonFooter>
    </IonPage>
  );
};

export default About;
