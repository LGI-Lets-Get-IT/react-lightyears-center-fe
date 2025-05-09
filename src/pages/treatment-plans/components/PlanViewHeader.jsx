import React from 'react'
import { FiMoreVertical} from 'react-icons/fi'
import getIcon from '@/utils/getIcon'

const moreOptions = [
    { label: "Pin Project", icon: "feather-map-pin" },
    { label: "Edit Project", icon: "feather-edit" },
    { label: "Copy Project", icon: "feather-copy" },
    { type: "divider" },
    { label: "Make as Hold", icon: "feather-pause" },
    { label: "Make as Started", icon: "feather-star" },
    { label: "Make as Finished", icon: "feather-check-circle" },
    { label: "Make as Cancelled", icon: "feather-delete" },
    { type: "divider" },
    { label: "Export Project", icon: "feather-cast" },
    { label: "Project View", icon: "feather-eye" },
    { type: "divider" },
    { label: "Delete Project", icon: "feather-trash-2" },
]
const PlanViewHeader = () => {
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <div className="filter-dropdown">
                <a className="btn btn-icon btn-light-brand" data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside">
                    <i className='lh-1'><FiMoreVertical /></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                    {
                        moreOptions.map(({ icon, label, type }, index) => {
                            if (type === "divider") {
                                return <li key={index} className="dropdown-divider"></li>
                            }
                            return (
                                <li key={index}>
                                    <a href="#" className="dropdown-item">
                                        <i className='me-3'>{getIcon(icon)}</i>
                                        <span>{label}</span>
                                    </a>
                                </li>
                            )
                        })
                    }
                </div>
            </div>
            {/* <Link to="/appointments/create" className="btn btn-primary">
                <FiPlus size={16} className='me-2' />
                <span>Create New Appointment</span>
            </Link> */}
        </div>


    )
}

export default PlanViewHeader