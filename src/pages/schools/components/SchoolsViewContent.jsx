import TabSchoolClient from "./TabSchoolsClient";
import TabSchoolsProfile from "./TabSchoolsProfile";
import LeadsEmptyCard from "@/components/leadsViewCreate/LeadsEmptyCard";

const SchoolsViewContent = ({schoolsData}) => {
  {console.log('SCHOOLSDATA', schoolsData)}
  return (
    <>
      <TabSchoolsProfile schoolInformation={schoolsData} />
      <div className="tab-pane fade" id="clientTab" role="tabpanel">
      <TabSchoolClient />
      </div>
      <div className="tab-pane fade" id="tasksTab" role="tabpanel">
        <LeadsEmptyCard
          title={"No tasks yet!"}
          description={"There is no tasks create yet."}
        />
      </div>
      <div className="tab-pane fade" id="notesTab" role="tabpanel">
        <LeadsEmptyCard
          title={"No notes yet!"}
          description={"There is no notes create yet."}
        />
      </div>
      <div className="tab-pane fade" id="commentTab" role="tabpanel">
        <LeadsEmptyCard
          title={"No comment yet!"}
          description={"There is no comment create yet."}
        />
      </div>
    </>
  );
};

export default SchoolsViewContent;
