import React, { useEffect, useState } from 'react'
import DisplayLandDetails from './DisplayLandDetails';

const Property = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [landDetailList, setLandDetailList] = useState([])
  const [length, setLength] = useState(0);
  const [reload, setReload] = useState(0);
  const detailsArr = [];


  useEffect(()=>{

    const getProperty = async () =>{
      const _indices = await contract.getIndices({from: account});
      const _totalIndices = _indices[0].words[0];

      for(let i=0; i<_totalIndices; i++){
        const ownerOwns = await contract.getOwnerOwns(i, {from: account});  // returns object
        
        // if survey no. != 0
        if(ownerOwns[3].words[0] != 0){
            const landDetails = await contract.getLandDetails(ownerOwns[0], ownerOwns[1], ownerOwns[2], ownerOwns[3].words[0], {
              from: account
            })

            const isAvaliable = await contract.isAvailable(ownerOwns[0], ownerOwns[1], ownerOwns[2], ownerOwns[3].words[0], {
              from: account
            })
            
            const landDetails2 = {state: ownerOwns[0], district: ownerOwns[1], city: ownerOwns[2], surveyNo: ownerOwns[3].words[0], isAvaliable}
            let allDetails = {...landDetails, ...landDetails2}
            detailsArr.push(allDetails);
        }
      }
      setLandDetailList(detailsArr);
      setLength(detailsArr.length)
      console.log(detailsArr)
    }

    getProperty();

  }, [reload])


  const markAvailableFunction = async (indx) =>{
      await contract.markMyPropertyAvailable(indx, {from: account});
      setReload(!reload);
      console.log(indx);
  }



  return (
    <div className='container' style={{marginBottom: '2rem'}}>
        {  
        (length == 0) ? 
        <div className="no-result-div">
          <p className='no-result'>No properties found :(</p>
        </div>
        :
          landDetailList.map((details, index) =>{
            return(
              <DisplayLandDetails
                 
                key = {index}
                owner = {details[0]}
                propertyId = {details[1].words[0]}
                index = {details[2].words[0]}
                marketValue = {details[3].words[0]}
                sqft = {details[4].words[0]}
                state = {details.state}
                district = {details.district}
                city = {details.city}
                surveyNo = {details.surveyNo}
                available = {details.isAvaliable}
                markAvailable = {markAvailableFunction}

              />
            )
          })
        } 
      
    </div>
  )
}

export default Property