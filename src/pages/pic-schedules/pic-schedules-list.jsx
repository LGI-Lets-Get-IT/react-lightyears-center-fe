import PageHeader from "@/components/shared/pageHeader/PageHeader";
import AssessmentsTable from "./components/PICScheduleTable";
import AssessmentsHeader from "./components/PICScheduleHeader";

const PICSchedulesList = () => {
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

export default PICSchedulesList;
