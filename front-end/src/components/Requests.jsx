import React, { useState, useEffect } from 'react'

const Requests = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [requestList, setRequestList] = useState([])
  const [length, setLength] = useState(0);
  const [reload, setReload] = useState(0);
  const detailsArr = [];

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
              detailsArr.push(reqDetails);

            }
          }
        }
      }

      setRequestList(detailsArr);
      setLength(detailsArr.length);
      console.log(detailsArr);
    }

    getRequests();

  }, [])

  return (
    <div>Requests</div>
  )
}

export default Requests