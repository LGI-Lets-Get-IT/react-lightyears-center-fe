import React from 'react'
import getIcon from '@/utils/getIcon';

const leadsData = [
    { icon: "md-outline-event-available", title: "Appointments", count: "26,595", color: "primary" },
    { icon: "pi-notepencil-light", title: "Assessments", count: "2,245", color: "success" },
    { icon: "lu-school", title: "Schools", count: "1,254", color: "teal" },
    { icon: "tb-target-arrow", title: "Treatment Plans", count: "4,586", color: "primary" },
    { icon: "feather-user-minus", title: "Psychologists", count: "4,586", color: "danger" },
    { icon: "lia-file-medical", title: "Therapists", count: "4,586", color: "danger" },
    { icon: "feather-users", title: "Clients", count: "4,586", color: "primary" },
];

const DashboardStatistics = () => {
    return (
        <>
            {leadsData.map(({ color, count, icon, title }, index) => (
                    <div key={index} className="col-xxl-3 col-md-6 customer-header-card">
                        <div className="card stretch stretch-full">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className={`avatar-text avatar-xl rounded text-${color} bg-soft-${color}`}>
                                            {React.cloneElement(getIcon(icon), { size: 17 })}
                                        </div>
                                        <a href="#" className="fw-bold d-block">
                                            <span className="text-truncate-1-line">{title}</span>
                                            <span className="fs-24 fw-bolder d-block">{count}</span>
                                        </a>
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