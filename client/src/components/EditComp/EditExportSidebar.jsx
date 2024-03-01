import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { selectOpenDrawer } from '../../store/app/Edit/EditDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditExportSidebar = () => {

    const openDrawer = useSelector(selectOpenDrawer);
    const [fileType, setFileType] = useState({ value: 'PNG', label: 'PNG' });
    const [transparency, setTransparency] = useState(false);
    const [compressFile, setCompressFile] = useState(false);


    const fileTypes = [
        { value: 'PNG', label: 'PNG' },
        { value: 'JPG', label: 'JPG' },
        { value: 'PDF Standard', label: 'PDF Standard' },
        // Add more file types as needed
    ];

    const handleFileTypeChange = (selectedOption) => {
        setFileType(selectedOption);
    };

    const handleTransparencyChange = () => {
        setTransparency(!transparency);
    };

    const handleCompressFileChange = () => {
        setCompressFile(!compressFile);
    };

    const handleDownload = () => {
        // Implement download logic here
        console.log('Download button clicked!');
        console.log('File Type:', fileType.value);
        console.log('Transparency:', transparency);
        console.log('Compress File:', compressFile);
    };

    return (
        <>
            <aside
                className={`sidebar__module-bar sidebar__module-bar_show ${openDrawer === 'Download' ? 'animate-mounting__sidebar-enter-right': 'sidebar_right'}`}
                style={{
                    left: 'unset',
                    padding: '3%'
                }}>
                {openDrawer === 'Download' && (
                    <div className="sidebar sidebar_show export-sidebar">
                        <div className="export-sidebar__title">File Type</div>
                        <Select
                            options={fileTypes}
                            value={fileType}
                            onChange={handleFileTypeChange}
                            isSearchable={false}
                            className="select-container export-sidebar__select"
                        />
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
                                Transparency <span className="download-dropdown__checkbox-subtitle">(applies if no background)</span>
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
                                Compress file <span className="download-dropdown__checkbox-subtitle">(lower quality)</span>
                            </div>
                        </label>
                        <button type="button" className="btn btn_wide" style={{zIndex: 0}} onClick={handleDownload}>
                            <span className="btn__text">Download</span>
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
};

export default EditExportSidebar;
