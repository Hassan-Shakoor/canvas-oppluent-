import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { selectOpenDrawer } from '../../store/app/Edit/EditDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCanvasRef } from '../../shared/utils/fabric';
import Slider from 'rc-slider';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import { selectCanvasContainer, selectSelectedCanvas } from '../../store/app/Edit/Canvas/canvas';

import { useTranslation } from 'react-i18next';


const EditExportSidebar = () => {

    const { t } = useTranslation()


    const canvasContainer = useSelector(selectCanvasContainer);
    const selectedCanvas = useSelector(selectSelectedCanvas);

    const openDrawer = useSelector(selectOpenDrawer);
    const [fileType, setFileType] = useState({ value: 'png', label: 'PNG' });
    const [transparency, setTransparency] = useState(false);
    const [compressFile, setCompressFile] = useState(false);

    const [jpgQuality, setJpgQuality] = useState(0.8)

    const [openSelectPDFDropdown, setOpenSelectPDFDropdown] = useState(false)

    const fileTypes = [
        { value: 'png', label: 'PNG' },
        { value: 'jpg', label: 'JPG' },
        { value: 'pdf', label: 'PDF Standard' },
        // Add more file types as needed
    ];

    const [selectedOption, setSelectedOption] = useState({ label: 'Best Quality', description: '240 dpi', suggested: true });
    const [options] = useState([
        { label: 'Highest Quality', description: '300 dpi' },
        { label: 'Best Quality', description: '240 dpi', suggested: true },
        { label: 'Fair Quality', description: '150 dpi' }
    ]);

    const [selectedPageOption, setSelectedPageOption] = useState('current');
    const [rangeFrom, setRangeFrom] = useState(1);
    const [rangeTo, setRangeTo] = useState(1);

    const handleFileTypeChange = (selectedOption) => {
        setFileType(selectedOption);
    };

    const handleTransparencyChange = () => {
        setTransparency(!transparency);
    };

    const handleCompressFileChange = () => {
        setCompressFile(!compressFile);
    };

    const handleDownload = async () => {
        const canvasContainer = getCanvasRef();

        let dataURL;
        let fileName;
        let fileExtension = fileType.value;

        // Determine the file name and dataURL based on the selected file type
        if (fileType.value === 'png' || fileType.value === 'jpg') {

            if (selectedPageOption === 'all') {
                const zip = new JSZip();
                canvasContainer.forEach((canvas, index) => {
                    // Convert canvas to data URL
                    const dataURL = canvas.toDataURL(`image/${fileType.value}`);

                    // Extract base64 data from data URL
                    const base64Data = dataURL.split(',')[1];

                    // Add image to zip file
                    zip.file(`image_${index}.${fileType.value}`, base64Data, { base64: true });
                });

                // Generate the zip file asynchronously
                zip.generateAsync({ type: 'blob' }).then((content) => {
                    // Create a temporary link to trigger download
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = `images.zip`;
                    link.click();
                });
                return;
            } else if (selectedPageOption === 'current') {

                fileName = `image.${fileType.value}`;
                dataURL = canvasContainer[0]?.toDataURL({
                    format: fileType.value,
                    quality: fileType.value === 'jpg' ? jpgQuality : 1,
                    multiplier: 1, // Set multiplier to maintain original size
                    transparent: transparency // Set transparency option for PNG
                });
            } else if (selectedPageOption === 'range') {
                const zip = new JSZip();
                canvasContainer.forEach((canvas, index) => {
                    if (index >= rangeFrom - 1 && index <= rangeTo - 1) {
                        // Convert canvas to data URL
                        const dataURL = canvas.toDataURL(`image/${fileType.value}`);

                        // Extract base64 data from data URL
                        const base64Data = dataURL.split(',')[1];

                        // Add image to zip file
                        zip.file(`image_${index}.${fileType.value}`, base64Data, { base64: true });
                    }
                });

                // Generate the zip file asynchronously
                zip.generateAsync({ type: 'blob' }).then((content) => {
                    // Create a temporary link to trigger download
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = `images.zip`;
                    link.click();
                });
                return;
            }


        } else if (fileType.value === 'pdf') {
            fileName = `document.${fileType.value}`;
            // Convert canvas to PDF
            const pdf = new jsPDF('l', 'px', [canvasContainer[0].width, canvasContainer[0].height]);
            if (selectedPageOption === 'all') {
                // Export all pages
                for (let i = 0; i < canvasContainer.length; i++) {
                    pdf.addImage(canvasContainer[i].toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, canvasContainer[i].width, canvasContainer[i].height);
                    if (i !== canvasContainer.length - 1) {
                        pdf.addPage();
                    }
                }
            } else if (selectedPageOption === 'current') {
                // Export current page only
                pdf.addImage(canvasContainer[selectedCanvas].toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, canvasContainer[selectedCanvas].width, canvasContainer[selectedCanvas].height);
            } else if (selectedPageOption === 'range') {
                // Export page range
                for (let i = rangeFrom - 1; i <= rangeTo - 1; i++) {
                    pdf.addImage(canvasContainer[i].toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, canvasContainer[i].width, canvasContainer[i].height);
                    if (i !== rangeTo - 1) {
                        pdf.addPage();
                    }
                }
            }

            // Get the data URL of the PDF
            dataURL = pdf.output('datauristring');
            fileExtension = 'pdf';
        }

        // Convert the data URL to a Blob
        const blob = await fetch(dataURL).then((res) => res.blob());

        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();

        console.log('Download button clicked!');
    };



    return (
        <>
            <aside
                className={`sidebar__module-bar sidebar__module-bar_show ${openDrawer === 'Download' ? 'animate-mounting__sidebar-enter-right' : 'sidebar_right'}`}
                style={{
                    left: 'unset',
                    padding: '3%'
                }}>
                {openDrawer === 'Download' && (
                    <div className="sidebar sidebar_show export-sidebar">
                        <div className="export-sidebar__title">{t("EditExportSidebar.fileType")}</div>
                        <Select
                            options={fileTypes}
                            value={fileType}
                            onChange={handleFileTypeChange}
                            isSearchable={false}
                            className="select-container export-sidebar__select"
                            styles={{ zIndex: 10 }}
                        />
                        {fileType.value === 'png' &&
                            <>
                                <label className="checkbox download-dropdown__checkbox export-sidebar_mt">
                                    <input
                                        className="checkbox__input"
                                        type="checkbox"
                                        checked={transparency}
                                        onChange={handleTransparencyChange}
                                    />
                                    <div className="checkbox__box">
                                        <div className="checkbox__tick">
                                            <FontAwesomeIcon icon="fa-solid fa-check" color='#fff' />
                                        </div>
                                    </div>
                                    <div className="checkbox__label">
                                        {t("EditExportSidebar.transparency")} <span className="download-dropdown__checkbox-subtitle">({t("EditExportSidebar.appliesNoBg")})</span>
                                    </div>
                                </label>
                                <label className="checkbox download-dropdown__checkbox export-sidebar_mb">
                                    <input
                                        className="checkbox__input"
                                        type="checkbox"
                                        checked={compressFile}
                                        onChange={handleCompressFileChange}
                                    />
                                    <div className="checkbox__box">
                                        <div className="checkbox__tick">
                                            <FontAwesomeIcon icon="fa-solid fa-check" color='#fff' />
                                        </div>
                                    </div>
                                    <div className="checkbox__label">
                                        {t("EditExportSidebar.compressFile")} <span className="download-dropdown__checkbox-subtitle">({t("EditExportSidebar.lowerQuality")})</span>
                                    </div>
                                </label>
                            </>
                        }
                        {fileType.value === 'jpg' &&
                            <div className="slider-box__hokeys-wrapper mb-3">
                                <div tabIndex="-1" className="slider-box__hokeys-wrapper">
                                    <div className="slider-box__hokeys-wrapper">
                                        <div tabIndex="0" className="slider-box export-sidebar__slider export-sidebar_mt">
                                            <p className="slider-box__title">{t("EditExportSidebar.quality")}</p>
                                            <Slider min={0} max={1} step={0.1} value={jpgQuality} onChange={(value) => setJpgQuality(value)} />
                                            <p className="slider-box__value">{jpgQuality * 10}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {fileType.value === 'pdf' &&
                            <div className="select-container css-2b097c-container my-3" onClick={() => setOpenSelectPDFDropdown(!openSelectPDFDropdown)}>
                                <div className="dropdown-select__control dropdown-select__control--is-focused dropdown-select__control--menu-is-open" style={{
                                    padding: '8px 10px',
                                    background: '#fff',
                                    borderRadius: '5px'
                                }}>
                                    <div className="dropdown-select__value-container dropdown-select__value-container--has-value d-flex justify-content-between">
                                        <div className="dropdown-select__single-value css-ah2eo0-singleValue">
                                            <div className="d-flex align-items-center">
                                                <span>{selectedOption.label}<span className="dropdown-select__option-description ms-1">{selectedOption.description}</span>
                                                    {selectedOption.suggested && <span className="dropdown-select__option-description_suggested ms-2"
                                                        style={{
                                                            padding: '4px 8px',
                                                            background: 'dodgerblue',
                                                            borderRadius: '14px',
                                                            fontSize: '8px',
                                                            color: 'white'
                                                        }}>{t("EditExportSidebar.suggested")}</span>}</span>
                                            </div>
                                        </div>
                                        <input readOnly tabIndex="0" aria-autocomplete="list" className="css-62g3xt-dummyInput" value="" />
                                        <div className="dropdown-select__indicators css-1wy0on6">
                                            <span className="dropdown-select__indicator-separator css-18jcpcz-indicatorSeparator"></span>
                                            <svg className="icon v2-icon v2-icon-chevron-right select__icon select__icon_active">
                                                <use href="#v2-icon-chevron-left" xlinkHref="#v2-icon-chevron-left" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {openSelectPDFDropdown && (
                                    <div className="dropdown-select__menu css-26l3qy-menu">
                                        <div className="dropdown-select__menu-list css-a8xhzo">
                                            {options.map((option, index) => (
                                                <div key={index} className="dropdown-select__option" onClick={() => setSelectedOption(option)} id={`react-select-3-option-${index}`} tabIndex="-1">
                                                    <div className="dropdown-select__option-label d-flex align-items-center">
                                                        <span>{option.label}</span>
                                                        <span className="dropdown-select__option-description ms-1">{option.description}</span>
                                                        {option.suggested && <span className="dropdown-select__option-description_suggested ms-2"
                                                            style={{
                                                                padding: '0 8px',
                                                                background: 'dodgerblue',
                                                                borderRadius: '14px',
                                                                fontSize: '8px',
                                                                color: 'white'
                                                            }}>{t("EditExportSidebar.suggested")}</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>)
                                }
                            </div>
                        }
                        {canvasContainer.length > 1 && (
                            <div className="d-flex flex-column gap-2 my-3">

                                <div className="radiobutton export-sidebar__radiobutton m-0">
                                    <input type="radio" id="all-all" name="all" className="radiobutton__input" value="all" checked={selectedPageOption === 'all'} onChange={() => setSelectedPageOption('all')} />
                                    <label htmlFor="all-all" className="radiobutton__label">{t("EditExportSidebar.allPages")}</label>
                                </div>

                                <div className="radiobutton export-sidebar__radiobutton m-0">
                                    <input type="radio" id="current-current" name="current" className="radiobutton__input" value="current" checked={selectedPageOption === 'current'} onChange={() => setSelectedPageOption('current')} />
                                    <label htmlFor="current-current" className="radiobutton__label">{t("EditExportSidebar.currentPage")}</label>
                                </div>

                                <div className="radiobutton m-0">
                                    <input type="radio" id="range-range" name="range" className="radiobutton__input radiobutton__input_checked" value="range" checked={selectedPageOption === 'range'} onChange={() => setSelectedPageOption('range')} />
                                    <label htmlFor="range-range" className="radiobutton__label">{t("EditExportSidebar.rangeFrom")}:</label>
                                </div>

                                <div className='d-flex justify-content-evenly align-items-center'>
                                    <div className="select-container export-sidebar__select export-sidebar__select_small select-container_has-value">
                                        <Select
                                            options={canvasContainer.map((canvas, index) => ({ label: (index + 1).toString(), value: index + 1 }))}
                                            value={{ label: rangeFrom.toString(), value: rangeFrom }}
                                            onChange={(selectedOption) => setRangeFrom(selectedOption.value)}
                                            isSearchable={false}
                                            className="select-container css-2b097c-container"
                                        />
                                    </div>

                                    <span>{t("EditExportSidebar.to")}</span>

                                    <div className="select-container export-sidebar__select export-sidebar__select_small select-container_has-value">
                                        <Select
                                            options={canvasContainer.map((canvas, index) => ({ label: (index + 1).toString(), value: index + 1 }))}
                                            value={{ label: rangeTo.toString(), value: rangeTo }}
                                            onChange={(selectedOption) => setRangeTo(selectedOption.value)}
                                            isSearchable={false}
                                            className="select-container export-sidebar__select export-sidebar__select_small select-container_has-value"
                                        />
                                    </div>
                                </div>
                            </div>)
                        }


                        <button type="button" className="btn btn_wide" style={{ zIndex: 0 }} onClick={handleDownload}>
                            <span className="btn__text">{t("download")}</span>
                        </button>
                    </div>
                )}
            </aside >
        </>
    );
};

export default EditExportSidebar;
