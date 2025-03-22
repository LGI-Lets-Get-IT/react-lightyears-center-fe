import React, { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import LeadsViewTab from "@/components/leadsViewCreate/LeadsViewTab";
import SchoolsViewContent from "./components/SchoolsViewContent";
import SchoolsViewHeader from "./components/SchoolsViewHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSchoolById } from "@/store/slice/schoolSlice";

const SchoolsView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentSchool = useSelector((state) => state.schools.school);

  useEffect(() => {
    dispatch(fetchSchoolById(id));
  }, [dispatch, id]);

  return (
    <>
      <PageHeader>
        <SchoolsViewHeader />
      </PageHeader>
      <LeadsViewTab />
      <div className="main-content">
        <div className="tab-content">
          {/* <LeadssTable /> */}
          <SchoolsViewContent schoolsData={currentSchool} />
        </div>
      </div>
    </>
  );
};

export default SchoolsView;
