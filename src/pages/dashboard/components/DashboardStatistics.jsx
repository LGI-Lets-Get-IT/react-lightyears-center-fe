import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import getIcon from '@/utils/getIcon';
import { Link } from 'react-router-dom';
import { PERMISSIONS } from '@/shared/permissionsConstant';
import useFilterByPermission from '@/hooks/useFilterByPermission';
import { fetchDashboardData } from '@/store/slice/dashboardSlice';

const leadsData = [
    { icon: "md-outline-event-available", title: "Appointments", count: "2", color: "primary", url: '/appointments', permission: PERMISSIONS.APPOINTMENTS.VIEW },
    { icon: "pi-notepencil-light", title: "Assessments", count: "4", color: "success", url: '/assessments', permission: PERMISSIONS.ASSESSMENTS.VIEW },
    { icon: "lu-school", title: "Schools", count: "1", color: "teal", url: '/schools', permissions: PERMISSIONS.ASSESSMENTS.CREATE },
    { icon: "tb-target-arrow", title: "Treatment Plans", count: "0", color: "primary", url: '/treatment-plans', permissions: PERMISSIONS.TREATMENT_PLANS.CREATE },
    { icon: "lia-file-medical", title: "Employees", count: "0", color: "danger", url: '/employees', permissions: PERMISSIONS.EMPLOYEES.CREATE },
    { icon: "feather-users", title: "Clients", count: "0", color: "primary", url: '/clients', permission: PERMISSIONS.CLIENTS.CREATE },
];

const DashboardStatistics = () => {
    const dispatch = useDispatch();
    const { hasPermission } = useFilterByPermission()
    const { dashboardData } = useSelector(state => state.dashboard)

    const getDatas = () => [
        { icon: "md-outline-event-available", title: "Appointments", count: dashboardData.totalAppointments, color: "primary", url: '/appointments', permissions: PERMISSIONS.APPOINTMENTS.VIEW },
        { icon: "pi-notepencil-light", title: "Assessments", count: dashboardData.totalAssessments, color: "success", url: '/assessments', permissions: PERMISSIONS.ASSESSMENTS.VIEW },
        { icon: "lu-school", title: "Schools", count: dashboardData.totalSchools, color: "teal", url: '/schools', permissions: PERMISSIONS.SCHOOLS.VIEW },
        { icon: "tb-target-arrow", title: "Treatment Plans", count: dashboardData.totalPlans, color: "primary", url: '/treatment-plans', permissions: PERMISSIONS.TREATMENT_PLANS.VIEW },
        { icon: "lia-file-medical", title: "Employees", count: dashboardData.totalEmployees, color: "danger", url: '/employees', permissions: PERMISSIONS.EMPLOYEES.VIEW },
        { icon: "feather-users", title: "Clients", count: dashboardData.totalClients, color: "primary", url: '/clients', permissions: PERMISSIONS.CLIENTS.VIEW },
    ]

    useEffect(() => {
        dispatch(fetchDashboardData())
    }, [])
    return (
        <>
            {getDatas().map(({ icon, title, count, color, url, permissions }, index) => (
                hasPermission(permissions) && (
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
                )
            ))
            }
        </>
    )
}

export default DashboardStatistics