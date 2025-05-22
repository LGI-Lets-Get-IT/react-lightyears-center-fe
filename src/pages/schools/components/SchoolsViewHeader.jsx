import React from 'react'
import { FiMoreHorizontal, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown'
import { LiaPencilAltSolid } from 'react-icons/lia'

const options = [
    // { label: 'Active/Inactive School', icon: <FiPauseCircle /> },
    // { type: 'divider' },
    // { label: 'Edit School', icon: <FiEdit /> },
    { label: 'Delete School', icon: <FiTrash2 /> },
]

const SchoolsViewHeader = ({ id }) => {
    return (
        <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <div className="filter-dropdown">
            </div>
            <Dropdown
                dropdownItems={options}
                dropdownAutoClose={"outside"}
                triggerPosition={"0, 10"}
                triggerClass='btn btn-icon btn-light-brand'
                triggerIcon={<FiMoreHorizontal size={16} />}
            />
            <a href={`/schools/${id}/edit`} className="btn btn-primary">
                <LiaPencilAltSolid size={16} className='me-2' />
                <span>Edit School</span>
            </a>
        </div>
    )
}

export default SchoolsViewHeader