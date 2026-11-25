import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      {hasPermission(PERMISSIONS.APPOINTMENTS.VIEW) && (
        <div className="card card-body">
            <div className="custom-card-action p-0 w-full overflow-x-auto dashboard-appointment-calendar">
                <FullCalendar
                  height={'auto'}
                  plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
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
                    right: 'timeGridWeek,dayGridMonth'
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
      )}
    </>
  );
};

export default AppointmentCalendar;