import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useJobContext } from "../Context/JobContext";
import { 
  IonPage, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonSpinner,
  IonCard,
  IonCardContent,
  IonFooter,
  useIonToast
} from '@ionic/react';
import Footer from "../Components/Footer";

const JobApplicationForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [present] = useIonToast();
  const { singleJob, isSingleLoading, getSingleJob, addToApplied } = useJobContext();
  const [formState, setFormState] = useState({
    name: '',
    resumeLink: '',
    isSubmitting: false
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getSingleJob(id);
      }
    };
    fetchData();
  }, [id, getSingleJob]);

  const handleInputChange = (field, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, resumeLink } = formState;

    if (!name.trim() || !resumeLink.trim()) {
      await present({
        message: 'Please fill in all fields',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        { name, resumeLink }
      );
      if (response.status === 201) {
        addToApplied(singleJob);
        await present({
          message: 'Application submitted successfully!',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        history.push("/jobs");
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      await present({
        message: 'Failed to submit application. Please try again.',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

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

  const { position, company, postedAt, location } = singleJob;

  return (
    <IonPage>
      <IonContent>
        <div className="container mx-auto p-4 mt-16">
          <div className="grid md:grid-cols-2 gap-4">
            <IonCard>
              <IonCardContent>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-black mb-2">{position}</h1>
                  <p className="text-gray-700 mb-2">Posted {postedAt}</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {company}, {location}
                  </p>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      value={formState.name}
                      onIonInput={e => handleInputChange('name', e.detail.value)}
                      required
                      type="text"
                      placeholder="Enter your full name"
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating">Resume Link</IonLabel>
                    <IonInput
                      value={formState.resumeLink}
                      onIonInput={e => handleInputChange('resumeLink', e.detail.value)}
                      required
                      type="url"
                      placeholder="Enter your resume URL"
                    />
                  </IonItem>

                  <div className="flex justify-center mt-6">
                    <IonButton
                      type="submit"
                      color="dark"
                      expand="block"
                      disabled={formState.isSubmitting}
                    >
                      {formState.isSubmitting ? (
                        <IonSpinner name="dots" />
                      ) : (
                        'Submit Application'
                      )}
                    </IonButton>
                  </div>
                </form>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <Footer />
      </IonFooter>
    </IonPage>
  );
};

export default JobApplicationForm;
