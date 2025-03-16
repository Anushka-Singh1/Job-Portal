import React from "react";
import { useFilterContext } from "../Context/FilterContext";
import { IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import './FilterSection.css';

function FilterSection() {
  const {
    filters: { position, contract, location, role },
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
      <IonList className="ion-no-padding">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-800">Contract Type</h3>
          <div className="flex flex-col space-y-2">
            {contractData.map((curElem, index) => {
              const isSelected = contract === curElem;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={updateFilterValue}
                  name="contract"
                  value={curElem}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isSelected 
                      ? "bg-black text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {curElem}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-800">Role</h3>
          <IonSelect
            className="w-full bg-gray-100 rounded-lg"
            name="role"
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

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-800">Location</h3>
          <IonSelect
            className="w-full bg-gray-100 rounded-lg"
            name="location"
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

        <div className="flex justify-center mt-6">
          <IonButton
            fill="solid"
            color="dark"
            expand="block"
            onClick={clearFilters}
            className="w-full"
          >
            Clear Filters
          </IonButton>
        </div>
      </IonList>
    </div>
  );
}

export default FilterSection;
