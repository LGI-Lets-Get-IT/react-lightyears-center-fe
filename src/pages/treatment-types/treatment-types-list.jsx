import PageHeader from "@/components/shared/pageHeader/PageHeader";
import TreatmentTypesHeader from "./components/TreatmentTypesHeader";
import TreatmentTypesTable from "./components/TreatmentTypesTable";

const TreatmentTypesList = () => {
  return (
    <>
      <PageHeader>
        <TreatmentTypesHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <TreatmentTypesTable />
        </div>
      </div>
    </>
  );
};

export default TreatmentTypesList;
