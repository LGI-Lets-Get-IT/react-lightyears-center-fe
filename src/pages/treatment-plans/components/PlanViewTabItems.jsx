import React from "react";

const PlanViewTabItems = () => {
  return (
    <div className="bg-white py-3 border-bottom rounded-0 p-md-0 mb-0">
      <div className="d-md-none d-flex align-items-center justify-content-between">
        <a href="#" className="page-content-left-open-toggle">
          <i className="feather-align-left fs-20"></i>
        </a>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="nav-tabs-wrapper page-content-left-sidebar-wrapper">
          <ul
            className="nav nav-tabs flex-wrap w-100 text-center customers-nav-tabs"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item flex-fill border-top" role="presentation">
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#overviewTab"
              >
                Overview
              </button>
            </li>
            <li className="nav-item flex-fill border-top" role="presentation">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#progressTab"
              >
                Progress
              </button>
            </li>
            {/* <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#filesTab"
              >
                Files
              </button>
            </li> */}
            {/* <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#timesheetsTab">Timesheets</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#milestonesTab">Milestones</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#discussionsTab">Discussions</button>
                        </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanViewTabItems;
