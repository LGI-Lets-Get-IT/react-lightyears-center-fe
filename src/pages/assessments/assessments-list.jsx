import { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "@/store/slice/appointmentSlice";
import AppointmentsHeader from "./components/AssessmentsHeader";
import AssessmentsTable from "./components/AssessmentsTable";
import { fetchAllAssessments } from "@/store/slice/assessmentSlice";

const AssessmentsList = () => {
  const dispatch = useDispatch();

  const { assessments } = useSelector((state) => state.assessments);

  useEffect(() => {
    dispatch(fetchAllAssessments());
  }, []);
  return (
    <>
      <PageHeader>
        <AppointmentsHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <AssessmentsTable data={assessments} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AssessmentsList;
