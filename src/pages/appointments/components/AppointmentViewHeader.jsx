import React from 'react'
import { FiMoreVertical, FiPlus, FiShare2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import getIcon from '@/utils/getIcon'
import Dropdown from '@/components/shared/Dropdown'
import { LiaPencilAltSolid } from 'react-icons/lia'

const AppointmentViewHeader = ({ id }) => {
    return (
        // <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
        //     <div className="filter-dropdown">
        //         <a className="btn btn-icon btn-light-brand" data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
        //             <i className='lh-1'><FiMoreVertical /></i>
        //         </a>
        //         <div className="dropdown-menu dropdown-menu-end">
        //             {
        //                 moreOptions.map(({ icon, label, type }, index) => {
        //                     if (type === "divider") {
        //                         return <li key={index} className="dropdown-divider"></li>
        //                     }
        //                     return (
        //                         <li key={index}>
        //                             <a href="#" className="dropdown-item">
        //                                 <i className='me-3'>{getIcon(icon)}</i>
        //                                 <span>{label}</span>
        //                             </a>
        //                         </li>
        //                     )
        //                 })
        //             }
        //         </div>
        //     </div>
        //     {/* <Link to="/appointments/create" className="btn btn-primary">
        //         <FiPlus size={16} className='me-2' />
        //         <span>Create New Appointment</span>
        //     </Link> */}
        //     <div className="filter-dropdown">
        //         <ul className="dropdown-menu dropdown-menu-start">
        //             {
        //                 socialLinkOptions.map(({ icon, label, shareCount, type }, index) => {
        //                     if (type === "divider") {
        //                         return <li key={index} className="dropdown-divider"></li>
        //                     }
        //                     return (
        //                         <li key={index}>
        //                             <a href="#" className="dropdown-item">
        //                                 <i className='me-3'>{getIcon(icon)}</i>
        //                                 <span>{label}</span>
        //                                 <span className="fs-10 text-gray-500 ms-2">({shareCount})</span>
        //                             </a>
        //                         </li>
        //                     )
        //                 })
        //             }
        //         </ul>
        //     </div>
        // </div>
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <div className="filter-dropdown">
            </div>
            {/* <Dropdown
                dropdownItems={options}
                dropdownAutoClose={"outside"}
                triggerPosition={"0, 10"}
                triggerClass='btn btn-icon btn-light-brand'
                triggerIcon={<FiMoreHorizontal size={16} />}
            /> */}
            <a href={`/appointments/${id}/edit`} className="btn btn-primary">
                <LiaPencilAltSolid size={16} className='me-2' />
                <span>Edit Appointment</span>
            </a>
        </div>
    )
}

export default AppointmentViewHeader