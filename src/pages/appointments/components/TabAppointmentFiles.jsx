import React, { useEffect, useRef, useState } from "react";
import Pagination from "@/components/shared/Pagination";
import HorizontalProgress from "@/components/shared/HorizontalProgress";
import { projectsData } from "@/utils/data/projectsData";
import { FiBell, FiGlobe, FiPrinter, FiUpload, FiX } from "react-icons/fi";
import { PiFilePdf } from "react-icons/pi";
import ProjectFilteTable from "@/components/storage/ProjectFilteTable";
import RecentFileCard from "@/components/storage/RecentFileCard";
import { storageFolderData } from "@/utils/data/storageData";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFiles, uploadFile } from "@/store/slice/fileSlice";
import LeadsEmptyCard from "@/components/leadsViewCreate/LeadsEmptyCard";
import { LiaPencilAltSolid } from "react-icons/lia";

const TabAppointmentFiles = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { currentAppointment } = useSelector((state) => state.appointments);
  const {
    files,
    isLoading: fetchLoading,
    isLoading: uploadLoading,
  } = useSelector((state) => state.files);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      setSelectedFile(file);
    }
  };

  const handleUploadFile = () => {
    dispatch(
      uploadFile({
        uuid: currentAppointment?.client?.uuid,
        clientName: currentAppointment?.client?.fullName.replaceAll(" ", ""),
        file: selectedFile,
      })
    )
      .unwrap()
      .then(() => {
        setUploadedFileName(null);
        setSelectedFile(null);
      })
      .catch((err) => console.error("Error ", err));
  };

  const handleDelete = () => {
    if (selectedFile) {
      setUploadedFileName(null);
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (currentAppointment) {
      dispatch(
        fetchAllFiles({
          params: {
            uuid: currentAppointment?.client?.uuid,
            clientName: currentAppointment?.client?.fullName.replaceAll(
              " ",
              ""
            ),
          },
        })
      );
    }
  }, [currentAppointment]);
  return (
    // <div className="tab-pane fade active show" id="filesTab">
    <div className="content-area-body">
      {fetchLoading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : files && files.length > 0 ? (
        <div className="project-section">
          <div className="d-flex flex-row mb-4">
            {uploadedFileName ? (
              <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm">
                  <span>{uploadedFileName}</span>
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  <span>
                    <FiX size={16} className="me-2" />
                  </span>
                  <strong>Cancel</strong>
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleUploadFile}
                  disabled={uploadLoading}
                >
                  {uploadLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-white me-2"
                      role="status"
                    />
                  ) : (
                    <div></div>
                  )}
                  <span>
                    <FiUpload size={16} className="me-2" />
                  </span>
                  <strong>Upload</strong>
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleUploadClick}>
                <FiUpload size={16} className="me-2" />
                <span>Upload File</span>
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <ProjectFilteTable files={files} />
        </div>
      ) : (
        <>
          <LeadsEmptyCard
            title={"No files yet!"}
            description={"There are no files in this appointment"}
            onClick={handleUploadClick}
          >
            {uploadedFileName && (
              <div className="text-center mt-3 d-flex flex-column align-items-center justify-content-center">
                <div className="mb-2">
                  <span className="text-muted">Selected file: </span>
                  <strong>{uploadedFileName}</strong>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleDelete}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleUploadFile}
                    disabled={uploadLoading}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </LeadsEmptyCard>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </>
      )}
    </div>
    // </div>
  );
};

export default TabAppointmentFiles;
