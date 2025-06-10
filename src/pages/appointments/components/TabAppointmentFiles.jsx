import React, { useEffect, useRef, useState } from 'react'
import Pagination from '@/components/shared/Pagination'
import HorizontalProgress from '@/components/shared/HorizontalProgress'
import { projectsData } from '@/utils/data/projectsData'
import { FiBell, FiGlobe, FiPrinter, FiUpload, FiX } from 'react-icons/fi'
import { PiFilePdf } from 'react-icons/pi'
import ProjectFilteTable from '@/components/storage/ProjectFilteTable'
import RecentFileCard from '@/components/storage/RecentFileCard'
import { storageFolderData } from '@/utils/data/storageData'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFiles, uploadFile } from '@/store/slice/fileSlice'
import LeadsEmptyCard from '@/components/leadsViewCreate/LeadsEmptyCard'
import { LiaPencilAltSolid } from 'react-icons/lia'

const TabAppointmentFiles = () => {
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)
    const { currentAppointment } = useSelector((state) => state.appointments)
    const { files, isLoading: fetchLoading } = useSelector(state => state.files)
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFileName(file.name);
            setSelectedFile(file)
        }
    }

    const handleUploadFile = () => {
        dispatch(uploadFile({
            uuid: currentAppointment?.client?.uuid,
            clientName: currentAppointment?.client?.fullName.replaceAll(' ', ''),
            file: selectedFile,
        }))
        .unwrap()
        .then(() => {
            setUploadedFileName(null);
            setSelectedFile(null)
        })
        .catch((err) => console.error('Error ', err))
    }

    const handleDelete = () => {
        if (selectedFile) {
            setUploadedFileName(null)
            setSelectedFile(null)
        }
    }

    useEffect(() => {
        if (currentAppointment) {
            dispatch(fetchAllFiles({
                params: {
                    uuid: currentAppointment?.client?.uuid,
                    clientName: currentAppointment?.client?.fullName.replaceAll(' ', '')
                }
            }))
        }
    }, [currentAppointment])
    return (
        // <div className="tab-pane fade active show" id="filesTab">
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

            {files && files.length > 0 ? (
                <div className="project-section">
                    <div className='d-flex flex-row mb-4'>
                        {uploadedFileName ? (
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary btn-sm">
                                    <span>{uploadedFileName}</span>
                                </button>
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    <span><FiX size={16} className="me-2" /></span>
                                    <strong>Delete</strong>
                                </button>
                                <button className="btn btn-success" onClick={handleUploadFile}>
                                    <span><FiUpload size={16} className="me-2" /></span>
                                    <strong>Upload</strong>
                                </button>
                            </div>
                        ) : (
                            <button className="btn btn-primary" onClick={handleUploadClick}>
                                <FiUpload size={16} className='me-2' />
                                <span>Upload File</span>
                            </button>
                        )}
                        {/* {uploadedFileName && (
                            <div className="text-center">
                                <div className="mb-2">
                                    <span className="text-muted">Selected file: </span>
                                    <strong>{uploadedFileName}</strong>
                                </div>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={handleUploadFile}
                                >
                                    Submit Upload
                                </button>
                            </div>
                        )} */}
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                    </div>
                    <ProjectFilteTable files={files} />
                </div>
            ) : (
                <>
                    <LeadsEmptyCard title={'No files yet!'} description={'There are no files in this appointment'} onClick={handleUploadClick}>
                        {uploadedFileName && (
                            <div className="text-center mt-3 d-flex flex-column align-items-center justify-content-center">
                                <div className="mb-2">
                                    <span className="text-muted">Selected file: </span>
                                    <strong>{uploadedFileName}</strong>
                                </div>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={handleUploadFile}
                                >
                                    Submit Upload
                                </button>
                            </div>
                        )}
                    </LeadsEmptyCard>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                </>
            )
            }
        </div >
        // </div>
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