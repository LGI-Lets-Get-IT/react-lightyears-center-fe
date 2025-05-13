import React from 'react'
import getIcon from '@/utils/getIcon';
import { Link } from 'react-router-dom';
import { PERMISSIONS } from '@/shared/permissionsConstant';

const leadsData = [
    { icon: "md-outline-event-available", title: "Appointments", count: "2", color: "primary", url: '/appointments', permission: PERMISSIONS.APPOINTMENTS.VIEW},
    { icon: "pi-notepencil-light", title: "Assessments", count: "4", color: "success", url: '/assessments', permission: PERMISSIONS.ASSESSMENTS.VIEW},
    { icon: "lu-school", title: "Schools", count: "1", color: "teal", url: '/schools', permissions: PERMISSIONS.ASSESSMENTS.CREATE },
    { icon: "tb-target-arrow", title: "Treatment Plans", count: "0", color: "primary", url: '/treatment-plans', permissions: PERMISSIONS.TREATMENT_PLANS.CREATE},
    { icon: "feather-user-minus", title: "Psychologists", count: "0", color: "danger", url: '/psychologists', permissions: PERMISSIONS.EMPLOYEES.CREATE },
    { icon: "lia-file-medical", title: "Therapists", count: "0", color: "danger", url: '/therapists', permissions: PERMISSIONS.EMPLOYEES.CREATE},
    { icon: "feather-users", title: "Clients", count: "0", color: "primary", url: '/clients', permission: PERMISSIONS.CLIENTS.CREATE },
];

const DashboardStatistics = () => {
    return (
        <>
            {leadsData.map(({ color, count, icon, title, url }, index) => (
                    <div key={index} className="col-xxl-3 col-md-6 customer-header-card">
                        <div className="card stretch stretch-full">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className={`avatar-text avatar-xl rounded text-${color} bg-soft-${color}`}>
                                            {React.cloneElement(getIcon(icon), { size: 17 })}
                                        </div>
                                        <Link to={url} className="fw-bold d-block">
                                            <span className="text-truncate-1-line">{title}</span>
                                            <span className="fs-24 fw-bolder d-block">{count}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default DashboardStatistics