import React, { useEffect, useState } from "react";

// ** Store
import { useSelector } from "react-redux";

// ** Third Party Component
import Select, { StylesConfig } from "react-select";

// ** Shared
import { getCanvasRef } from "../../../../shared/utils/fabric";
import { selectSelectedCanvas } from "../../../../store/app/Edit/Canvas/canvas";

const FontStyleDropdown = () => {
  // ** State
  const [font, setFont] = useState(null)

  // ** Vars
  const canvasContainer = getCanvasRef() || []
  const selectedCanvas = useSelector(selectSelectedCanvas)


  useEffect(() => {
    console.log('fontstyle')
    const canvas = canvasContainer[selectedCanvas]
    if (canvas?.getActiveObject()) {
      const textObject = canvas?.getActiveObject()
      if (font) {
        textObject?.set({ fontFamily: font })
        canvas.requestRenderAll();
      }
      if (!font) {
        setFont(textObject.fontFamily)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [font])

  const options = [
    {
      value: "Abuget",
      label: (
        <p className="dropdown-select__option-label" style={{ fontFamily: "Abuget" }}>
          Abuget
        </p>
      ),
    },
    {
      value: "EB Garamond",
      label: (
        <p className="dropdown-select__option-label" style={{ fontFamily: 'EB Garamond' }}>
          EB Garamond
        </p>
      ),
    },
    {
      value: "EB Garamond Medium", label: (
        <p className="dropdown-select__option-label" style={{ fontFamily: 'EB Garamond Medium' }}>
          EB Garamond Medium
        </p>
      )
    },
    {
      value: "EB Garamond SemiBold", label: (
        <p className="dropdown-select__option-label" style={{ fontFamily: 'EB Garamond SemiBold' }}>
          EB Garamond SemiBold
        </p>
      )
    },
    {
      value: "Poppins", label: (
        <p className="dropdown-select__option-label" style={{ fontFamily: 'Poppins' }}>
          Poppins
        </p>
      )
    },
    {
      value: "Poppins Black", label: (
        <p className="dropdown-select__option-label" style={{ fontFamily: 'Poppins Black' }}>
          Poppins Black
        </p>
      )
    },
    {
      value: "Poppins Light", label: (
        <p className="dropdown-select__option-label" style={{ fontFamily: 'Poppins Light' }}>
          Poppins Light
        </p>
      )
    },
    {
      value: "Poppins Medium", label: (
        <p className="dropdown-select__option-label" style={{ fontFamily: 'Poppins Medium' }}>
          Poppins Medium
        </p>
      )
    },
    {
      value: "Poppins Semibold", label: (
        <p className="dropdown-select__option-label" style={{ fontFamily: 'Poppins Semibold' }}>
          Poppins Semibold
        </p>
      )
    },
    {
      value: "Poppins Thin", label: (
        <p className="dropdown-select__option-label" style={{ fontFamily: 'Poppins Thin' }}>
          Poppins Thin
        </p>
      )
    },

  ];

  const customStyles = {
    container: (provided) => ({
      ...provided,
      minWidth: "50px",
      position: "relative"
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--secondary-bg-color)",
      border: "1px solid var(--input-border-color)",
      borderRadius: "4px",
      padding: "0px 00px",
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
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: '8px, 4px'
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
    <div className="select-container toolbar__select select-container_has-value select-container_searchable">
      <Select
        options={options}
        defaultValue={options[0]}
        value={{
          value: font,
          label: (
            <p className="dropdown-select__option-label" style={{ fontFamily: font }}>
              {font}
            </p>
          )
        }}
        styles={customStyles}
        onChange={(option) => setFont(option.value)}
      />
    </div>
  );
};

export default FontStyleDropdown;
