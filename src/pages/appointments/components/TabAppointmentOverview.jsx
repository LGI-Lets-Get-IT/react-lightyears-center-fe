import React, { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import getIcon from "@/utils/getIcon";

// const moreOptions = [
//   { label: "Pin Project", icon: "feather-map-pin" },
//   { label: "Edit Project", icon: "feather-edit" },
// ];

export const imageList = [
  {
    id: 1,
    user_name: "Janette Dalton",
    user_img: "/images/avatar/2.png",
  },
  {
    id: 2,
    user_name: "Mikal Bon",
    user_img: "/images/avatar/3.png",
  },
  {
    id: 3,
    user_name: "Socrates Itumay",
    user_img: "/images/avatar/4.png",
  },
  {
    id: 4,
    user_name: "Jakson Jak",
    user_img: "/images/avatar/6.png",
  },
  {
    id: 5,
    user_name: "Socrates Itumay",
    user_img: "/images/avatar/5.png",
  },
];
const TabAppointmentOverview = ({ appointmentData }) => {
  // const chartOptions = projectViewAreaChartOptions();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000); // update tiap detik

    return () => clearInterval(timer);
  }, []);

  if (
    !appointmentData?.createdAt ||
    !appointmentData?.appointmentDate ||
    !appointmentData?.appointmentTime
  ) {
    return null;
  }

  const createdAt = new Date(appointmentData.createdAt);
  const appointmentDateOnly = new Date(appointmentData.appointmentDate);

  // Parse appointmentTime string
  const [startTimeStr, endTimeStr] = appointmentData.appointmentTime
    .split(" - ")
    .map((t) => t.trim());

  const [startHour, startMinute] = startTimeStr.split(":").map(Number);
  const [endHour, endMinute] = endTimeStr.split(":").map(Number);

  // Build full datetime objects for the start and end of the appointment
  const appointmentStart = new Date(appointmentDateOnly);
  appointmentStart.setHours(startHour, startMinute, 0, 0);

  const appointmentEnd = new Date(appointmentDateOnly);
  appointmentEnd.setHours(endHour, endMinute, 0, 0);

  const totalDurationMs = appointmentStart - createdAt;
  const elapsedMs = now - createdAt;
  const progress =
    elapsedMs <= 0 ? 0 : Math.min((elapsedMs / totalDurationMs) * 100, 100);

  // Status determination
  const isOverdue = now > appointmentEnd;
  const isOngoing = now >= appointmentStart && now <= appointmentEnd;
  const isBeforeStart = now < appointmentStart;
  const isToday = now.toDateString() === appointmentDateOnly.toDateString();

  // Format countdown to HH:mm:ss
  const formatCountdown = (ms) => {
    const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  let statusText = "";
  if (isOverdue) {
    statusText = "Appointment Completed / Missed";
  } else if (isOngoing) {
    statusText = "On Going - Ends in " + formatCountdown(appointmentEnd - now);
  } else if (isBeforeStart && isToday) {
    statusText = "Starting in " + formatCountdown(appointmentStart - now);
  } else if (isBeforeStart && !isToday) {
    const daysLeft = Math.ceil(
      (appointmentStart - now) / (1000 * 60 * 60 * 24)
    );
    statusText =
      `${daysLeft} Day${daysLeft > 1 ? "s" : ""} Left - ` +
      formatCountdown(appointmentStart - now);
  }

  return (
    <div className="tab-pane fade active show" id="overviewTab">
      {/* {console.log("APPOINTMENTDATA", appointmentData)} */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card stretch stretch-full">
            <div className="card-body task-header d-md-flex align-items-center justify-content-between">
              <div className="me-4">
                <h4 className="mb-4 fw-bold d-flex">
                  <span className="text-truncate-1-line text-capitalize">
                    {appointmentData ? <>[{appointmentData?.appointmentType}] {appointmentData?.title}</> : <>-</>}
                    {/* <span className="text-muted">
                      {appointmentData?.appointmentType}
                    </span> */}
                  </span>
                  {/* <span className="badge bg-soft-primary text-primary mx-3">
                    {appointmentData?.status}
                  </span> */}
                  <span className={`
                    badge bg-soft-${appointmentData?.status == 'Upcoming' ? 'primary' : appointmentData?.status == 'Ongoing ' ? 'warning' : appointmentData?.status == 'Done' ? 'success' : 'danger'}
                    text-${appointmentData?.status == 'Upcoming' ? 'primary' : appointmentData?.status == 'Ongoing' ? 'warning' : appointmentData?.status == 'Done' ? 'success' : 'danger'} mx-3
                    `}>
                    {appointmentData?.status}
                  </span>
                </h4>
                <p>
                  Psychologist:
                  <b> {appointmentData?.psychologistName}</b>
                </p>

                <div className="d-flex align-items-center">
                  {/* <div className="filter-dropdown">
                    <a
                      className="btn btn-icon btn-light-brand dropdown-toggle"
                      data-bs-toggle="dropdown"
                      data-bs-offset="0, 10"
                    >
                      {" "}
                      CRM Dashboard{" "}
                    </a>
                    <div className="dropdown-menu wd-300">
                      <a href="#" className="dropdown-item">
                        <span> #01 - CRM Applications</span>
                        <span className="fs-12 fw-normal text-muted">
                          - G.Cute
                        </span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span> #02 - Admin Dashboard</span>
                        <span className="fs-12 fw-normal text-muted">
                          - A.Cantones
                        </span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span> #03 - Webapps Applications</span>
                        <span className="fs-12 fw-normal text-muted">
                          - M.Hanvey
                        </span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span> #04 - Dashboard Redesign</span>
                        <span className="fs-12 fw-normal text-muted">
                          - K.Hune
                        </span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <span> #05 - Applications Debugging</span>
                        <span className="fs-12 fw-normal text-muted">
                          {" "}
                          - V.Maton
                        </span>
                      </a>
                      <div className="dropdown-divider" />
                      <a href="#" className="dropdown-item">
                        <span> Explorer More Projects </span>
                      </a>
                    </div>
                  </div> */}
                  {/* <span className="vr mx-3 text-muted" /> */}
                  {/* <div className="img-group lh-0 ms-2 justify-content-start">
                    <ImageGroup data={imageList} avatarSize="avatar-md" />
                    <span className="d-none d-sm-flex">
                      <span className="fs-12 text-muted ms-3 text-truncate-1-line">
                        24+ members
                      </span>
                    </span>
                  </div> */}
                </div>
              </div>
              {/* <div className="filter-dropdown">
                <a
                  className="btn btn-icon btn-light-brand"
                  data-bs-toggle="dropdown"
                  data-bs-offset="0, 10"
                  data-bs-auto-close="outside"
                >
                  <i className="lh-1">
                    <FiMoreVertical />
                  </i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  {moreOptions.map(({ icon, label, type }, index) => {
                    if (type === "divider") {
                      return <li key={index} className="dropdown-divider"></li>;
                    }
                    return (
                      <li key={index}>
                        <a href="#" className="dropdown-item">
                          <i className="me-3">{getIcon(icon)}</i>
                          <span>{label}</span>
                        </a>
                      </li>
                    );
                  })}
                </div>
              </div> */}
              {/* <div className="mt-4 mt-md-0">
                <div className="d-flex gap-2">
                  <a
                    href="#"
                    className="btn btn-icon"
                    data-bs-toggle="tooltip"
                    title="Make as Complete"
                  >
                    <FiCheckCircle size={16} />
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon"
                    data-bs-toggle="tooltip"
                    title="Timesheets"
                  >
                    <FiCalendar size={16} />
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon"
                    data-bs-toggle="tooltip"
                    title="Statistics"
                  >
                    <FiBarChart2 size={16} />
                  </a>
                  <a
                    href="#"
                    className="btn btn-success"
                    data-bs-toggle="tooltip"
                    title="Timesheets"
                  >
                    <FiClock size={16} className="me-2" />
                    <span>Start Timer</span>
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card stretch stretch-full">
            {/* <div className="card-header">
              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between">
                  <a href="#" className="fs-12 fw-medium text-muted">
                    <span className="text-truncate-1-line">
                      Projects In Progress <FiLink2 className="fs-11 ms-1" />
                    </span>
                  </a>
                  <div className="ms-3">
                    <span className="fs-12 text-muted text-truncate-1-line">
                      16/25 Tasks Completed{" "}
                      <span className="fs-11 text-muted">(78%)</span>
                    </span>
                  </div>
                </div>
                <div className="progress mt-2 ht-5">
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>
            </div> */}
            <div className="card-body">
              <div className="row">
                <h5 className="fw-bold mb-0" style={{ paddingBottom: "1rem" }}>
                  Child Information:
                </h5>
                <br />
                <div className="col-md-6 mb-4">
                  <label className="form-label">Child Name</label>
                  <p>{appointmentData?.client.fullName}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Child Age</label>
                  <p>{appointmentData?.client.age} years old</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Date of Birth</label>
                  <p>{appointmentData?.client.dateOfBirth}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Nationality</label>
                  <p>{appointmentData?.client.nationality}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Gender</label>
                  <p>{appointmentData?.client.gender}</p>
                </div>
                <hr />
                <h5 className="fw-bold mb-0" style={{ paddingBottom: "1rem" }}>
                  Guardian Information:
                </h5>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Guardian Name</label>
                  <p>{appointmentData?.client.guardianName}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Guardian Nationality</label>
                  <p>{appointmentData?.client.guardianNationality}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Relationship With Child</label>
                  <p>{appointmentData?.client.guardianRelationship}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label">Contact Person:</label>
                  <ul>
                    <li>
                      <a href={`mailto:${appointmentData?.client.guardianEmail}`}>{appointmentData?.client.guardianEmail}</a>
                    </li>
                    <li>
                      <a href={`tel:${appointmentData?.client.guardianPhone}`}>{appointmentData?.client.guardianPhone}</a>
                    </li>
                  </ul>
                  {/* <p>
                    {appointmentData?.client.guardianName} ({appointmentData?.client.guardianRelationship}):{" "}
                    <a href={`tel:${appointmentData?.client.guardianPhone}`}>
                      {appointmentData?.client.guardianPhone}
                    </a>{" "}
                    /{" "}
                    <a href={`mailto:${appointmentData?.client.guardianEmail}`}>
                      {appointmentData?.client.guardianEmail}
                    </a>
                  </p> */}
                </div>
                {/* <hr /> */}
                {/* <div className="col-md-12">
                  <label className="form-label">Description</label>
                  <p>
                    Ini adalah kolom deskripsi
                  </p>
                  <p className="fw-semibold mt-4">
                    Isi kolom 1
                  </p>
                  <ul>
                    <li>
                     li 1
                    </li>
                    <li>
                      li 2
                    </li>
                    <li>
                      li 3
                    </li>
                  </ul>
                  <p className="mb-0">
                    lanjutan
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="row">
            <HourCard
              icon="feather-calendar"
              color="primary"
              title="Appointment Date"
              hours={appointmentData?.appointmentDate}
            />
            <HourCard
              icon="feather-clock"
              color="warning"
              title="Appointment Time"
              hours={appointmentData?.appointmentTime}
            />
          </div>
          <div className="row">
            <div className="col-xl-12 col-md-6">
              <div className="card stretch stretch-full">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="fw-semibold">{statusText}</div>
                    <i className={isOverdue ? "text-success" : "text-warning"}>
                      <FiCalendar size={16} />
                    </i>
                  </div>
                  <div className="progress mt-2 ht-3">
                    <div
                      className={`progress-bar ${
                        isOverdue
                          ? "bg-success"
                          : isOngoing
                          ? "bg-primary"
                          : "bg-warning"
                      }`}
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-xl-12 col-md-6">
              <div className="card stretch stretch-full">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="fw-semibold">25 / 25 Days Left</div>
                    <i className="text-success">
                      <FiCalendar size={16} />
                    </i>
                  </div>
                  <div className="progress mt-2 ht-3">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="card stretch stretch-full">
            <ReactApexChart
              options={chartOptions}
              series={chartOptions?.series}
              type="area"
              height={270}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TabAppointmentOverview;

const HourCard = ({
  icon,
  color,
  // textColorClass,
  title,
  hours,
  // totalBilled,
}) => {
  return (
    <div className="col-xxl-12 col-xl-12 col-sm-6">
      <div className="card stretch stretch-full">
        <div className="card-body">
          <div
            className={`avatar-text bg-soft-${color} text-${color} border-0 mb-3`}
          >
            {React.cloneElement(getIcon(icon), { size: "16" })}
          </div>
          <p>
            <span className={`fw-bold text-${color}`}>{title}:</span> {hours}
          </p>
        </div>
      </div>
    </div>
  );
};
