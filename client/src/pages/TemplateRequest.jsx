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
import uploadTemplateImage from '../services/uploadTemplateImage'
import { useTranslation } from 'react-i18next';
import InputModal from '../components/Modal/InputModal'

import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib'



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

    const { t } = useTranslation()


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
    const [isPropertySearch, setIsPropertySearch] = useState(false);
    const [openCategoryOption, setOpenCategoryOptions] = useState(false);

    const [templateWidth, setTemplateWidth] = useState(800);
    const [templateHeight, setTemplateHeight] = useState(800);

    const [showInputModal, setShowInputModal] = useState(false);

    const [selectedUsers, setSelectedUsers] = useState(null);
    const [users, setUsers] = useState(false);

    const [files, setFiles] = useState([]);
    const [imageDimensions, setImageDimensions] = useState([])

    const [fabricData, setFabricData] = useState({})
    const [storageUrl, setStorageUrl] = useState({})

    // const handleFileInputChange = async (event) => {
    //     const newFiles = Array.from(event.target.files);

    //     newFiles.forEach(async (file) => {
    //         const reader = new FileReader();

    //         // Check the file type
    //         if (file.type.includes('image')) {
    //             // For images
    //             reader.onload = function (e) {
    //                 const img = new Image();
    //                 img.onload = function () {
    //                     setImageDimensions((prevDimensions) => [
    //                         ...prevDimensions,
    //                         { width: img.width, height: img.height }
    //                     ]);
    //                 };
    //                 img.src = e.target.result;
    //             };
    //             reader.readAsDataURL(newFiles[0]);

    //         } else if (file.type === 'application/pdf') {
    //             // For PDFs
    //             reader.onload = async function (e) {
    //                 try {
    //                     // Load PDF using pdf-lib
    //                     const pdfDoc = await PDFDocument.load(new Uint8Array(e.target.result));

    //                     // Extract images from PDF
    //                     const images = await extractImagesFromPDF(pdfDoc);

    //                     // Convert images to files
    //                     const imageFiles = images.map((image, index) => {
    //                         const blob = new Blob([image.bytes], { type: 'image/png' });
    //                         return new File([blob], `page_${index + 1}.png`, { type: 'image/png' });
    //                     });

    //                     // Handle the extracted image files
    //                     handleExtractedImageFiles(imageFiles);
    //                 } catch (error) {
    //                     console.error('Error extracting images from PDF:', error);
    //                 }
    //             };
    //             reader.readAsArrayBuffer(file);
    //         } else {
    //             // Unsupported file type
    //             console.error('Unsupported file type:', file.type);
    //             return;
    //         }

    //         // Read the file as an ArrayBuffer
    //     });

    //     // Update the files state with the new files
    //     console.log(newFiles)
    //     setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    // };

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
                // console.log('Width:', img.width);
                // console.log('Height:', img.height);

                // Add the dimensions to the state
                setImageDimensions([...imageDimensions, { width: img.width, height: img.height }]);
            };

            // Set the source of the Image object to the data URL obtained from FileReader
            img.src = e.target.result;
        };

        // Read the first file as a data URL
        reader.readAsDataURL(newFiles[0]);
    };




    // // Function to extract images from PDF using pdf-lib
    // const extractImagesFromPDF = async (pdfDoc) => {
    //     const images = [];
    //     const pageCount = pdfDoc.getPageCount();

    //     for (let i = 0; i < pageCount; i++) {
    //         const page = pdfDoc.getPage(i);
    //         const imagesOnPage = await page.getImages();

    //         for (const [key, image] of Object.entries(imagesOnPage)) {
    //             images.push(image);
    //         }
    //     }

    //     return images;
    // };

    // // Function to handle the extracted image files
    // const handleExtractedImageFiles = (imageFiles) => {
    //     // Handle the extracted image files as needed
    //     console.log('Extracted image files:', imageFiles);
    // };



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

    const handleUploadTemplate = async () => {
        if (loading) {
            return
        }

        if (!templateType) {
            toast.error('Please Enter a Type of Template.')
            return;
        }

        if (!showInputModal && imageDimensions.length <= 0) {
            setShowInputModal(true);
            return;
        }

        if (!selectedCategory) {
            toast.error('Select a Category.')
            return;
        }

        setLoading(true);
        try {
            // console.log('submit');
            const database = getDatabase();
            const databaseRef = ref(database, `${currentUserId}/templateData`);

            let templateId = uuidv4();
            
            const imageUrl = await Promise.all(files.map(async (file, index) => {
                const isThumbnail = index === 0 ? true : false;
                return uploadTemplateImage(file, templateId, index, isThumbnail);
            }));

            const fabricData = {};
            const storageUrl = {};

            imageUrl.forEach((url, index) => {
                fabricData[index] = `{"version":"5.3.0","objects":[],"backgroundImage":{"type":"image","version":"5.3.0","originX":"left","originY":"top","left":0,"top":0,"width":${imageDimensions[index].width},"height":${imageDimensions[index].height},"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"${url}","crossOrigin":"Anonymous","filters":[]}}`;
                storageUrl[index] = url;
            });

            const snapshot = await get(databaseRef);
            const templateData = snapshot.val();


            const entryToAdd = { id: selectedCategory.value };
            const entryExists = templateData.some(entry => entry.id === selectedCategory.value);

            if (!entryExists) {
                const newData = [...templateData, entryToAdd];
                set(ref(database, `${currentUserId}/templateData`), newData);
                // console.log('Added entry:', entryToAdd);
                handleUploadTemplate();
                return;
            } else {
                // console.log('Entry already exists:', entryToAdd);
            }

            // console.log(templateData)
            // console.log(dbJson.currentUserId.templateData)
            // console.log(currentUserId)

            // for (const [userId, { templateData }] of Object.entries(dbJson)) {
            for (const [index, data] of templateData?.entries()) {
                if (data?.id === selectedCategory.value) {
                    // console.log(dbJson);
                    // console.log(selectedCategory);
                    // console.log(selectedUsers);


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
                                width: imageDimensions?.length > 0 ? imageDimensions[0].width : parseInt(templateWidth, 10),
                                height: imageDimensions?.length > 0 ? imageDimensions[0].height : parseInt(templateHeight, 10),
                            },
                        },
                        fabricData,
                        isMyDesign: false,
                        favorite: false,
                        id: templateId,
                        published: false,
                        visible: true,
                        allowedUsers: selectedUsers,
                        // imageUrl: `${files[0].name}`,
                        designedBy: currentUserId,
                        modified: formatDate(Date.now()),
                        isPropertySearchEnabled: isPropertySearch,
                        description: description,
                        disclaimer: disclaimer,
                        storage_url: storageUrl,
                    };

                    // Push the templateObject to the data.template array
                    const templateDataRef = ref(database, `${currentUserId}/templateData/${index}/template`);
                    // console.log(Object.keys(data.template).length);

                    // // Set the templateObject to the templateData node
                    // update(templateDataRef, {
                    //     [Object.keys(data.template).length]: templateObject,
                    // });

                    // Use set to append the new object with the calculated key
                    get(templateDataRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            // If the template directory exists, get the number of keys
                            const nextKey = Object.keys(data.template).length;
                            set(templateDataRef, {
                                ...data.template,
                                [nextKey]: templateObject,
                            });
                            toast.success('Template added successfully!\n Navigating to Edit Template...', {
                                position: toast.POSITION.TOP_RIGHT,
                            });

                            setLoading(false);

                            setTimeout(() => {
                                navigate(`/edit/${templateId}`)
                            }, 3000);
                        } else {
                            // If the template directory does not exist, initialize it with the publishTemplate object
                            set(templateDataRef, { 0: templateObject });
                            toast.success('Template added successfully!\n Navigating to Edit Template...', {
                                position: toast.POSITION.TOP_RIGHT,
                            });

                            setLoading(false);

                            setTimeout(() => {
                                navigate(`/edit/${templateId}`)
                            }, 3000);
                        }
                    }).catch((error) => {
                        // Handle errors
                        console.error('Error getting template data:', error);
                    });

                    // Use break to exit the loop after the first iteration
                    break;
                }
            }

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
                // console.log(updatedCategories)
                const transformedArray = updatedCategories
                    .filter(category => category.title !== 'Favorites')
                    .flatMap(category =>
                        category.subTitle.map(item => ({ label: item.name, value: item.id }))
                    );
                // console.log(transformedArray)
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
            {showInputModal && (
                <InputModal
                    title="Template Dimensions"
                    body={
                        <div className="template-dimensions-input">
                            {/* <h3>Template Dimensions</h3> */}
                            <div className="input-group">
                                <label className="input">
                                    <span className="input__label">Width</span>
                                    <input
                                        placeholder="Enter width"
                                        type="number"
                                        className="simple-input"
                                        value={templateWidth}
                                        onChange={(e) => setTemplateWidth(e.target.value)}
                                    />
                                </label>
                                <label className="input">
                                    <span className="input__label">Height</span>
                                    <input
                                        placeholder="Enter height"
                                        type="number"
                                        className="simple-input"
                                        value={templateHeight}
                                        onChange={(e) => setTemplateHeight(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    }
                    secondayBtnTxt={t("cancel")}
                    primaryBtnTxt={t("submit")}
                    onClose={() => setShowInputModal(false)}
                    handleSecodnaryBtn={() => setShowInputModal(false)}
                    handlePrimaryBtn={async (e) => {
                        e.preventDefault();
                        handleUploadTemplate();
                    }}
                />

            )}
            <div className="page">
                <div className="dashboard-header dashboard-header_margin-bottom">
                    <div className="dashboard-header__top-panel flex-row">
                        <div className="dashboard-header__left-panel justify-content-start">
                            <Link to={'/'} className="back-button">
                                <svg className="icon v2-icon v2-icon-chevron-left back-button__icon">
                                    <use href="#v2-icon-chevron-left" xlinkHref="#v2-icon-chevron-left"></use>
                                </svg>
                                <span className="back-button__text">{t("dashboard")}</span>
                            </Link>
                        </div>
                        <div className="dashboard-header__right-panel justify-content-end flex-grow-1"></div>
                    </div>
                    <div className="mt-4">
                        <h1 className="mb-2">{t("TemplateRequest.requestTemplate")}</h1>
                        <h4 className="text-info">
                            {t("TemplateRequest.description")}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 page__column">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="input">
                                    <span className="input__label">{t("TemplateRequest.whatYouLike")}<span>*</span></span>
                                    <input
                                        placeholder={t("TemplateRequest.whatYouLikePlaceholder")}
                                        type="text"
                                        className="simple-input"
                                        value={templateType}
                                        onChange={(e) => setTemplateType(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="input">
                                    <span className="input__label">{t("TemplateRequest.whatDimensions")}<span>*</span></span>
                                    <input
                                        placeholder={t("TemplateRequest.whatDimensionsPlaceholder")}
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
                                <span className="input__label input__label_white-space-normal">{t("TemplateRequest.whatCategory")}<span>*</span></span>
                                <Select
                                    options={designCategories}
                                    styles={customStyles}
                                    placeholder={t("TemplateRequest.selectCategory")}
                                    onChange={(option) => setSelectedCategory(option)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="input">
                                    <div className="input__label mb-2">{t("Property.propertySearch")}:</div>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    id="inputEnabled"
                                                    name="inputStatus"
                                                    className="radiobutton__input radiobutton__input_checked"
                                                    value=""
                                                    checked={isPropertySearch}
                                                    onChange={() => setIsPropertySearch(true)}
                                                />
                                                <label htmlFor="inputEnabled" className="radiobutton__label">
                                                    Enabled
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    id="inputDisabled"
                                                    name="inputStatus"
                                                    className="radiobutton__input"
                                                    value=""
                                                    checked={!isPropertySearch}
                                                    onChange={() => setIsPropertySearch(false)}
                                                />
                                                <label htmlFor="inputDisabled" className="radiobutton__label">
                                                    Disabled
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="input">
                                <div className="input__label mb-2">{t("TemplateRequest.explainAccessLevel")}</div>
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
                                                {t("TemplateRequest.availableToAll")}
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
                                                {t("TemplateRequest.avaiableToSelected")}
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
                                                    onChange={(option) => { setSelectedUsers(option.value); console.log(selectedUsers) }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Upload Image Files */}
                        <div className="mb-3">
                            <span className="input__label input__label_white-space-normal">{t("TemplateRequest.uploadMessage")}</span>
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
                                                file.type !== 'application/pdf' ?
                                                    <div key={index} className="picture-box__item picture-box_with-removing">
                                                        <div className="picture-box__icon remove-button" onClick={() => handleRemoveFile(index)}>
                                                            <svg className="icon v2-icon v2-icon-minus-circle-light">
                                                                <use href="#v2-icon-minus-circle-light" xlinkHref="#v2-icon-minus-circle-light"></use>
                                                            </svg>
                                                        </div>
                                                        <img className="picture-box__image image" alt={file.name} src={URL.createObjectURL(file)} />
                                                    </div>
                                                    :
                                                    <div key={index} className="picture-box__item picture-box_with-removing">
                                                        <div className="picture-box__icon remove-button" onClick={() => handleRemoveFile(index)}>
                                                            <svg className="icon v2-icon v2-icon-minus-circle-light">
                                                                <use href="#v2-icon-minus-circle-light" xlinkHref="#v2-icon-minus-circle-light" />
                                                            </svg>
                                                        </div>
                                                        <div className="picture-box__image picture-box__file image pdf">
                                                            <svg className="icon v2-icon v2-icon-adobe">
                                                                <use href="#v2-icon-adobe" xlinkHref="#v2-icon-adobe" />
                                                            </svg>
                                                            <div className="picture-box__filename">{file.name}</div>
                                                        </div>
                                                    </div>
                                            ))}
                                        </div>
                                        {files.length > 0 && (
                                            <div className="text-end file-input__delete-all mt-2">
                                                <button type="button" className="btn btn_gray" onClick={handleDeleteAll}>
                                                    <span className="btn__text">{t("delete")} All</span>
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
                                    {t("TemplateRequest.describeContent")}<span>*</span>
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
                                <span className="input__label textarea__label">{t("TemplateRequest.addDisclaimer")}</span>
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
                                <span className="btn__text">{t("cancel")}</span>
                            </Link>
                            <button type="submit" className="btn" onClick={handleUploadTemplate}>
                                <span className="btn__text">{t("submit")} </span>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4 page__column mt-3 mt-lg-0">
                        <h4>{t("TemplateRequest.questions")}</h4>
                        <div className="mt-2 d-flex flex-wrap">
                            <div className="text-info text-break">
                                {t("TemplateRequest.connectMessage")}{" "}
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