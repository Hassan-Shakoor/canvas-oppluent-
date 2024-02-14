import React, { useEffect, useState } from 'react'
import SpinnerOverlay from '../components/Loader/SpinnerOverlay'
import { ToastContainer, toast } from 'react-toastify'
import Header from '../components/NavBarComp/Header'
import { useDispatch, useSelector } from 'react-redux'
import { selectDarkMode } from '../store/app/User/userPreference'
import { Link, useNavigate } from 'react-router-dom'
import SelectOptions from '../components/TemplateRequestComp/SelectOptions'
import Select from 'react-select'
import { get, getDatabase, onValue, push, ref, set, update } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../configs/firebase'
import uploadFileAndGetURL from '../services/uploadFileAndGetURL'

import { v4 as uuidv4 } from 'uuid';
import SpinnerContainer from '../components/Loader/SpinnerContainer'

let currentUserId = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserId = user.uid;
        // Now you can use this `userId` to store or retrieve data in your Realtime Database
    } else {
        // User is signed out
    }
});


const TemplateRequest = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const darkMode = useSelector(selectDarkMode)

    const navigate = useNavigate();

    const [templateType, setTemplateType] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [category, setCategory] = useState("");
    const [access, setAccess] = useState("");
    const [description, setDescription] = useState("");
    const [disclaimer, setDisclaimer] = useState("");
    const [designCategories, setDesignCategories] = useState(['Business Category', 'Instagram Stories', 'Facebook Banner']);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openCategoryOption, setOpenCategoryOptions] = useState(false);



    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState(false);

    const [files, setFiles] = useState([]);
    const [imageDimensions, setImageDimensions] = useState([])

    const [fabricData, setFabricData] = useState({})
    const [storageUrl, setStorageUrl] = useState({})

    const handleFileInputChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles([...files, ...newFiles]);

        const reader = new FileReader();

        // Set up a function to be called when the file is loaded
        reader.onload = function (e) {
            // Create an Image object
            const img = new Image();

            // Set up a function to be called when the image is loaded
            img.onload = function () {
                // Log the width and height of the image
                console.log('Width:', img.width);
                console.log('Height:', img.height);

                // Add the dimensions to the state
                setImageDimensions([...imageDimensions, { width: img.width, height: img.height }]);
            };

            // Set the source of the Image object to the data URL obtained from FileReader
            img.src = e.target.result;
        };

        // Read the first file as a data URL
        reader.readAsDataURL(newFiles[0]);
    };


    const handleRemoveFile = (index) => {
        const updatedFiles = [...files];
        const dimensions = [...imageDimensions];
        updatedFiles.splice(index, 1);
        dimensions.splice(index, 1);
        setFiles(updatedFiles);
        setImageDimensions(dimensions);
    };

    const handleDeleteAll = () => {
        setFiles([]);
        setImageDimensions([]);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    // const handleUploadTemplate = async () => {
    //     console.log('submit');
    //     const database = getDatabase();
    //     const databaseRef = ref(database);

    //     let imageUrl = [];

    //     if (files.length > 0) {
    //         await Promise.all(files.map(async (file, index) => {
    //             console.log('File: ', file)
    //             const url = await uploadFileAndGetURL(file); // Assuming uploadFileAndGetURL is an asynchronous function
    //             imageUrl.push(url);
    //             setFabricData({
    //                 ...fabricData,
    //                 [index]: `{"version":"5.3.0","objects":[],"backgroundImage":{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":0,"top":0,"width":${imageDimensions[index].width},"height":${imageDimensions[index].height},"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"${url}","crossOrigin":"Anonymous","filters":[]}}`
    //             })
    //             setStorageUrl({
    //                 ...storageUrl,
    //                 [index]: url
    //             })
    //         }));
    //     }


    //     const snapshot = await get(databaseRef);
    //     const dbJson = snapshot.val();

    //     for (const [userId, { templateData }] of Object.entries(dbJson)) {
    //         for (const [index, data] of templateData?.entries()) {
    //             if (data?.id === 5) {
    //                 console.log(dbJson);
    //                 console.log(selectedCategory);
    //                 console.log(selectedUser);

    //                 const templateObject = {
    //                     cardTitle: `${templateType}`,
    //                     created: formatDate(Date.now()),
    //                     docSpecs: {
    //                         designType: `${selectedCategory.label}`,
    //                         maxPages: "unlimited",
    //                         minPages: 1,
    //                         pageCountDivisible: 1,
    //                         resolution: {
    //                             width: imageDimensions[0].width,
    //                             height: imageDimensions[0].height
    //                         }
    //                     },
    //                     fabricData: fabricData,
    //                     favorite: false,
    //                     id: uuidv4(),
    //                     imageUrl: `/images/${files[0].name}`,
    //                     modified: formatDate(Date.now()),
    //                     storage_url: storageUrl
    //                 };

    //                 // Push the templateObject to the data.template array
    //                 const templateDataRef = ref(database, `dcGWmanuIsg6gsRdbnuiv6Ajo503/templateData/${index}/template`);
    //                 console.log(Object.keys(data.template).length);

    //                 // Set the templateObject to the templateData node
    //                 set(templateDataRef, {
    //                     ...data.template,
    //                     [Object.keys(data.template).length]: templateObject,
    //                 });

    //                 console.log(templateDataRef);
    //                 // Use break to exit the loop after the first iteration
    //                 break;
    //             }
    //         }
    //     }
    // };


    const handleUploadTemplate = async () => {
        if (loading) {
            return
        }

        setLoading(true);
        try {
            console.log('submit');
            const database = getDatabase();
            const databaseRef = ref(database, `${currentUserId}/templateData`);

            const imageUrl = await Promise.all(files.map(async (file) => uploadFileAndGetURL(file)));

            const fabricData = {};
            const storageUrl = {};

            imageUrl.forEach((url, index) => {
                fabricData[index] = `{"version":"5.3.0","objects":[],"backgroundImage":{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":0,"top":0,"width":${imageDimensions[index].width},"height":${imageDimensions[index].height},"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"${url}","crossOrigin":"Anonymous","filters":[]}}`;
                storageUrl[index] = url;
            });

            const snapshot = await get(databaseRef);
            const templateData = snapshot.val();

            console.log(templateData)
            // console.log(dbJson.currentUserId.templateData)
            // console.log(currentUserId)

            let templateId = uuidv4();
            // for (const [userId, { templateData }] of Object.entries(dbJson)) {
            for (const [index, data] of templateData?.entries()) {
                if (data?.id === selectedCategory.value) {
                    // console.log(dbJson);
                    console.log(selectedCategory);
                    console.log(selectedUser);


                    const templateObject = {
                        cardTitle: `${templateType}`,
                        created: formatDate(Date.now()),
                        docSpecs: {
                            designType: selectedCategory.label,
                            designID: selectedCategory.value,
                            maxPages: "unlimited",
                            minPages: 1,
                            pageCountDivisible: 1,
                            resolution: {
                                width: imageDimensions[0].width,
                                height: imageDimensions[0].height,
                            },
                        },
                        fabricData,
                        isMyDesign: false,
                        favorite: false,
                        id: templateId,
                        published: false,
                        visible: true,
                        imageUrl: `${files[0].name}`,
                        designedBy: currentUserId,
                        modified: formatDate(Date.now()),
                        storage_url: storageUrl,
                    };

                    // Push the templateObject to the data.template array
                    const templateDataRef = ref(database, `${currentUserId}/templateData/${index}/template`);
                    console.log(Object.keys(data.template).length);

                    // // Set the templateObject to the templateData node
                    // update(templateDataRef, {
                    //     [Object.keys(data.template).length]: templateObject,
                    // });


                    // console.log(templateDataRef);
                    const nextKey = Object.keys(data.template).length;

                    // Use set to append the new object with the calculated key
                    set(templateDataRef, {
                        ...data.template,
                        [nextKey]: templateObject,
                    });

                    // Use break to exit the loop after the first iteration
                    break;
                }
            }
            // }
            toast.success('Template added successfully!\n Navigating to Edit Template...', {
                position: toast.POSITION.TOP_RIGHT,
            });

            setLoading(false);

            setTimeout(() => {
                navigate(`/edit/${templateId}`)
            }, 3000);


        } catch (error) {
            console.error('Error handling template upload:', error);
            // Show an error toast
            toast.error('Error adding template. Please try again.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            setLoading(false)
        }

    }


    const fetchDataFromDatabase = () => {
        const database = getDatabase();
        const userJsonRef = ref(database, currentUserId + '/userJson');

        onValue(userJsonRef, (snapshot) => {
            const updatedCategories = snapshot.val();
            if (updatedCategories) {
                console.log(updatedCategories)
                const transformedArray = updatedCategories
                    .filter(category => category.title !== 'Favorites')
                    .flatMap(category =>
                        category.subTitle.map(item => ({ label: item.name, value: item.id }))
                    );
                console.log(transformedArray)
                setDesignCategories(transformedArray)
            }
        });
    };

    const fetchUserJsonDataFromDatabase = () => {
        const database = getDatabase();
        const userJsonRef = ref(database);

        onValue(userJsonRef, (snapshot) => {
            const updatedCategories = snapshot.val();
            if (updatedCategories) {
                const resultArray = Object.entries(updatedCategories).map(([userId, { accountInformation }]) => ({
                    label: accountInformation.profile.firstName + ' ' + accountInformation.profile.lastName,
                    value: userId,
                }));
                setUsers(resultArray);
                // console.log(resultArray)
            }
        });
    };
    useEffect(() => {
        fetchDataFromDatabase();
        fetchUserJsonDataFromDatabase();
    }, []);

    const handleFileChange = (e) => {
        const fileList = e.target.files;
        setFiles(fileList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return (
        <>
            {/* <SpinnerOverlay loading={loading} /> */}
            <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme={darkMode ? 'dark' : 'light'} />
            <Header />
            <div className="page">
                <div className="dashboard-header dashboard-header_margin-bottom">
                    <div className="dashboard-header__top-panel flex-row">
                        <div className="dashboard-header__left-panel justify-content-start">
                            <Link to={'/'} className="back-button">
                                <svg className="icon v2-icon v2-icon-chevron-left back-button__icon">
                                    <use href="#v2-icon-chevron-left" xlinkHref="#v2-icon-chevron-left"></use>
                                </svg>
                                <span className="back-button__text">Dashboard</span>
                            </Link>
                        </div>
                        <div className="dashboard-header__right-panel justify-content-end flex-grow-1"></div>
                    </div>
                    <div className="mt-4">
                        <h1 className="mb-2">Request a New Template</h1>
                        <h4 className="text-info">
                            Ask MAXA to design a new template for your brand. Fill out the form below. We will get started and your brand
                            director will contact you when your request is ready to be previewed.
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 page__column">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="input">
                                    <span className="input__label">What type of template would you like?<span>*</span></span>
                                    <input
                                        placeholder="Enter type of template here"
                                        type="text"
                                        className="simple-input"
                                        value={templateType}
                                        onChange={(e) => setTemplateType(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="input">
                                    <span className="input__label">What are the dimensions?<span>*</span></span>
                                    <input
                                        placeholder="Enter dimensions here"
                                        type="text"
                                        className="simple-input"
                                        value={dimensions}
                                        onChange={(e) => setDimensions(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <span className="input__label input__label_white-space-normal">What category do you want to place this design in?<span>*</span></span>
                                <Select
                                    options={designCategories}
                                    styles={customStyles}
                                    placeholder='Select category'
                                    onChange={(option) => setSelectedCategory(option)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input">
                                <div className="input__label mb-2">Please explain the level of access:</div>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="radiobutton">
                                            <input
                                                type="radio"
                                                id="whereAvailable-"
                                                name="whereAvailable"
                                                className="radiobutton__input radiobutton__input_checked"
                                                value=""
                                                checked={access === ""}
                                                onChange={() => setAccess("")}
                                            />
                                            <label htmlFor="whereAvailable-" className="radiobutton__label">
                                                Available to all users
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="radiobutton">
                                            <input
                                                type="radio"
                                                id="whereAvailable-"
                                                name="whereAvailable"
                                                className="radiobutton__input"
                                                value=""
                                                checked={access === "selected"}
                                                onChange={() => setAccess("selected")}
                                            />
                                            <label htmlFor="whereAvailable-" className="radiobutton__label">
                                                Limit to selected users
                                            </label>
                                        </div>
                                    </div>
                                    {access === 'selected' && (
                                        <div className="col-lg-6 mb-3 mb-lg-0">
                                            <div className="select-container select-container_searchable">
                                                <Select
                                                    options={users}
                                                    isSearchable
                                                    isMulti
                                                    placeholder='Select users'
                                                    styles={customStyles}
                                                    onChange={(option) => { setSelectedUser(option); console.log(option) }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Upload Image Files */}
                        <div className="mb-3">
                            <span className="input__label input__label_white-space-normal">Please upload logos, images and example marketing here:</span>
                            <div tabIndex="0">
                                <input
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    multiple
                                    type="file"
                                    autoComplete="off"
                                    tabIndex="-1"
                                    value=""
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                {files.length <= 0 ?

                                    <div className="panel panel_height-420 d-flex justify-content-center align-items-center">
                                        <button type="button" className="btn btn_uploader">
                                            <svg className="icon v2-icon v2-icon-upload-file">
                                                <use href="#v2-icon-upload-file" xlinkHref="#v2-icon-upload-file"></use>
                                            </svg>
                                            <span className="btn__text">
                                                <input multiple
                                                    type="file"
                                                    className="file-input"
                                                    accept=".png, .jpg, .jpeg, .pdf"
                                                    onChange={handleFileInputChange} />
                                                Upload PNG, JPG, JPEG or PDF Here
                                            </span>
                                        </button>
                                    </div>
                                    :
                                    <div className="panel panel_height-420">
                                        <div className="picture-box picture-box_height-330 mb-2">
                                            <div className="picture-box__item picture-box_with-removing">
                                                <label className="btn btn_uploader btn_in-picture-box">
                                                    <svg className="icon v2-icon v2-icon-upload-file">
                                                        <use href="#v2-icon-upload-file" xlinkHref="#v2-icon-upload-file"></use>
                                                    </svg>
                                                    <span className="btn__text">
                                                        <input
                                                            multiple
                                                            type="file"
                                                            className="file-input"
                                                            accept=".png, .jpg, .jpeg, .pdf"
                                                            onChange={handleFileInputChange}
                                                        />
                                                        Upload PNG, JPG, JPEG or PDF Here
                                                    </span>
                                                </label>
                                            </div>
                                            {files.map((file, index) => (
                                                <div key={index} className="picture-box__item picture-box_with-removing">
                                                    <div className="picture-box__icon remove-button" onClick={() => handleRemoveFile(index)}>
                                                        <svg className="icon v2-icon v2-icon-minus-circle-light">
                                                            <use href="#v2-icon-minus-circle-light" xlinkHref="#v2-icon-minus-circle-light"></use>
                                                        </svg>
                                                    </div>
                                                    <img className="picture-box__image image" alt={file.name} src={URL.createObjectURL(file)} />
                                                </div>
                                            ))}
                                        </div>
                                        {files.length > 0 && (
                                            <div className="text-end file-input__delete-all mt-2">
                                                <button type="button" className="btn btn_gray" onClick={handleDeleteAll}>
                                                    <span className="btn__text">Delete All</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="textarea item-has-value textarea_has-value">
                                <span className="input__label textarea__label textarea__label_white-space-normal">
                                    Please describe what content should be on this marketing template:<span>*</span>
                                </span>
                                <textarea
                                    placeholder="Enter description here"
                                    className="textarea__field textarea"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="textarea item-has-value textarea_has-value">
                                <span className="input__label textarea__label">Add disclaimer</span>
                                <textarea
                                    placeholder="Enter disclaimer here"
                                    className="textarea__field textarea"
                                    value={disclaimer}
                                    onChange={(e) => setDisclaimer(e.target.value)}
                                ></textarea>
                            </label>
                        </div>
                        <div className="button-set button-set_space-between">
                            <Link className="btn btn_secondary" to={'/'}>
                                <span className="btn__text">Cancel</span>
                            </Link>
                            <button type="submit" className="btn" onClick={handleUploadTemplate}>
                                <span className="btn__text">Submit </span>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4 page__column mt-3 mt-lg-0">
                        <h4>Questions?</h4>
                        <div className="mt-2 d-flex flex-wrap">
                            <div className="text-info text-break">
                                This is an admin feature only. If you would like to connect with us directly for immediate help, please
                                email{" "}
                                <span className="text-info">
                                    <a href="mailto:artin@maxadesigns.com" target="_blank" className="text-primary text-no-decoration text-break-words">
                                        artin@maxadesigns.com
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>

                    <SpinnerOverlay loading={loading} />
                </div>
            </div>
        </>
    )
}

const customStyles = {
    container: (provided) => ({
        ...provided,
        minWidth: "50px",
        position: "relative",
    }),
    control: (provided) => ({
        ...provided,
        backgroundColor: "var(--secondary-bg-color)",
        border: "1px solid var(--input-border-color)",
        borderRadius: "4px",
        padding: "0px 0px",
        cursor: "pointer",
        minHeight: "26px",
    }),
    valueContainer: (provided) => ({
        ...provided,
        fontSize: "14px",
        fontWeight: "bold",
        minHeight: "20px",
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "var(--font-color)",
    }),
    input: (provided) => ({
        ...provided,
        color: "var(--dark-color)",
        width: '75px',
        height: '26px'
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: "none",
    }),
    menu: (provided) => ({
        ...provided,
        minWidth: "220px",
        backgroundColor: "var(--secondary-bg-color)",
        zIndex: "11",
    }),
    menuList: (provided) => ({
        ...provided,
        paddingBottom: "4px",
        paddingTop: "4px",
        maxHeight: "60vh",
        overflowX: "hidden",
        overflowY: "auto",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: (state.isFocused || state.isSelected) ? 'var(--primary-color-light)' : "var(--secondary-bg-color)",
        letterSpacing: "1px",
        cursor: "pointer",
        padding: "13px",
    }),
};


export default TemplateRequest