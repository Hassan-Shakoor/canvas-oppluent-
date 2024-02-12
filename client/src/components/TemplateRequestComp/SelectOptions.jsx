import React, { useState } from 'react';

const SelectOptions = ({ options, title, placeholder, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [openOptions, setOpenOptions] = useState(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setOpenOptions(false);

        // Call the callback function with the selected option
        onSelect(option);
    };

    return (
        <div className="select-container">
            <span className="input__label input__label_white-space-normal">{title}<span>*</span></span>
            <div className="select-container css-2b097c-container" onClick={() => setOpenOptions(!openOptions)}>
                <div className="select__control css-yk16xz-control">
                    <div className="select__value-container css-1tnzi8j">
                        {!selectedOption && (
                            <div className="select__placeholder css-p3e44b-placeholder">
                                {placeholder}
                            </div>
                        )}
                        <input
                            id="react-select-3-input"
                            readOnly=""
                            tabIndex="0"
                            aria-autocomplete="list"
                            value={selectedOption}
                            style={{ border: 0 }}
                        />
                    </div>
                    <div className="select__indicators css-1wy0on6">
                        <span className="select__indicator-separator css-18jcpcz-indicatorSeparator"></span>
                        <svg className="icon v2-icon v2-icon-chevron-right select__icon">
                            <use href="#v2-icon-chevron-right" xlinkHref="#v2-icon-chevron-right"></use>
                        </svg>
                    </div>
                </div>
                {openOptions && (
                    <div className="select__menu css-26l3qy-menu">
                        <div className="select__menu-list css-a8xhzo">
                            {options.map((option, index) => (
                                <div key={index} className="select__option css-1dkp1dt-option" onClick={() => handleSelect(option)} tabIndex="-1">
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectOptions;
