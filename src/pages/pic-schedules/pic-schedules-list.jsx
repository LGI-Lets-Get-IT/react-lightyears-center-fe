import PageHeader from "@/components/shared/pageHeader/PageHeader";
import PICScheduleTable from "./components/PICScheduleTable";
// import PICScheduleHeader from "./components/PICScheduleHeader";

const PICSchedulesList = () => {
  return (
    <>
      <PageHeader>{/* <PICScheduleHeader /> */}</PageHeader>
      <div className="main-content">
        <div className="row">
          <PICScheduleTable />
        </div>
      </div>
    </>
  );
};

export default PICSchedulesList;
