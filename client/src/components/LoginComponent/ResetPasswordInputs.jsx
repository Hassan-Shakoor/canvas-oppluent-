function ResetPasswordInputs ({resetEmail, setResetEmail}) {
    return (
        <div className="mb-3">
            <label className="input">
            <span className="input__label">Email</span>
            <input
                required
                autoComplete="email"
                name="email"
                placeholder="Enter your email"
                type="text"
                className="simple-input"
                id="myInput"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
            />
            </label>
        </div>
    )
}

export default ResetPasswordInputs