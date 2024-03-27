import React, { useEffect, useState } from "react";

// ** Store
import { useSelector } from "react-redux";

// ** Third Party Component
import Select, { StylesConfig } from "react-select";

// ** Shared
import { getCanvasRef } from "../../../../shared/utils/fabric";
import { selectSelectedCanvas } from "../../../../store/app/Edit/Canvas/canvas";

const FontSizeDropdown = () => {
    // ** state
    const [size, setSize] = useState(null)

    // ** Vars
    const canvasContainer = getCanvasRef() || []
    const selectedCanvas = useSelector(selectSelectedCanvas)

    useEffect(() => {
        const canvas = canvasContainer[selectedCanvas]
        if (canvas?.getActiveObject()) {
            const textObject = canvas?.getActiveObject()
            if (size) {
                textObject.set({ fontSize: size })
                // console.log('dakdn')
                canvas.requestRenderAll()
            }
            if (!size) {
                setSize(textObject?.fontSize)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size])

    const options = [
        {
            value: 5,
            label: '5'
        },
        {
            value: 6,
            label: '6'
        },
        {
            value: 8,
            label: '8'
        },
        {
            value: 10,
            label: '10'
        },
        {
            value: 12,
            label: '12'
        },
        {
            value: 14,
            label: '14'
        },
        {
            value: 16,
            label: '16'
        },
        {
            value: 18,
            label: '18'
        },
        {
            value: 21,
            label: '21'
        },
        {
            value: 24,
            label: '24'
        },
        {
            value: 28,
            label: '28'
        },
        {
            value: 32,
            label: '32'
        },
        {
            value: 36,
            label: '36'
        },
        {
            value: 42,
            label: '42'
        },
        {
            value: 48,
            label: '48'
        },
        {
            value: 56,
            label: '56'
        },
        {
            value: 64,
            label: '64'
        },
        {
            value: 72,
            label: '72'
        },
        {
            value: 80,
            label: '80'
        },
        {
            value: 88,
            label: '88'
        },
        {
            value: 96,
            label: '96'
        },
        {
            value: 100,
            label: '100'
        },
    ]

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

    return (
        <div className="size-input__tools-container">
            <Select options={options}
                defaultValue={options[4]}
                value={{
                    value: size,
                    label: '' + size
                }}
                styles={customStyles}
                onChange={(option) => setSize(option.value)} />
        </div>
    )

}

export default FontSizeDropdown