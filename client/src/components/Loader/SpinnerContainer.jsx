function SpinnerContainer({loading}){
    return(
        loading &&
        <div id="loading-container" class="loading-container">
            <div class="loading-spinner"></div>
        </div>
    )
}

export default SpinnerContainer