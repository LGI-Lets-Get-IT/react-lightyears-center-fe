import { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import AssessmentsTable from "./components/AssessmentsTable";
import { fetchAllAssessments } from "@/store/slice/assessmentSlice";
import AssessmentsHeader from "./components/AssessmentsHeader";

const AssessmentsList = () => {
  const dispatch = useDispatch();

  const { assessments } = useSelector((state) => state.assessments);

  useEffect(() => {
    dispatch(fetchAllAssessments());
  }, []);
  return (
    <>
      <PageHeader>
        <AssessmentsHeader />
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
