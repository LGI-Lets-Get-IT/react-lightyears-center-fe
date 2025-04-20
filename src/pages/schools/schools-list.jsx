import { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import SchoolsHeader from "./components/SchoolsHeader";
import SchoolsTable from "./components/SchoolsTable";
import { fetchAllSchools } from "@/store/slice/schoolSlice";

const SchoolsList = () => {
  const dispatch = useDispatch();

  const { schools } = useSelector((state) => state.schools);

  useEffect(() => {
    dispatch(fetchAllSchools());
  }, []);
  return (
    <>
      <PageHeader>
        <SchoolsHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <SchoolsTable data={schools} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SchoolsList;
