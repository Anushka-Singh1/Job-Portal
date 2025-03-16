import React from "react";
import { useFilterContext } from "../Context/FilterContext";
import { 
  IonSelect, 
  IonSelectOption, 
  IonButton,
  IonToolbar,
  IonLabel
} from '@ionic/react';
import './FilterSection.css';

function FilterSection() {
  const {
    filters: { contract, location, role },
    updateFilterValue,
    all_jobs,
    clearFilters,
  } = useFilterContext();

  // To get data of each field
  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    });
    return (newVal = ["All", ...new Set(newVal)]);
  };

  // Filter section unique data
  const contractData = getUniqueData(all_jobs, "contract");
  const roleData = getUniqueData(all_jobs, "role");
  const locationData = getUniqueData(all_jobs, "location");

  return (
    <div className="filter-section">
      <IonToolbar className="filter-toolbar">
        <div className="filter-scroll-container">
          <div className="filter-container">
            <div className="filter-item">
              <IonLabel>Contract Type</IonLabel>
              <IonSelect
                value={contract}
                onIonChange={(e) => updateFilterValue({ target: { name: 'contract', value: e.detail.value } })}
                interface="popover"
              >
                {contractData.map((curElem, index) => (
                  <IonSelectOption key={index} value={curElem}>
                    {curElem}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>

            <div className="filter-item">
              <IonLabel>Role</IonLabel>
              <IonSelect
                value={role}
                onIonChange={(e) => updateFilterValue({ target: { name: 'role', value: e.detail.value } })}
                interface="popover"
              >
                {roleData.map((curElem, index) => (
                  <IonSelectOption key={index} value={curElem}>
                    {curElem}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>

            <div className="filter-item">
              <IonLabel>Location</IonLabel>
              <IonSelect
                value={location}
                onIonChange={(e) => updateFilterValue({ target: { name: 'location', value: e.detail.value } })}
                interface="popover"
              >
                {locationData.map((curElem, index) => (
                  <IonSelectOption key={index} value={curElem}>
                    {curElem}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>

            <div className="filter-item">
              <IonLabel>&nbsp;</IonLabel>
              <IonButton
                fill="clear"
                color="dark"
                onClick={clearFilters}
                className="clear-button"
              >
                Clear
              </IonButton>
            </div>
          </div>
        </div>
      </IonToolbar>
    </div>
  );
}

export default FilterSection;
