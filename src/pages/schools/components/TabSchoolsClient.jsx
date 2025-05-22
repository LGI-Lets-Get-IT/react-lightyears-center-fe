import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiEye } from 'react-icons/fi'
import Pagination from '@/components/shared/Pagination'
import { useSelector } from 'react-redux'

const TabSchoolClient = () => {
    // const dispatch = useDispatch()
    const { school } = useSelector((state) => state.schools)

    // useEffect(() => {
    //     dispatch(fetchSchoolClientsById(1))
    // }, [])
    return (
        <div className="col">
            <div className="card stretch stretch-full">
                {/* <CardHeader title={title} refresh={handleRefresh} remove={handleDelete} expanded={handleExpand} /> */}

                <div className="card-body custom-card-action p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr className="border-b">
                                    <th scope="row">Children Name</th>
                                    <th>Guardian Name</th>
                                    <th>Guardian Email</th>
                                    <th>Guardian Phone</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {school?.clients && school.clients.map(({ uuid, fullName, guardianName, guardianEmail, guardianPhone }) => (
                                    // userList(0, 5).map(({ date, id, proposal, user_email, user_img, user_name, user_status, color }) => (
                                    <tr key={uuid} className='chat-single-item'>
                                        <td>
                                            <a href={`/clients/${uuid}`} className='text-wrap'>{fullName}</a>
                                            {/* <div className="d-flex align-items-center gap-3">
                                                    <a href={`/clients/${uuid}`}>
                                                        <span className="d-block">{fullName}</span>
                                                        <span className="fs-12 d-block fw-normal text-muted">{user_email}</span>
                                                    </a>
                                                </div> */}
                                        </td>
                                        <td>
                                            <a>{guardianName}</a>
                                        </td>
                                        <td>
                                            <a href={`mailto:${guardianEmail}`}>{guardianEmail}</a>
                                        </td>
                                        <td>
                                            <a href={`tel:${guardianPhone}`}>{guardianPhone}</a>
                                        </td>
                                        <td className="text-end">
                                            <div className="hstack gap-2 justify-content-end">
                                                <Link
                                                    to={`/clients/${uuid}`}
                                                    className="avatar-text avatar-md"
                                                >
                                                    <FiEye />
                                                </Link>
                                                {/* <Dropdown
                                                        dropdownItems={getActions(row.original.uuid)}
                                                        triggerClass="avatar-md"
                                                        triggerPosition={"0,21"}
                                                        triggerIcon={<FiMoreHorizontal />}
                                                    /> */}
                                            </div>
                                            {/* <Link to="#"><FiMoreVertical size={16} /></Link> */}
                                        </td>
                                    </tr>
                                )
                                )
                                    // )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer">
                    <Pagination />
                </div>
                {/* <CardLoader refreshKey={refreshKey} /> */}
            </div>
        </div>
    )
}

export default TabSchoolClient
