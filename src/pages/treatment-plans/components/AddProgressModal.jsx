import React, { useState } from 'react'
import TaskDateRange from '@/components/tasks/TaskDateRange'
import TaskStatus from '@/components/tasks/TaskStatus'
// import ReactQuill from 'react-quill';
import MultiSelectTags from '@/components/shared/MultiSelectTags'
import MultiSelectImg from '@/components/shared/MultiSelectImg'
import { taskAssigneeOptions, taskLabelsOptions, taskPriorityOptions, taskStatusOptions } from '@/utils/options'
import { FaX } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

const AddProgressModal = () => {
    const [rowsLength, setRowsLength] = useState(0)
    const [rows, setRows] = useState([{
        shortTermGoals: '', activity: '', progress: ''
    }])

    const { plan } = useSelector(state => state.treatmentPlans)

    const handleAddRow = () => {
        setRows([...rows, { shortTermGoals: '', activity: '', progress: '' }])
        setRowsLength(rows.length)
        console.log('ADDED ROW', rowsLength)
    }

    const handleDeleteRow = (indexToDelete) => {
        console.log('INDEXTODELETE', indexToDelete)
        if (rowsLength > 0) {
            const updatedRows = rows.filter((_, index) => index !== indexToDelete);
            setRows(updatedRows);
        }
    };

    const handleInputChange = (event, index) => {
        const updatedRows = [...rows];
        updatedRows[index][event.target.name] = event.target.value;
        setRows(updatedRows);
    };

    return (
        <div className="modal fade" id="addNewProgress" tabIndex="-1">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Progress</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-4">
                            <label htmlFor="taskName" className="form-label">Name</label>
                            <input type="text" id="taskName" className="form-control" placeholder="Task Name" />
                            <small className="text-muted">Tasks name for your todo</small>
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Note/Description</label>
                            <div className="editor task-add">
                                {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
                            </div>
                            <small className="text-muted">Note/Description max 200 charectars</small>
                        </div>
                        <TaskDateRange />
                        <div className='mb-4'></div>
                        <TaskStatus label={"Status:"} options={plan?.programs.map(program => ({
                            label: program?.treatmentType?.name,
                            value: program?.treatmentType?.id,
                        }))} defaultSelect="inprogress" />
                        <TaskStatus label={"Priority:"} options={taskPriorityOptions} defaultSelect="high" />

                        <div className="form-group mb-4">
                            <label className="form-label">Tags:</label>
                            <MultiSelectTags
                                defaultSelect={[taskLabelsOptions[2]]}
                                options={taskLabelsOptions}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label">Assignee:</label>
                            <MultiSelectImg
                                defaultSelect={[taskAssigneeOptions[1]]}
                                options={taskAssigneeOptions}
                            />
                        </div>

                        <div className='form-group mb-4'>
                            <div className="table-responsive">
                                <table className="table table-bordered overflow-hidden" id="tab_logic">
                                    <thead>
                                        <tr className="single-item">
                                            <th className="text-center">#</th>
                                            <th className="text-center wd-450">Short-term Goals</th>
                                            <th className="text-center wd-450">Activities</th>
                                            <th className="text-center wd-450">Progress</th>
                                            <th className="text-center wd-50">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map(({ id }, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td><input type="text" name="shortTermGoals" placeholder="Short-term Goals" className="form-control" value={rows[index]['shortTermGoals']}onChange={(e) => handleInputChange(e, index)}/></td>
                                                    <td><input type="text" name="activity" placeholder="Activity" className="form-control" value={rows[index]['activity']} onChange={(e) => handleInputChange(e, index)}/></td>
                                                    <td><input type="text" name="progress" placeholder="Progress" className="form-control" value={rows[index]['progress']} onChange={(e) => handleInputChange(e, index)}/></td>
                                                    <td className="text-center"><button onClick={() => handleDeleteRow(index)}><FaX/></button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-end gap-2 mt-3">
                                <button className="btn btn-sm bg-soft-danger text-danger" onClick={() => handleDeleteRow(rows.length-1)}>Delete</button>
                                <button className="btn btn-sm btn-primary" onClick={handleAddRow}>Add Items</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Add Progress</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProgressModal