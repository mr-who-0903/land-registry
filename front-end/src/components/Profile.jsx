import React, { useEffect, useState } from 'react'
import '../css/Profile.css'

const Profile = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [userInfo, setUserInfo] = useState({
    address:"", fullName:"", gender:"", email:"", contact:"", residential_addr:""
  })

  const [update, setUpdate] = useState(false);


  const handleUpdate = async () =>{

    await contract.setUserProfile(userInfo.fullName, userInfo.gender, userInfo.email, userInfo.contact, userInfo.residential_addr, {
      from: account});

    console.log(userInfo);
    setUpdate(false);
  }

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setUserInfo({...userInfo, [name]:value})
  }


  useEffect(() => {

    const getUserInfo = async() =>{
      const response = await contract.getUserProfile({from: account});

      setUserInfo({
        address: account, 
        fullName: (response[0]) ? response[0] : "NA", 
        gender: (response[1]) ? response[1] : "NA", 
        email: (response[2]) ? response[2] : "NA", 
        contact: (response[3].words[0]) ? response[3].words[0] : "NA", 
        residential_addr: (response[4]) ? response[4] : "NA"
      });
    }

    getUserInfo();
  }, [])

  


  return (
    <div className='container profile-main-div explore-maindiv'>

      {(update) ? 
      
        <>
          <div className='row'>
            <div className='col-12 col-sm-6'>
              <form method='POST' className='admin-form'>
                <div className='form-group'>
                    <label>Full Name</label>
                    <input type="text" className="form-control" name="fullName" placeholder="Enter full name" 
                    autoComplete="off" value={userInfo.fullName} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>Gender</label>
                    <select className='select-gender' name='gender' defaultValue={userInfo.gender} onChange={onChangeFunc}>
                      <option selected value="NA" >NA</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="I prefer not to say">I prefer not to say</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" placeholder="Enter email" 
                    autoComplete="off" value={userInfo.email} onChange={onChangeFunc}/>
                </div>
              </form>
            </div>
            <div className='col-12 col-sm-6'>
              <form method='POST' className='admin-form'>
                <div className='form-group'>
                    <label>Contact number</label>
                    <input type="number" className="form-control" name="contact" placeholder="Enter contact" 
                    autoComplete="off" value={userInfo.contact} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label>Residential Address</label>
                    <input type="text" className="form-control" name="residential_addr" placeholder="Enter residential address" 
                    autoComplete="off" value={userInfo.residential_addr} onChange={onChangeFunc}/>
                </div>
              </form>
            </div>
          </div>
          <button className='update-btn' onClick={handleUpdate}>Confirm Update</button>
        </>
      
        :

        <>
        <div className='row'>
          <div className='col-12 col-sm-6'>
              <label><b>Owner Address</b></label>
              <p>{userInfo.address}</p>

              <label><b>Full Name</b></label>
              <p>{userInfo.fullName}</p>

              <label><b>Gender</b></label>
              <p>{userInfo.gender}</p>
          </div>

          <div className='col-12 col-sm-6'>
              <label><b>Email</b></label>
              <p>{userInfo.email}</p>

              <label><b>Contact Number</b></label>
              <p>{userInfo.contact}</p>

              <label><b>Resindential Address</b></label>
              <p>{userInfo.residential_addr}</p>
          </div>
        </div>
        <button className='update-btn' onClick={() => {setUpdate(true)}}>Update Profile</button>
        </>
      }
    </div>
  )
}

export default Profile