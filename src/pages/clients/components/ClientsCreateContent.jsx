// import React from "react";
import TabPassword from "../../../components/customersCreate/TabPassword";
import TabProfile from "./TabProfile";

const ClientCreateContent = () => {
  return (
    <div className="col-lg-12">
      <div className="card border-top-0">
        <div className="card-header p-0">
          <ul
            className="nav nav-tabs flex-wrap w-100 text-center customers-nav-tabs"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item flex-fill border-top" role="presentation">
              <a
                href="$"
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#profileTab"
                role="tab"
              >
                Profile
              </a>
            </li>
            {/* <li className="nav-item flex-fill border-top" role="presentation">
              <a
                href="$"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#passwordTab"
                role="tab"
              >
                Password
              </a>
            </li> */}
          </ul>
        </div>
        <div className="tab-content">
          <TabProfile />
          {/* <TabPassword /> */}
        </div>
      </div>
    </div>
  );
};

export default ClientCreateContent;
