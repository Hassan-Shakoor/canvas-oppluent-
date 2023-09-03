import React from 'react';
import ReactDOM from 'react-dom';

function SupportDropDown(props) {
  
  const dropdownStyle = {
    top: props.position.top + 'px',
    left: props.position.left + 'px',
    "min-width": props.width,
  };

  return ReactDOM.createPortal(
    <div className="support-drop-down">
      <div className="styleSDD" style={{ position: 'absolute', top: '0px', left: '0px', width: '100%' }}>
          <div>
            <div className="rc-dropdown rc-dropdown-placement-bottomLeft" style={dropdownStyle}>
              <div className="header__dropdown header__dropdown_support">
                <header className="support-overlay__header">
                  <div className="support-overlay__name text-uppercase">support</div>
                </header>
                <div className="support-overlay__panel">
                  <div className="support-overlay__description">Platform Customer Service:</div>
                  <a className="btn support-overlay__email btn_link" href="mailto:support@maxadesigns.com" target="_blank">
                    <span onClick={props.click} className="btn__text">support@maxadesigns.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>,
    document.body
  );
}
export default SupportDropDown;