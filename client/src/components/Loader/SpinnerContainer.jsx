function SpinnerContainer({loading}){
    return(
        loading &&
        <div id="loading-container" className="loading-container">
            <div className="loading-spinner"></div>
        </div>
    )
}

export default SpinnerContainer