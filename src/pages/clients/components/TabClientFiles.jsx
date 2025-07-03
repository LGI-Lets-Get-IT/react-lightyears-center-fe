import React, { useEffect, useRef, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import ProjectFilteTable from "@/components/storage/ProjectFilteTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFiles, uploadFile } from "@/store/slice/fileSlice";
import LeadsEmptyCard from "@/components/leadsViewCreate/LeadsEmptyCard";

const TabClientFiles = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { currentClient } = useSelector((state) => state.clients);
  const { files, isLoading: uploadLoading } = useSelector(
    (state) => state.files
  );
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
        uuid: currentClient?.uuid,
        clientName: currentClient?.fullName.replaceAll(" ", ""),
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

  const handleCancel = () => {
    if (selectedFile) {
      setUploadedFileName(null);
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (currentClient) {
      dispatch(
        fetchAllFiles({
          params: {
            uuid: currentClient?.uuid,
            clientName: currentClient?.fullName.replaceAll(" ", ""),
          },
        })
      );
    }
  }, [currentClient]);

  return (
    <div className="tab-pane fade" id="filesTab">
      <div className="content-area-body">
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
            <div className="d-flex flex-row m-4">
              {uploadedFileName ? (
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm">
                    <span>{uploadedFileName}</span>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleCancel}
                    disabled={uploadLoading}
                  >
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
                      <>
                        <span>
                          <FiUpload size={16} className="me-2" />
                        </span>
                        <strong>Upload</strong>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleUploadClick}
                  disabled={uploadLoading}
                >
                  <FiUpload size={16} className="me-2" />
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
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleUploadFile}
                  >
                    Submit Upload
                  </button>
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
    </div>
  );
};

export default TabClientFiles;
