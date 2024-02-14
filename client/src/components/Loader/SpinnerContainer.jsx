function SpinnerContainer({ loading, height }) {
    return (
        loading &&
        <div id="loading-container" className="loading-container" style={{ height: height }}>
            <div className="loading-spinner"></div>
        </div>
    )
}

export default SpinnerContainer