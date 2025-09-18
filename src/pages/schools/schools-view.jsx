import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSchoolById } from "@/store/slice/schoolSlice";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import SchoolsViewContent from "./components/SchoolsViewContent";
import SchoolsViewHeader from "./components/SchoolsViewHeader";
import SchoolsViewTab from "./components/SchoolsViewTab";

const SchoolsView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { school } = useSelector((state) => state.schools);

  useEffect(() => {
    dispatch(fetchSchoolById(id));
  }, [dispatch, id]);

  return (
    <>
      <PageHeader>
        <SchoolsViewHeader id={id} schoolData={school} />
      </PageHeader>
      <SchoolsViewTab />
      <div className="main-content">
        <div className="tab-content">
          <SchoolsViewContent schoolsData={school} />
        </div>
      </div>
    </>
  );
};

export default SchoolsView;
