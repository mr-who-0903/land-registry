import React from 'react'

const DisplayRequested = (props) => {
  return (
    <>
        <div className='explore-result'>
            <p><b>Owner:</b> {props.owner}</p>
            <p><b>Survey Number:</b> {props.surveyNo}</p>
            <p><b>Property ID:</b> {props.propertyId}</p>
            <p><b>Market Value:</b> {props.marketValue}</p>
            <p><b>Size:</b> {props.sqft} sq. ft.</p>
            <p><b>State:</b> {props.state}</p>
            <p><b>District:</b> {props.district}</p>
            <p><b>City:</b> {props.city}</p>

            <button className='no-sale'><b>Request Pending</b></button>
        </div>
    </>
  )
}

export default DisplayRequested