import React, { useState } from 'react';
import Select from 'react-select';

const EditExportSidebar = () => {
    const [fileType, setFileType] = useState({ value: 'PNG', label: 'PNG' });
    const [transparency, setTransparency] = useState(false);
    const [compressFile, setCompressFile] = useState(false);

    const fileTypes = [
        { value: 'PNG', label: 'PNG' },
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
        <aside
            className="sidebar__module-bar sidebar__module-bar_show animate-mounting__sidebar-enter-done" style={{ left: 'unset', right: '-390px' }}>
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
                            <i className="icon icon-checkbox-regular"></i>
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
                            <i className="icon icon-checkbox-regular"></i>
                        </div>
                    </div>
                    <div className="checkbox__label">
                        Compress file <span className="download-dropdown__checkbox-subtitle">(lower quality)</span>
                    </div>
                </label>
                <button type="button" className="btn btn_wide" onClick={handleDownload}>
                    <span className="btn__text">Download</span>
                </button>
            </div>
        </aside>
    );
};

export default EditExportSidebar;
