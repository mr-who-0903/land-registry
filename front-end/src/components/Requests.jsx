import React, { useState, useEffect } from 'react'
import DisplayRequests from './DisplayRequests';

const Requests = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [requestList, setRequestList] = useState([])
  const [length, setLength] = useState(0);
  const [reload, setReload] = useState(0);
  const reqArr = [];

  useEffect(() => {
    const getRequests = async () =>{
      const _indices = await contract.getIndices({from: account});
      const _totalIndices = _indices[0].words[0];

      for(let i=0; i<_totalIndices; i++){
        const ownerOwns = await contract.getOwnerOwns(i, {from: account});  // returns object
        
        // if survey no. != 0
        if(ownerOwns[3].words[0] != 0){

          const reqCnt_propId = await contract.getRequestCnt_propId(ownerOwns[0], ownerOwns[1], ownerOwns[2], ownerOwns[3].words[0],{
            from: account
          })

          console.log(reqCnt_propId);

          const noOfRequests = reqCnt_propId[0].words[0];
          const propertyId = reqCnt_propId[1].words[0];

          if(noOfRequests > 0){

            for(let j = 0; j<noOfRequests; j++){

              const requester = await contract.getRequesterDetail(ownerOwns[0], ownerOwns[1], ownerOwns[2], ownerOwns[3].words[0], j, {
                from: account
              })

              const reqDetails = {state: ownerOwns[0], district: ownerOwns[1], city: ownerOwns[2], surveyNo: ownerOwns[3].words[0], index: i, reqNo: j, requester, propertyId}
              reqArr.push(reqDetails);

            }
          }
        }
      }

      setRequestList(reqArr);
      setLength(reqArr.length);
      console.log(reqArr);
    }

    getRequests();

  }, [reload])

  const handleAcceptReq = async (_index, _reqNo) => {
      await contract.AcceptRequest(_index, _reqNo, {from: account});
      setReload(!reload);
  }

  return (
    <div className='container'>
      {  
        (length == 0) ? 
        <div className="no-result-div">
          <p className='no-result'>No incoming requests.</p>
        </div>
        :
          requestList.map((details, index) =>{
            return(
              <DisplayRequests
                 
                key = {index}
                propertyId = {details.propertyId}
                requester = {details.requester}
                index = {details.index}
                reqNo = {details.reqNo}
                state = {details.state}
                district = {details.district}
                city = {details.city}
                surveyNo = {details.surveyNo}
                acceptReq = {handleAcceptReq}
    
              />
            )
          })
        } 
    </div>
  )
}

export default Requests