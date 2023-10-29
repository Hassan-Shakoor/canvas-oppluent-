// ** Import Dependencies
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// ** Constant
import { toast } from "react-toastify"
import { LANGUAGE } from "../../shared/constant"

// TODO: link to the backend


function SettingsBody () {
    // ** State
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [language, setLanguage] = useState(LANGUAGE.ENGLISH)
    const [dropdownActive, setDropdownActive] = useState(false)

    // ** Vars
    const navigate = useNavigate()

    const handleSaveClick = () => {
        if (newPassword === passwordConfirmation) {
            const data = {
                email,
                newPassword,
                passwordConfirmation,
                currentPassword,
                language
            }
    
            console.log(data)
        } else{
            toast.error("Password doesn't match.")
        }
    }

    return (
        <div className="pt-4">
            <div className="row">
                <div className="col-md-7 page__column">
                <div className="mb-3">
                    <label className="input input_has-value">
                    <span className="input__label">Email</span>
                    <input
                        placeholder="Please Enter Your Email"
                        type="text"
                        className="simple-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    </label>
                </div>
                <div className="mb-3">
                    <div className="password-input">
                    <label className="input">
                        <span className="input__label">New Password</span>
                        <input
                        placeholder="Leave blank if you dont want to change your password"
                        type="password"
                        className="simple-input"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        />
                        <span className="password-input__icon-wrapper">
                        <i className="icon icon-eye password-input__icon" />
                        </span>
                    </label>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="password-input">
                    <label className="input">
                        <span className="input__label">Password Confirmation</span>
                        <input
                        placeholder="Reenter your password"
                        type="password"
                        className="simple-input"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                        <span className="password-input__icon-wrapper">
                        <i className="icon icon-eye password-input__icon" />
                        </span>
                    </label>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="password-input">
                    <label className="input">
                        <span className="input__label">Current Password</span>
                        <input
                        placeholder="Enter your current password"
                        type="password"
                        className="simple-input"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        />
                        <span className="password-input__icon-wrapper">
                        <i className="icon icon-eye password-input__icon" />
                        </span>
                    </label>
                    </div>
                </div>
                <div className="mb-3">
                <div className="select-container select-container_has-value">
                        <span className="input__label">Language</span>
                        <div className="select-container" style={{position: 'relative', boxSizing: 'border-box'}}>
                            <div className="select__control"
                                style={{
                                    alignItems: "center",
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    boxSizing: 'border-box',
                                }}
                                onClick={() => setDropdownActive(!dropdownActive)}
                            >
                                <div className="select__value-container select__value-container--has-value"
                                    style={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        padding: '0px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <div className="select__single-value"
                                        style={{
                                            marginLeft: '0px',
                                            marginRight: '0px',
                                            maxWidth: 'calc(100%-0px)',
                                            overflow:"hidden",
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            top: '50%',
                                            boxSizing: 'border-box'
                                        }}
                                    >{language}</div>
                                    <input
                                        id="react-select-2-input"
                                        readOnly=""
                                        tabIndex={0}
                                        aria-autocomplete="list"
                                        style={{
                                            background: '0px center',
                                            border: '0px',
                                            fontSize: 'inherit',
                                            outline: '0px',
                                            padding: '0px',
                                            width: '1px',
                                            color: 'transparent',
                                            left: '-100px',
                                            opacity: '0px',
                                            position: 'relative',
                                            transform: 'scale(0)'
                                        }}
                                    />
                                </div>
                                <div className="select__indicators">
                                    <span className="select__indicator-separator css-18jcpcz-indicatorSeparator" />
                                    <svg className="icon v2-icon v2-icon-chevron-right select__icon">
                                        <use href="#v2-icon-chevron-right" xlinkHref="#v2-icon-chevron-right" />
                                    </svg>
                                </div>

                            </div>
                            {dropdownActive && <div className="select__menu css-26l3qy-menu">
                                <div className="select__menu-list css-a8xhzo">
                                    <div
                                    onClick={() => (setLanguage(LANGUAGE.ENGLISH), setDropdownActive(false))}
                                    className= {language === LANGUAGE.ENGLISH ? "select__option select__option--is-selected css-z06zfw-option": "select__option css-z06zfw-option"}
                                    id="react-select-2-option-0"
                                    tabIndex={-1}
                                    >
                                        {LANGUAGE.ENGLISH}
                                    </div>
                                    <div
                                    onClick={() => (setLanguage(LANGUAGE.ESPANOL), setDropdownActive(false))}
                                    className= {language === LANGUAGE.ESPANOL ? "select__option select__option--is-selected css-z06zfw-option": "select__option css-z06zfw-option"}
                                    id="react-select-2-option-1"
                                    tabIndex={-1}
                                    >
                                        {LANGUAGE.ESPANOL}
                                    </div>
                                </div>
                            </div>}
                        </div>
                </div>
                </div>
                </div>
                <div className="col-md-5 page__column">
                <div className="mb-4">
                    <h4 className="mb-3">Pro Tips</h4>
                    <button type="button" className="btn btn_gray btn_no-text-transform">
                    <span className="btn__text">Reset Pro Tips</span>
                    </button>
                </div>
                </div>
                <div className="button-set">
                <button type="button" className="btn btn_secondary" onClick={() => navigate('/categories')}>
                    <span className="btn__text">Cancel</span>
                </button>
                <button type="submit" className="btn" onClick={handleSaveClick}>
                    <span className="btn__text">Save</span>
                </button>
                </div>
            </div>
        </div>
    )

}

export default SettingsBody