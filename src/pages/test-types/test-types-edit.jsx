// import React from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import TestTypesEditContent from "./components/TestTypesEditContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTestTypeById } from "@/store/slice/testTypeSlice";
import { useParams } from "react-router-dom";

const TestTypesEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.testTypes);

  useEffect(() => {
    dispatch(fetchTestTypeById(id));
  }, []);
  return (
    <>
      <PageHeader></PageHeader>
      <div className="main-content">
        <div className="row">
          <TestTypesEditContent id={id} testData={type} />
        </div>
      </div>
    </>
  );
};

export default TestTypesEdit;
