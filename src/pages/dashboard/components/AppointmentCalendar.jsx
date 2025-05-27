import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import { crmStatisticsData } from "@/utils/data/crmStatisticsData";
// import getIcon from "@/utils/getIcon";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "@/store/slice/appointmentSlice";
import { format } from "date-fns";
import { PERMISSIONS } from "../../../shared/permissionsConstant";
import useFilterByPermission from "@/hooks/useFilterByPermission";

const AppointmentCalendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments)
  const { hasPermission } = useFilterByPermission();

  useEffect(() => {
    dispatch(fetchAllAppointments())
  }, [])
  return (
    <>
      {/* {crmStatisticsData.map(
        ({
          id,
          completed_number,
          progress,
          progress_info,
          title,
          total_number,
          icon,
        }) => (
          <div key={id} className="col-xxl-3 col-md-6">
            <div className="card stretch stretch-full short-info-card">
              <div className="card-body">
                <div className="d-flex align-items-start justify-content-between mb-4">
                  <div className="d-flex gap-4 align-items-center">
                    <div className="avatar-text avatar-lg bg-gray-200 icon">
                      {React.cloneElement(getIcon(icon), { size: "16" })}
                    </div>
                    <div>
                      <div className="fs-4 fw-bold text-dark">
                        <span className="counter">
                          {completed_number ? completed_number + "/" : ""}
                        </span>
                        <span className="counter">{total_number}</span>
                      </div>
                      <h3 className="fs-13 fw-semibold text-truncate-1-line">
                        {title}
                      </h3>
                    </div>
                  </div>
                  <Link to="#" className="lh-1">
                    <FiMoreVertical className="fs-16" />
                  </Link>
                </div>
                <div className="pt-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <Link
                      to="#"
                      className="fs-12 fw-medium text-muted text-truncate-1-line"
                    >
                      {title}
                    </Link>
                    <div className="w-100 text-end">
                      <span className="fs-12 text-dark">{progress_info}</span>{" "}
                      <span className="fs-11 text-muted">({progress})</span>
                    </div>
                  </div>
                  <div className="progress mt-2 ht-3">
                    <div
                      className={`progress-bar progress-${id}`}
                      role="progressbar"
                      style={{ width: progress }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )} */}
      
      {hasPermission(PERMISSIONS.APPOINTMENTS.VIEW) &&
              <div className="card">
                <div className="card-body">
                  <div className="card-body custom-card-action p-0">
                    <FullCalendar
                      height={'auto'}
                      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                      initialView="timeGridWeek"
                      eventDisplay="auto"
                      firstDay={1}
                      hiddenDays={[7]}
                      eventMaxStack={1}
                      slotMinTime={"08:00:00"}
                      eventClick={(info) => navigate(`/appointments/${info.event.id}`)}
                      eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: false,
                      }}
                      eventBackgroundColor="red"
                      headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'timeGridDay,timeGridWeek,dayGridMonth'
                      }}
                      events={appointments.map(item => ({
                        id: item.id,
                        title: item.title,
                        start: `${format(item.appointmentDate, 'yyyy-MM-dd')} ${item.appointmentTime.split(' - ')[0]}`,
                        end: `${format(item.appointmentDate, 'yyyy-MM-dd')} ${item.appointmentTime.split(' - ')[1]}`,
                      }))}
                  />
              </div>
          </div>
      </div>}
    </>
  );
};


export default AppointmentCalendar;

const Card = ({ title, price, progress, bg_color }) => {
  return (
      <div className="col-lg-3">
          <div className="p-3 border border-dashed rounded">
              <div className="fs-12 text-muted mb-1">{title}</div>
              <h6 className="fw-bold text-dark">{price}</h6>
              <div className="progress mt-2 ht-3">
                  <div className={`progress-bar ${bg_color}`} role="progressbar" style={{ width: progress }}></div>
              </div>
          </div>
      </div>
  )
}