import SelectDropdown from "@/components/shared/SelectDropdown";
import { useSelector } from "react-redux";

const childInfoData = [
    { label: "Full Name", key: "fullName" },
    { label: "Age", key: "age", suffix: "years old" },
    { label: "Date of Birth", key: "dateOfBirth" },
    { label: "Nationality", key: "nationality" },
    { label: "School Name", key: "schoolName" }
];

const parentInfoData = [
    { label: "Guardian Name", key: "guardianName" },
    { label: "Guardian Phone", key: "guardianPhone" },
    { label: "Guardian Nationality", key: "guardianNationality" },
    { label: "Relationship With Child", key: "guardianRelationship" },
];

const UserProfile = () => {
    // const { currentUser } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);

    return (
        <div className="main-content">
            <div className="card">
                <div className="card-body">
                    <div className="profile-details mb-5">
                        <div className="mb-4 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0">{user?.fullName} - {user?.age ?? 0} years old</h5>
                        </div>
                        {childInfoData.map((item, index) => (
                            <div
                                key={index}
                                className={`row g-0 ${index === childInfoData.length - 1 ? "mb-0" : "mb-4"
                                    }`}
                            >
                                <div className="col-sm-6 text-muted">{item.label}:</div>
                                <div className="col-sm-6 fw-semibold">
                                    {user?.[item.key]} {item?.suffix}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4 d-flex align-items-center justify-content-between">
                        <h5 className="fw-bold mb-0">Sharing Options</h5>
                    </div>

                    <div className="mb-5">
                        <label className="form-label">Company field is required? </label>
                        {/* <SelectDropdown
                            name="allowShareData"
                            options={[{ label: '1', value: 1 }]}
                            defaultSelect={"yes"}
                            selectedOption={1}
                            onSelectOption={(option) => console.log('test')}
                        /> */}
                        <small className="form-text text-muted">Company field is required? [Ex: Yes/No]</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;