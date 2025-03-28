import React, { Fragment } from 'react'
import CardHeader from '@/components/shared/CardHeader';
import useCardTitleActions from '@/hooks/useCardTitleActions';
import { FiArrowRight, FiClock, FiMessageSquare } from 'react-icons/fi';
import CardLoader from '@/components/shared/CardLoader';
import { useSelector } from 'react-redux';

const todos = [
    { time: '06:47', title: 'Create a new project for client', dueIn: 3, badgeColor: 'primary', badgeText: 'New' },
    { time: '02:50', title: 'Add files to new design folder', dueIn: 5, badgeColor: 'success', badgeText: 'New' },
    { time: '03:48', title: 'Shared 2 New Project Files', dueIn: 5, badgeColor: 'dark', badgeText: 'New' },
    { time: '04:35', title: 'Project status updated', dueIn: 4, badgeColor: 'danger', badgeText: 'New' },
    { time: '05:46', title: 'Project meeting with john', dueIn: 3, badgeColor: 'success', badgeText: 'New' },
    { time: '06:47', title: 'Create Duralux CRM Logo', dueIn: 2, badgeColor: 'warning', badgeText: 'New' },
];

const TabClientsAppointment = () => {
    const { currentClient } = useSelector(state => state.clients)

    return (
        <div className="col">
            <div className="card stretch stretch-full">
                <div className="card-body custom-card-action">
                    {currentClient && currentClient.appointments?.map(({ id, title, appointmentType, appointmentDate, appointmentTime }, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="d-flex align-items-center">
                                        <div className="me-4">
                                            <h6 className="fw-bold mb-0">{appointmentDate}</h6>
                                            <span className="fs-12 mb-0">{appointmentTime}</span>
                                        </div>
                                        <div className={`d-flex align-items-center justify-content-between border-3 border-start border-${todos[0].badgeColor} rounded w-100`}>
                                            <div className="mx-3">
                                                <a href={`/appointments/${id}`} className="fw-semibold mb-1 text-truncate-1-line">[{appointmentType}] {title}</a>
                                                <div className="fs-12 fw-normal text-muted text-truncate-1-line">{appointmentType}</div>
                                            </div>
                                            <a href="#" className={`badge bg-soft-${todos[0].badgeColor} text-${todos[0].badgeColor}`}>{appointmentType}</a>
                                        </div>
                                    </div>
                                    {todos.length - 1 === index ? "" : <hr className="border-dashed my-3" />}
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default TabClientsAppointment;

