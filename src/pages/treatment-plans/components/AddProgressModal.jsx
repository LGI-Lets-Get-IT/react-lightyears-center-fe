import React, { useEffect, useState } from 'react'
import TaskDateRange from '@/components/tasks/TaskDateRange'
import TaskStatus from '@/components/tasks/TaskStatus'
// import ReactQuill from 'react-quill';
import MultiSelectTags from '@/components/shared/MultiSelectTags'
import MultiSelectImg from '@/components/shared/MultiSelectImg'
import { taskAssigneeOptions, taskLabelsOptions, taskPriorityOptions, taskStatusOptions } from '@/utils/options'
import { useDispatch, useSelector } from 'react-redux'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { createSession } from '@/store/slice/treatmentSessionSlice'
import { FiX } from 'react-icons/fi'
import { treatmentSessionSchema } from '@/schemas/treatmentSessionSchema'

const AddProgressModal = ({ setOpenModal }) => {
    const dispatch = useDispatch();
    const { plan } = useSelector(state => state.treatmentPlans)
    const [selectedProgram, setSelectedProgram] = useState(null)
    const [errors, setErrors] = useState(false);
    const [sessionData, setSessionData] = useState([{
        shortTermGoals: '', activity: '', progress: ''
    }])

    const handleAddRow = () => {
        setSessionData([...sessionData, { shortTermGoals: '', activity: '', progress: '' }])
    }

    const handleDeleteRow = (indexToDelete) => {
        if(sessionData.length === 1) return;

        const updatedData = sessionData.filter((_, index) => index !== indexToDelete);
        setSessionData(updatedData);
    };

    const handleInputChange = async (event, index) => {
        const updatedProgress = [...sessionData];
        updatedProgress[index][event.target.name] = event.target.value;
        setSessionData(updatedProgress);
      
        try {
        await treatmentSessionSchema.fields.sessions.validate(sessionData, { abortEarly: false }); // Validate the session data
        setErrors(false); // Clear any previous errors
        } catch (error) {
            const newError = error.inner.reduce((acc, error) => {
                const path = error.path.split('.');
                const index = path[0].replace('[', '').replace(']', ''); // Remove [] from the index
                const field = path[1];
          
                // Initialize error object for that index if not already present
                if (!acc[index]) acc[index] = {};
                acc[index][field] = error.message;
          
                return acc;
              }, {});

            setErrors(newError)
        }
            
    };

    const handleAddProgress = async () => {
        const dataToValidate = {
            planId: plan.id,
            clientId: plan.clientId,
            programId: selectedProgram,
            sessions: sessionData,
        }
        console.log('DATATOVALIDATE', dataToValidate)
        try {
            await treatmentSessionSchema.validate(dataToValidate, { abortEarly: false })
            setErrors(false) 
            dispatch(createSession(dataToValidate))
            .unwrap()
            .then(() => setOpenModal(false))
            .catch((error) => {
                return
            })
        } catch (error) {
            const newError = {}
            error.inner.forEach((err) => {
                const path = err.path.split('.');
                console.log('PATH', path)
                if (path[0].startsWith('sessions[')) {
                  // If the path is related to sessions array (sessions[index].field)
                  const index = path[0].replace('sessions[', '').replace(']', ''); // Remove 'sessions[' and ']'
                  const field = path[1]; // The field name (e.g., shortTermGoals, activity, etc.)
                  
                  // Initialize the error object for that index if it doesn't exist
                  if (!newError[index]) newError[index] = {};
                  newError[index][field] = err.message;
                } else {
                  // Handle single field errors (e.g., programId)
                  newError[err.path] = err.message;
                }
            });
            setErrors(newError)
        }
    }

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        {/* // <div className="modal fade" id="addNewProgress" tabIndex="-1"> */}
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Progress</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setOpenModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        {/* <div className="mb-4">
                            <label htmlFor="taskName" className="form-label">Name</label>
                            <input type="text" id="taskName" className="form-control" placeholder="Task Name" />
                            <small className="text-muted">Tasks name for your todo</small>
                        </div> */}
                        {/* <div className="mb-4">
                            <label className="form-label">Note/Description</label>
                            <div className="editor task-add">
                                <ReactQuill theme="snow" value={value} onChange={setValue} />
                            </div>
                            <small className="text-muted">Note/Description max 200 charectars</small>
                        </div> */}
                        {/* <TaskDateRange /> */}
                        {/* <div className='mb-4'></div>
                        <TaskStatus label={"Status:"} options={plan?.programs.map(program => ({
                            label: program?.treatmentType?.name,
                            value: program?.treatmentType?.id,
                        }))} defaultSelect="inprogress" />
                        <TaskStatus label={"Priority:"} options={taskPriorityOptions} defaultSelect="high" /> */}

                        {/* <div className="form-group mb-4">
                            <label className="form-label">Tags:</label>
                            <MultiSelectTags
                                defaultSelect={[taskLabelsOptions[2]]}
                                options={taskLabelsOptions}
                            />
                        </div> */}

                        {/* <div className="form-group mb-4">
                            <label className="form-label">Assignee:</label>
                            <MultiSelectImg
                                defaultSelect={[taskAssigneeOptions[1]]}
                                options={taskAssigneeOptions}
                            />
                        </div> */}

                        <div className="form-group mb-4">
                            <label className="form-label">Appointment</label>
                            <SelectDropdown
                                options={plan?.programs.map(program => ({
                                    label: program?.treatmentName,
                                    value: program?.id,
                                }))}
                                selectedOption={selectedProgram}
                                placeholder={"Select Appointment"}
                                onSelectOption={(option) => {
                                  setSelectedProgram(option.value);
                                }}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label">Treatment</label>
                            <SelectDropdown
                                options={plan?.programs.map(program => ({
                                    label: program?.treatmentName,
                                    value: program?.id,
                                }))}
                                selectedOption={selectedProgram}
                                placeholder={"Select Program"}
                                onSelectOption={(option) => {
                                  setSelectedProgram(option.value);
                                }}
                            />
                            {errors && errors.programId && (
                                <div className="text-danger mt-2">
                                    {errors.programId}
                                </div>
                            )}
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
                                        {sessionData.map(({ id }, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td><input type="text" name="shortTermGoals" placeholder="Short-term Goals" className={`form-control  ${errors[index]?.shortTermGoals ? "is-invalid" : ""}`} value={sessionData[index]['shortTermGoals']}onChange={(e) => handleInputChange(e, index)}/></td>
                                                    <td><input type="text" name="activity" placeholder="Activity" className={`form-control  ${errors[index]?.activity ? "is-invalid" : ""}`} value={sessionData[index]['activity']} onChange={(e) => handleInputChange(e, index)}/></td>
                                                    <td><input type="text" name="progress" placeholder="Progress" className={`form-control  ${errors[index]?.progress ? "is-invalid" : ""}`} value={sessionData[index]['progress']} onChange={(e) => handleInputChange(e, index)}/></td>
                                                    <td className="text-center">
                                                        <button type="button" className="btn btn-light-brand" onClick={() => handleDeleteRow(index)}>
                                                            <FiX size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-end gap-2 mt-3">
                                <button className="btn btn-sm bg-soft-danger text-danger" onClick={() => handleDeleteRow(sessionData.length-1)}>Delete</button>
                                <button className="btn btn-sm btn-primary" onClick={handleAddRow}>Add Items</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setOpenModal(false)} >Discard</button>
                        <button type="button" className="btn btn-primary" onClick={handleAddProgress}>Add Progress</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProgressModal