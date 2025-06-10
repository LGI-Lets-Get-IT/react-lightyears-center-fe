// import React, { useEffect, useRef, useState } from 'react';
// import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
// import PropTypes from 'prop-types';
// import getIcon from '@/utils/getIcon';
// import { useField } from 'formik';

import getIcon from "@/utils/getIcon";
import { useField } from "formik";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp, FiPlusCircle } from "react-icons/fi";

// const SelectDropdown = ({
//   name,
//   options,
//   selectedOption,
//   onSelectOption,
//   className,
//   defaultSelect,
//   placeholder,
//   isDisabled,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openUpwards, setOpenUpwards] = useState(false);
//   const [localSelectedOption, setLocalSelectedOption] = useState();
//   const ref = useRef();

//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     if (defaultSelect) {
//       const defaultOption = options?.find(
//         (option) => option.value === defaultSelect
//       );
//       setLocalSelectedOption(defaultOption || null); // Set default if found
//     }

//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [defaultSelect, options]);

//   const toggleDropdown = () => {
//     if (!isDisabled) {
//       setIsOpen(!isOpen);
//     }
//   };

//   const filteredOptions = options?.filter((option) =>
//     option.label?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // useEffect(() => {
//   //     if (selectedOption) {
//   //         // const selectedOpt = options?.find(option => option.value === selectedOption);
//   //         setLocalSelectedOption(selectedOption);
//   //     }
//   // }, [selectedOption]);

//   // useEffect(() => {
//   //     if (selectedOption) {
//   //         const selectedOpt = options?.find(option => option.value === selectedOption);
//   //         setLocalSelectedOption(selectedOpt);
//   //     }
//   // }, [selectedOption]);

//   useEffect(() => {
//     if (isOpen) {
//       const dropdown = dropdownRef.current;
//       const dropdownRect = dropdown.getBoundingClientRect();
//       const windowHeight = window.innerHeight;

//       if (dropdownRect.bottom + 200 > windowHeight) {
//         setOpenUpwards(true);
//       } else {
//         setOpenUpwards(false);
//       }
//     }
//   }, [isOpen]);

//   const handleOptionClick = (option) => {
//     if (!isDisabled) {
//       onSelectOption(option); // Notify parent of the selected option
//       setLocalSelectedOption(option);
//       setIsOpen(false); // Close the dropdown
//     }
//   };

//   return (
//     <div
//       className={`select-dropdown ${className ? className : ""} ${
//         openUpwards ? "open-upwards" : ""
//       } ${isDisabled ? "pe-none bg-red-500" : ""}`}
//       ref={dropdownRef}
//     >
//       <div className={"select-box"} onClick={toggleDropdown}>
//         {isDisabled ? (
//           <span className="selected-label" style={{ color: "#bcbcbc" }}>
//             {(!localSelectedOption && placeholder) ||
//               localSelectedOption?.label}
//           </span>
//         ) : (
//           <span className="selected-label">
//             {/* {!selectedOption && placeholder} */}
//             {!localSelectedOption && placeholder}
//             {localSelectedOption?.color ? (
//               <span
//                 className="status-dot"
//                 style={{ backgroundColor: localSelectedOption?.color }}
//               ></span>
//             ) : (
//               ""
//             )}
//             {localSelectedOption?.icon ? (
//               <span
//                 className={`lh-1 fs-16 ${localSelectedOption.iconClassName}`}
//               >
//                 {getIcon(localSelectedOption?.icon)}{" "}
//               </span>
//             ) : (
//               ""
//             )}
//             {localSelectedOption?.img ? (
//               <img
//                 src={localSelectedOption.img}
//                 className="avatar-image avatar-sm"
//               />
//             ) : (
//               ""
//             )}
//             {localSelectedOption?.label}
//           </span>
//         )}

//         <span className="arrow">
//           {isOpen ? <FiChevronUp /> : <FiChevronDown />}
//         </span>
//       </div>

//       {isOpen && (
//         <div className="dropdown-list">
//           <div className="search-input-outer">
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <ul>
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option) => (
//                 <li
//                   key={option.value}
//                   onClick={() => handleOptionClick(option)}
//                   className={`${
//                     option?.value === localSelectedOption?.value ? "active" : ""
//                   }`}
//                 >
//                   {option?.color ? (
//                     <span
//                       className="status-dot"
//                       style={{ backgroundColor: option?.color }}
//                     ></span>
//                   ) : (
//                     ""
//                   )}
//                   {option?.icon ? (
//                     <span className={`lh-1 me-3 fs-16 ${option.iconClassName}`}>
//                       {getIcon(option?.icon)}
//                     </span>
//                   ) : (
//                     ""
//                   )}
//                   {option?.img ? (
//                     <img
//                       src={option.img}
//                       className="avatar-image avatar-sm me-2"
//                     />
//                   ) : (
//                     ""
//                   )}

//                   {option?.label}
//                 </li>
//               ))
//             ) : (
//               <li className="no-result">No results found</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectDropdown;

// SelectDropdown.propTypes = {
//     options: PropTypes.array.isRequired,
//     defaultSelect: PropTypes.number,
//     currentSelect: PropTypes.func
// };

// SelectDropdown.defaultProps = {
//     currentSelect: () => { }
// };

const SelectDropdown = ({
  name,
  options,
  placeholder,
  isDisabled,
  className,
  defaultSelect,
  selectedOption,
  onSelectOption,
  onCreateOption,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openUpwards, setOpenUpwards] = useState(false);
  const [localSelectedOption, setLocalSelectedOption] = useState();

  const dropdownRef = useRef(null);

  // const localSelectedOption = options.find((opt) => opt.value === field.value);

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option) => {
    if (!isDisabled) {
      setValue(option.value); // ⬅️ update Formik field value
      setLocalSelectedOption(option)
      setIsOpen(false);
      if (onSelectOption) {
        onSelectOption(option); // Notify parent of the selected option
      }
    }
  };

  const filteredOptions = options?.filter((option) =>
    option.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  useEffect(() => {
  //   if (selectedOption) {
  //     const selectedOpt = options?.find(option => option.value === selectedOption);
  //     setLocalSelectedOption(selectedOpt);
  //   }
  // }, [selectedOption]);

  useEffect(() => {
    if (selectedOption && options?.length) {
      const selectedOpt = options?.find(option => option.value === selectedOption);
      setLocalSelectedOption(selectedOpt);
    }
  }, [selectedOption, options]);

  useEffect(() => {
    if (defaultSelect) {
      const defaultOption = options?.find(
        (option) => option.value === defaultSelect
      );
      setLocalSelectedOption(defaultOption || null); // Set default if found
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [defaultSelect, options]);

  return (
    <div
      className={`select-dropdown ${className || ""} ${openUpwards ? "open-upwards" : ""
        } ${isDisabled ? "pe-none" : ""}`}
      ref={dropdownRef}
    >
      <div className={`select-box ${meta.error ? 'border-danger' : ''}`} onClick={toggleDropdown}>
        {isDisabled ? (
          <span className="selected-label text-capitalize" style={{ color: "#bcbcbc" }}>
            {(!localSelectedOption && placeholder) ||
              localSelectedOption?.label}
          </span>
        ) : (
          <span className="selected-label text-capitalize">
            {!localSelectedOption && placeholder}
            {localSelectedOption?.color && (
              <span
                className="status-dot"
                style={{ backgroundColor: localSelectedOption.color }}
              />
            )}
            {localSelectedOption?.icon && (
              <span
                className={`lh-1 fs-16 ${localSelectedOption.iconClassName}`}
              >
                {getIcon(localSelectedOption.icon)}
              </span>
            )}
            {localSelectedOption?.img && (
              <img
                src={localSelectedOption.img}
                className="avatar-image avatar-sm"
              />
            )}
            {localSelectedOption?.label}
          </span>
        )}
        <span className="arrow">
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-list">
          <div className="search-input-outer">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={`${option.value === field.value ? "active" : ""}`}
                >
                  {option.color && (
                    <span
                      className="status-dot"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  {option.icon && (
                    <span className={`lh-1 me-3 fs-16 ${option.iconClassName}`}>
                      {getIcon(option.icon)}
                    </span>
                  )}
                  {option.img && (
                    <img
                      src={option.img}
                      className="avatar-image avatar-sm me-2"
                    />
                  )}
                  {option.label}
                </li>
              ))
            ) : (onCreateOption && searchTerm !== '') ? (
              <li
                className="add-option"
                onClick={() => {
                  onCreateOption && onCreateOption(searchTerm);
                }}
              >
                <span className="me-2"><FiPlusCircle/></span>
                <span>
                  Create <strong>{searchTerm}</strong>
                </span>
              </li>
            ) : (
              <li className="no-result">No results found</li>
            )}
          </ul>
        </div>
      )}

      {/* Show error if any */}
      {meta.error && (
        <div className="text-danger mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectDropdown;
