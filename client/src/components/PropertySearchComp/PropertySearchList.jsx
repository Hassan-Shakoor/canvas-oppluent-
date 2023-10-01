function PropertySearchList(prop){
    const {
        property: {
          address: {
            full,
            city,
            state,
            postalCode
          },
          mls: {
            status
          },
          listPrice: price
        }
      } = prop;
    return(
        <div className="property-search__list-item" onClick={() => prop.handleSelectedProperty(prop.index)}>
            <div className="property-search__item-text">
                {`${full}, ${city}, ${state} ${postalCode} (${status}, $${price})`}
            </div>
        </div>
    )
}

export default PropertySearchList