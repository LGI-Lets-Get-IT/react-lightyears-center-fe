// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import TestTypesEditContent from "./components/TreatmentTypesEditContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTreatmentTypeById } from "@/store/slice/treatmentTypeSlice";
import TreatmentTypesEditContent from "./components/TreatmentTypesEditContent";

const TreatmentTypesEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { type } = useSelector(state => state.treatmentTypes);

  useEffect(() => {
    dispatch(fetchTreatmentTypeById(id));
  }, [])
  return (
    <>
      <PageHeader>
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <TreatmentTypesEditContent id={id} treatmentData={type} />
        </div>
      </div>
    </>
  );
};

export default TreatmentTypesEdit;
