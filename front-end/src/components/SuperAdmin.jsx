import React, { useEffect, useState } from 'react'
import emblem from '../images/emblem.svg'
import '../css/SuperAdmin.css'
import { NavLink } from 'react-router-dom';

const SuperAdmin = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  
  const [adminData, setAdminData] = useState({
    address:"", state:"", district:"", city:""
  });

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setAdminData({...adminData, [name]:value});
  }

  const handleSubmit = async () =>{
    await contract.addAdmin(adminData.address, adminData.state, adminData.district, adminData.city, {
      from: account
    })

    console.log('admin details submitted');
    setAdminData({address:"", state:"", district:"", city:""});
  }


  return (
    <div className='container superAdmin-mainDiv'>
      <div className='superAdmin-heading-div'>
          <NavLink to='/'>
          <img src={emblem} alt="emblem" className="emblem" />
          </NavLink>
          <h1>Super Admin</h1>
      </div>

      <p className='superAdmin-p'>Add an Admin</p>

      <form method='POST' className='admin-form'>
        <div className='form-group'>
            <label>Admin Address</label>
            <input type="text" className="form-control" name="address" placeholder="Enter admin address" 
            autoComplete="off" value={adminData.address} onChange={onChangeFunc}/>
        </div>
        <div className='form-group'>
            <label>State</label>
            <input type="text" className="form-control" name="state" placeholder="Enter state" 
            autoComplete="off" value={adminData.state} onChange={onChangeFunc}/>
        </div>
        <div className='form-group'>
            <label>District</label>
            <input type="text" className="form-control" name="district" placeholder="Enter district" 
            autoComplete="off" value={adminData.district} onChange={onChangeFunc}/>
        </div>
        <div className='form-group'>
            <label>City</label>
            <input type="text" className="form-control" name="city" placeholder="Enter city" 
            autoComplete="off" value={adminData.city} onChange={onChangeFunc}/>
        </div>
      </form>
      <button className='admin-form-btn' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default SuperAdmin