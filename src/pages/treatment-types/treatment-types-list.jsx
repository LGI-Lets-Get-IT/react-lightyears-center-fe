import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import TreatmentTypesHeader from "./components/TreatmentTypesHeader";
import TreatmentTypesTable from "./components/TreatmentTypesTable";
import { fetchAllTreatmentTypes } from "@/store/slice/treatmentTypeSlice";

const TreatmentTypesList = () => {
  const dispatch = useDispatch();

  const { treatmentTypes } = useSelector((state) => state.treatmentTypes);

  useEffect(() => {
    dispatch(fetchAllTreatmentTypes());
  }, []);
  return (
    <>
      <PageHeader>
        <TreatmentTypesHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <TreatmentTypesTable data={treatmentTypes} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TreatmentTypesList;
