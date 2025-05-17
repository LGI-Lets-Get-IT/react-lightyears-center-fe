import { fetchAssessmentByAppointmentId } from "@/store/slice/assessmentSlice";
import { format } from "date-fns";
import { useEffect } from "react";
import { BsCircleFill } from "react-icons/bs";
import { FiStar, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const TabAppointmentResult = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const { assessments } = useSelector(state => state.assessments)

    useEffect(() => {
        dispatch(fetchAssessmentByAppointmentId({
            params: {
                appointmentId: id,
            }
        }))
    }, [])
    return (
        <div className="content-area">

            <div className="content-area-body pb-0">
                <div className="row note-has-grid" id="note-full-container">
                    {
                        assessments?.map(({ id, testName, assessmentDate, assessedBy, result }) => (
                            <NoteCard
                                key={id}
                                id={id}
                                testName={testName}
                                assessedBy={assessedBy}
                                assessmentDate={assessmentDate}
                                result={result}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TabAppointmentResult;

const NoteCard = ({ id, testName, assessedBy, assessmentDate, result }) => {

    return (
        <div className="col-xxl-4 col-xl-6 col-lg-4 col-sm-6 single-note-item all-category">
            <div className="card card-body mb-4 stretch stretch-full">
                {/* <span className={`side-stick bg-success`}></span> */}
                <a href={`/assessments/${id}`}>
                    <h5 className="note-title text-truncate w-75 mb-1 d-flex align-items-center" data-noteheading={testName}>
                        {testName} - {assessedBy}
                        <i className={`point ms-2 fs-7 text-success`}><BsCircleFill /></i>
                    </h5>
                </a>
                <p className="fs-11 text-muted note-date">{format(assessmentDate, 'dd MMM yyyy')}</p>
                <div className="note-content flex-grow-1">
                    <p className="text-muted note-inner-content text-truncate-3-line" data-notecontent={result}>
                        {result}
                    </p>
                </div>
            </div>
        </div>
    );
};