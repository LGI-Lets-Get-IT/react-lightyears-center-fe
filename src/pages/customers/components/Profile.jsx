import { deleteClient } from "@/store/slice/clientSlice";
import { FaMars, FaVenus } from "react-icons/fa6";
import { FiEdit, FiMail, FiPhone, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const Profile = ({ fullName, gender, guardianEmail, guardianPhone }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams();

  const handleDelete = (event) => {
    event.preventDefault();

    if (!uuid) {
      console.error("UUID is undefined");
      return;
    }

    const payload = {
      clientIds: [uuid],
    };

    // console.log("DELETE PAYLOAD:", payload);

    dispatch(deleteClient(payload))
      .unwrap()
      .then(() => {
        console.log("Client deleted successfully");
        navigate(`/clients`);
      })
      .catch((error) => console.error("Handle error:", error));
  };

  return (
    <div className="card stretch stretch-full">
      <div className="card-body">
        <div className="mb-4 text-center">
          {/* <div className="wd-150 ht-150 mx-auto mb-3 position-relative">
            <div className="avatar-image wd-150 ht-150 border border-5 border-gray-3">
              <img src="/images/avatar/1.png" alt="img" className="img-fluid" />
            </div>
            <div
              className="wd-10 ht-10 text-success rounded-circle position-absolute translate-middle"
              style={{ top: "76%", right: "10px" }}
            >
              <BsPatchCheckFill size={16} />
            </div>
          </div> */}
          <div className="mb-4">
            <span href="#" className="fs-14 fw-bold d-block">
              {fullName}
            </span>
            <span href="#" className="fs-12 fw-normal text-muted d-block">
              {gender == "Male" ? (
                <FaMars color="blue" />
              ) : (
                <FaVenus color="pink" />
              )}
              {gender}
            </span>
          </div>
          <div className="fs-12 fw-normal text-muted text-center d-flex flex-wrap gap-3 mb-4">
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">00</h6>
              <p className="fs-12 text-muted mb-0">Appointments</p>
            </div>
            <div className="flex-fill py-3 px-4 rounded-1 d-none d-sm-block border border-dashed border-gray-5">
              <h6 className="fs-15 fw-bolder">00</h6>
              <p className="fs-12 text-muted mb-0">Assessments</p>
            </div>
          </div>
        </div>
        <ul className="list-unstyled mb-4">
          <li className="hstack justify-content-between mb-4">
            <span className="text-muted fw-medium hstack gap-3">
              <FiPhone size={16} />
              Guardian Phone Number
            </span>
            <a href={`tel:${guardianPhone}`} className="float-end">
              {guardianPhone}
            </a>
          </li>
          <li className="hstack justify-content-between mb-0">
            <span className="text-muted fw-medium hstack gap-3">
              <FiMail size={16} />
              Guardian Email
            </span>
            <a href={`mailto:${guardianEmail}`} className="float-end">
              {guardianEmail}
            </a>
          </li>
        </ul>
        <div className="d-flex gap-2 text-center pt-4">
          <button onClick={handleDelete} className="w-50 btn btn-light-brand">
            <FiTrash2 size={16} className="me-2" />
            <span>Delete</span>
          </button>
          <a href={`/clients/edit/${uuid}`} className="w-50 btn btn-primary">
            <FiEdit size={16} className="me-2" />
            <span>Edit Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
