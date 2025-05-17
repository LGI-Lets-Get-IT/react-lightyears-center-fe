import React, { useState } from 'react'
import PerfectScrollbar from "react-perfect-scrollbar";
import { FiActivity, FiCheckCircle, FiHash, FiList, FiPlus, FiWatch, FiX } from 'react-icons/fi'
import AddProgressModal from './AddProgressModal';

const ProgressSidebar = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <div className="content-sidebar content-sidebar-md">
                <PerfectScrollbar>
                    <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                        <h4 className="fw-bolder mb-0">Progress</h4>
                    </div>
                    <div className="content-sidebar-header">
                        {/* <a href="#" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addNewProgress"> */}
                        <a href="#" className="btn btn-primary w-100" onClick={() => setOpenModal(true)} >
                            <FiPlus size={17} className='me-2' />
                            <span>Add Progress</span>
                        </a>
                    </div>
                </PerfectScrollbar>
            </div>
            {openModal && <>
                <AddProgressModal setOpenModal={setOpenModal} />
                <div className="modal-backdrop fade show" />
            </>
            }
        </>
    )
}

export default ProgressSidebar