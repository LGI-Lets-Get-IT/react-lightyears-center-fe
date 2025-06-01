import PageHeader from "@/components/shared/pageHeader/PageHeader";
import PlansHeader from "./components/PlansHeader";
import PlansTable from "./components/PlansTable";

const PlansList = () => {
  return (
    <>
      <PageHeader>
        <PlansHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <PlansTable />
        </div>
      </div>
    </>
  );
};

export default PlansList;
