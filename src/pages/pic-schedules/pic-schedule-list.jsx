import PageHeader from "@/components/shared/pageHeader/PageHeader";
import PlansHeader from "./components/PlansHeader";
import PICScheduleTable from "./components/PICScheduleTable";

const PICScheduleList = () => {
  return (
    <>
      <PageHeader>
        <PlansHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <PICScheduleTable />
        </div>
      </div>
    </>
  );
};

export default PICScheduleList;
