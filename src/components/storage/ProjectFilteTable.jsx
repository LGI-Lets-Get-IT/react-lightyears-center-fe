import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiDownload, FiEye, FiScissors, FiShare2, FiX } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import Pagination from "@/components/shared/Pagination";
import { confirmDelete } from "@/utils/confirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { downloadFile } from "@/store/slice/fileSlice";
import api from "@/lib/axios";

const ProjectFilteTable = ({ files }) => {
  // const dispatch = useDispatch();
  const [data, setData] = useState([]);

  // const handleDownload = (fileId) => {
  //     dispatch(downloadFile({fileId}))
  //     .unwrap()
  //     .then(async (response) => {
  //         const resp = await api.get(response.downloadUri);

  //         const blob = await resp.blob();
  //         const url = URL.createObjectURL(blob);
  //         const a = document.createElement("a");
  //         a.href = url;
  //         a.download = "filename.pdf"; // set your desired file name
  //         a.click();
  //         URL.revokeObjectURL(url);
  //     })
  //     .catch((err) => console.error("Error: ", err))
  // }

  const handleDelete = (label, id) => {
    if (label === "Delete") {
      confirmDelete(id).then((result) => {
        if (result.confirmed) {
          setData(data.filter((data) => data.id !== result.id));
        }
      });
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
                <th scope="col" className="text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {files && files.length > 0 ? (
                files.map(({ id, name, link, size, createdTime }) => {
                  return (
                    <TableRow
                      key={id}
                      fileSIze={size / 100000}
                      link={link}
                      title={name}
                      uploadDate={format(createdTime, "dd-MM-yyyy hh:mm")}
                      id={id}
                      handleDelete={handleDelete}
                      // handleDownload={() => handleDownload(id)}
                    />
                  );
                })
              ) : (
                <tr className="text-center">
                  <td colSpan={4}>No files found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className='card-footer'>
                <Pagination />
            </div> */}
    </div>
  );
};

export default ProjectFilteTable;

const TableRow = ({ link, fileSIze, iconSrc, title, uploadDate, id }) => {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center gap-3">
          {iconSrc && (
            <img src={iconSrc} className="img-fluid rounded wd-30" alt="" />
          )}
          <a href={link} target="_blank">
            {title}
          </a>
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
        <a
          href={link}
          target="_blank"
          className="avatar-text avatar-md ms-auto"
        >
          <FiEye />
        </a>
      </td>
    </tr>
  );
};
