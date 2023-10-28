function LoginInputs({email, setEmail, password, setPassword}) {
    return (
        <>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </label>
            </div>
            <div className="mb-3">
                <div className="password-input">
                <label className="input">
                    <span className="input__label">Password</span>
                    <input
                    required
                    autoComplete="password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    id="myInput"
                    className="simple-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="password-input__icon-wrapper">
                    <svg className="icon v1-icon v1-icon-eye password-input__icon">
                        <use href="#v1-icon-eye"></use>
                    </svg>
                    </span>
                </label>
                </div>
            </div>
            </>
    )
}

export default LoginInputs