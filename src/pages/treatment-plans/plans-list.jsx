import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { fetchAllPlans } from "@/store/slice/treatmentPlanSlice";
import PlansHeader from "./components/PlansHeader";
import PlansTable from "./components/PlansTable";

const PlansList = () => {
  const dispatch = useDispatch();

  const { plans } = useSelector((state) => state.treatmentPlans);

  useEffect(() => {
    dispatch(fetchAllPlans());
  }, []);
  return (
    <>
      <PageHeader>
        <PlansHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <PlansTable plans={plans} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlansList;
