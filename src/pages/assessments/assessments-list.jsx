import PageHeader from "@/components/shared/pageHeader/PageHeader";
import AssessmentsTable from "./components/AssessmentsTable";
import AssessmentsHeader from "./components/AssessmentsHeader";

const AssessmentsList = () => {
  return (
    <>
      <PageHeader>
        <AssessmentsHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <AssessmentsTable />
        </div>
      </div>
    </>
  );
};

export default AssessmentsList;
