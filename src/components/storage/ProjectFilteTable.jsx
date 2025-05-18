import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiScissors, FiShare2, FiX } from 'react-icons/fi'
import ImageGroup from '@/components/shared/ImageGroup'
import Dropdown from '@/components/shared/Dropdown'
import Pagination from '@/components/shared/Pagination'
import { storageProjectData } from '@/utils/data/storageData'
import { confirmDelete } from '@/utils/confirmDelete'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

const ProjectFilteTable = ({ files }) => {
    const [data, setData] = useState(storageProjectData)

    const handleDelete = (label, id) => {
        if (label === "Delete") {
            confirmDelete(id).then((result) => {
                if (result.confirmed) {
                    setData(data.filter((data) => data.id !== result.id));
                }
            })
        }
    };
    return (
        <div className="card mb-0">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">File Name</th>
                                <th scope="col">File Size</th>
                                <th scope="col">Created At</th>
                                {/* <th scope="col">Members</th> */}
                                <th scope="col" className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files && files.length > 0 ? files.map(({ id, mimeType, name, webViewLink, size, createdTime }) => {
                                const icon = mimeType == 'application/pdf' ? '/images/file-icons/pdf.png' : 'application/png' ? '/images/file-icons/png.png' : '';
                                return (
                                    <TableRow
                                        key={id}
                                        fileSIze={size / 100000}
                                        iconSrc={icon}
                                        // members={members}
                                        link={webViewLink}
                                        title={name}
                                        uploadDate={format(createdTime, 'dd-MM-yyyy hh:mm')}
                                        id={id}
                                        handleDelete={handleDelete}
                                    />
                                )
                            }) : <tr className='text-center'><td colSpan={4}>No files found</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='card-footer'>
                <Pagination />
            </div>
        </div>
    )
}

export default ProjectFilteTable

const TableRow = ({ link, fileSIze, iconSrc, title, uploadDate, members, handleDelete, id }) => {
    return (
        <tr>
            <td>
                <div className="d-flex align-items-center gap-3">
                    <img src={iconSrc} className="img-fluid rounded wd-30" alt="" />
                    <Link to={link}>{title}</Link>
                </div>
            </td>
            <td>{fileSIze} MB</td>
            <td>{uploadDate}</td>
            {/* <td>
                <div className="img-group lh-lg">
                    <ImageGroup data={members.user_list} avatarStyle={"avatar-sm bg-soft-primary"} />
                    <div>
                        <span className="text-muted fs-12 ms-2">{members.total_user}</span>
                    </div>
                </div>
            </td> */}
            <td>
                <Dropdown dropdownItems={tableActons} dropdownParentStyle={"hstack text-end justify-content-end"} id={id} onClick={handleDelete} />
            </td>
        </tr>
    )
}

const tableActons = [
    { label: "Open", icon: <FiEye /> },
    // { label: "Share", icon: <FiShare2 /> },
    // { type: "divider" },
    // { label: "Backup", icon: <FiScissors /> },
    { label: "Delete", icon: <FiX />, },
];
