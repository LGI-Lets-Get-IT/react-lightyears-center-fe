import React, { useEffect, useState } from 'react'
import Pagination from '@/components/shared/Pagination'
import HorizontalProgress from '@/components/shared/HorizontalProgress'
import { projectsData } from '@/utils/data/projectsData'
import { FiBell, FiGlobe, FiPrinter } from 'react-icons/fi'
import { PiFilePdf } from 'react-icons/pi'
import ProjectFilteTable from '@/components/storage/ProjectFilteTable'
import RecentFileCard from '@/components/storage/RecentFileCard'
import { storageFolderData } from '@/utils/data/storageData'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFiles } from '@/store/slice/fileSlice'

const TabAppointmentFiles = () => {
    const dispatch = useDispatch()
        const [fileData, setFileData] = useState(storageFolderData(0, 4))
        const { currentAppointment } = useSelector((state) => state.appointments)

    useEffect(() => {
        if (currentAppointment) {
            dispatch(fetchAllFiles({params: {
                appointmentId: currentAppointment?.id,
                uuid: currentAppointment?.client?.uuid,
                clientName: currentAppointment?.client?.fullName.replaceAll(' ', '')
            }}))
        }
    }, [currentAppointment])
    return (
        <div className="tab-pane fade active show" id="filesTab">
            <div className='content-area-body'>
                {/* <div className="recent-section mb-5">
                    <SectionTitle
                        sectionName={"Recent Files"}
                        sectionDescription={"Recent access files (Last access 24 min ago)"}
                    />
                    <div className="row">
                        {
                            files.map(({ id, mimeType, name}) => (
                                <RecentFileCard
                                    key={id}
                                    // imgSrc={iconSrc}
                                    title={name}
                                    projectLink="Project"
                                    dashboardLink="Dashboard"
                                    category="Webapps"
                                    id={id}
                                />
                            ))
                        }
                    </div>
                </div> */}

                <div className="project-section">
                        {/* <SectionTitle
                            sectionName={"Project Files"}
                            sectionDescription={"Recent project files (Last access 24 min ago)"}
                        /> */}
                    <ProjectFilteTable />
                </div>
            </div>
        </div>
    )
}

export default TabAppointmentFiles;

const SectionTitle = ({ sectionName, sectionDescription }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="me-4">
                <h2 className="fs-16 fw-bold mb-1">{sectionName}</h2>
                <div className="fs-12 text-muted text-truncate-1-line">{sectionDescription}</div>
            </div>
            <a href="#" className="btn btn-sm btn-light-brand">View More</a>
        </div>
    )
}