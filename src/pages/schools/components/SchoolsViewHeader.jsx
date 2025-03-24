import React from 'react'
import { FiEdit, FiMoreHorizontal, FiPause, FiPauseCircle, FiPlus, FiTrash, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown'
import { Link } from 'react-router-dom'

const options = [
    { label: 'Active/Inactive School', icon: <FiPauseCircle/> },
    { type: 'divider' },
    { label: 'Edit School', icon: <FiEdit /> },
    { label: 'Delete School', icon: <FiTrash2 /> },
]

const SchoolsViewHeader = () => {
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
            <a href="/schools/create" className="btn btn-primary">
                <FiPlus size={16} className='me-2' />
                <span>Create New School</span>
            </a>
        </div>
    )
}

export default SchoolsViewHeader