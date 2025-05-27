import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import TestTypesHeader from "./components/TestTypesHeader";
import TestTypesTable from "./components/TestTypesTable";
import { fetchAllTestTypes } from "@/store/slice/testTypeSlice";

const TestTypesList = () => {
  const dispatch = useDispatch();

  const { testTypes } = useSelector((state) => state.testTypes);

  useEffect(() => {
    dispatch(fetchAllTestTypes());
  }, []);
  return (
    <>
      <PageHeader>
        <TestTypesHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <TestTypesTable data={testTypes} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TestTypesList;
