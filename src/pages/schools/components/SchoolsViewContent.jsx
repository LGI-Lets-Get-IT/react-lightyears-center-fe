import TabSchoolClient from "./TabSchoolsClient";
import TabSchoolsProfile from "./TabSchoolsProfile";
import LeadsEmptyCard from "@/components/leadsViewCreate/LeadsEmptyCard";

const SchoolsViewContent = ({ schoolsData }) => {
  {
    console.log("SCHOOLSDATA", schoolsData);
  }
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="overviewTab"
        role="tabpanel"
      >
        <TabSchoolsProfile schoolInformation={schoolsData} />
      </div>
      <div className="tab-pane fade" id="clientTab" role="tabpanel">
        <TabSchoolClient />
      </div>
    </>
  );
};

export default SchoolsViewContent;
