import React from 'react'

const DisplayExploreResult = (props) => {
  return (
    <>
    {
        (props.propertyId != 0) ? 
          <div className='explore-result'>
            <p><b>Owner:</b> {props.owner}</p>
            <p><b>Survey Number:</b> {props.surveyNo}</p>
            <p><b>Property ID:</b> {props.propertyId}</p>
            <p><b>Market Value:</b> {props.marketValue}</p>
            <p><b>Size:</b> {props.sqft} sq. ft.</p>

            {(props.available) ? 
              ((props.isAdmin || props.isOwner) ?
                <button className='marked-sale'><b>Marked for sale</b></button>
                :
                ((props.didIRequested) ? 
                  <button className='req-pending'><b>Request Pending</b></button>
                  :
                  <button className='buy-btn' onClick={props.requestForBuy}><b>Request for buy</b></button>))
              :
              <button className='no-sale'><b>Not for sale</b></button>
            }

        </div> 
        :
        (props.noResult) ? 
        <div className="no-result-div">
          <p className='no-result'>No result found :(</p>
        </div>
        :
        <></>
    }
    </>
  )
}

export default DisplayExploreResult