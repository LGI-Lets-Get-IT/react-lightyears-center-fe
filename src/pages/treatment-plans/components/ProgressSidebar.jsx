import React from 'react'
import PerfectScrollbar from "react-perfect-scrollbar";
import { FiActivity, FiCheckCircle, FiHash, FiList, FiPlus, FiWatch, FiX } from 'react-icons/fi'
import api from '@/lib/axios';

const ProgressSidebar = () => {

    const downloadPdf = async () => {
        const response = await api.post('/files/reports/treatment-plan/generate', {}, { responseType: 'blob'})
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'asd.pdf'; // Set your desired filename here
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }

    return (
        <div className="content-sidebar content-sidebar-md">
            <PerfectScrollbar>
                <div className="content-sidebar-header bg-white sticky-top hstack justify-content-between">
                    <h4 className="fw-bolder mb-0">Progress</h4>
                </div>
                <button onClick={downloadPdf}>Download PDF</button>
                <div className="content-sidebar-header">
                    <a href="#" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addNewProgress">
                        <FiPlus size={17} className='me-2' />
                        <span>Add Progress</span>
                    </a>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default ProgressSidebar