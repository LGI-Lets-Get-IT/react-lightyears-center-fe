import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployees } from "@/store/slice/employeeSlice";
import { useNavigate } from "react-router-dom";

const PICScheduleViewContent = ({ scheduleData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading: fetchLoading } = useSelector(
    (state) => state.picSchedules
  );

  return (
    <>
      <div className="col-lg-12">
        <div className="card stretch stretch-full">
          <div className="card-body">
            <div className="mb-5 d-flex align-items-center justify-content-between">
              <h5 className="fw-bold mb-0 me-4">
                <span className="d-block mb-2">
                  {scheduleData?.fullName} Schedules
                </span>
                {/* <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                  Last Edited:{" "}
                  {scheduleData?.updatedAt &&
                    format(scheduleData?.updatedAt, "dd MMM yyyy, HH:mm aa")}
                </span> */}
              </h5>
            </div>
            <div className="row">
              <div className="col-lg-12 mb-4">
                <label className="form-label">PIC Name</label>
                <p>
                  [{scheduleData?.role?.name}] {scheduleData?.fullName || "-"}
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <label className="form-label">Available Schedules</label>

              <div className="accordion proposal-faq-accordion">
                {scheduleData?.schedules.length > 0 ? (
                  scheduleData.schedules.map((schedule, index) => (
                    <AccordionItem
                      key={index}
                      id={`schedules-${index}`}
                      header={`Schedule ${index + 1}`}
                    >
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Available Day(s)
                        </label>
                        <div className="col-sm-9">
                          {schedule?.availableDays.join(", ")}
                        </div>
                      </div>
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Available Start Time{" "}
                        </label>
                        <div className="col-sm-9">
                          {schedule.availableStartTime}
                        </div>
                      </div>
                      <div className="form-group row mb-3 align-items-center">
                        <label className="col-sm-3 col-form-label">
                          Available End Time
                        </label>
                        <div className="col-sm-9">
                          {schedule.availableEndTime}
                        </div>
                      </div>
                    </AccordionItem>
                  ))
                ) : (
                  <p>
                    There are no available schedules for this PIC. To add,
                    please use &apos;Edit Schedule&apos; button
                  </p>
                )}
              </div>
            </div>
            {/* )}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PICScheduleViewContent;

const AccordionItem = ({ id, header, children }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`flush-heading${id}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse${id}`}
          aria-expanded="false"
          aria-controls={`flush-collapse${id}`}
        >
          {header}
        </button>
      </h2>
      <div
        id={`flush-collapse${id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`flush-heading${id}`}
        data-bs-parent="#accordionFaqGroup"
      >
        <div className="accordion-body p-3 rounded">{children}</div>
      </div>
    </div>
  );
};
