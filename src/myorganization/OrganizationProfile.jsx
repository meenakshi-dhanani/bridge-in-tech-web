import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { BASE_API } from "../config";
import "./Organization.css";
import { SERVICE_UNAVAILABLE_ERROR } from "../messages";
import { TIMEZONES, STATUS } from "../enums";

export default function OrganizationProfile() {
  const [responseMessage, setResponseMessage] = useState(null);
  const [organizationProfile, setOrganizationProfile] = useState({});
  const { access_token } = useContext(AuthContext);
  const [isValidPhone, setIsValidPhone] = useState(true);
  

  const requestOrganizationProfile = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    fetch(`${BASE_API}/organization`, requestOrganizationProfile)
      .then(async response => {
        const data = await response.json();
        if (response.ok)
          return setOrganizationProfile(data);
        return setResponseMessage(data.message);
      })
      .catch(() =>
        setResponseMessage(SERVICE_UNAVAILABLE_ERROR)
      )
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    let payload = {}
    new FormData(e.target).forEach((value, key) => {
      if (key === "representativeName" )
        return;
      payload[key] = value;
    });
    const requestUpdateOrganization = {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    };
    fetch(`${BASE_API}/organization`, requestUpdateOrganization)
      .then(async response => {
        let data = await response.json();
        if (response.ok) 
          return setResponseMessage(data.message)
        setResponseMessage(data.message);
      })
      .catch(() =>
        setResponseMessage(SERVICE_UNAVAILABLE_ERROR)
      )
  }

  const validatePhone = e => {
    setIsValidPhone(e.target.checkValidity());
  };
  
  const optionsWithDefaultSelection = (value, receivedValue) => {
    if (value === "UTC+00:00/Greenwich Mean Time and Western European Time" && !receivedValue){
      return <option key={value} value={value} selected>{value}</option>
    }
    if (value === "Draft" && !receivedValue){
      return <option key={value} value={value} selected>{value}</option>
    }
    return <option key={value} value={value}>{value}</option>
  };
  return (
      <div className="container" id="organizationProfile">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Organization Profile</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form className="organization-form mx-auto" onSubmit={handleSubmit}>
              <form-group controlId="formRespresentativeName">
                <p className="input-control">
                  <label id="representativeName">Representative name :</label>
                  <input className="field"
                    type="text"
                    aria-labelledby="representativeName"
                    name="representativeName"
                    defaultValue={organizationProfile.representative_name}
                    disabled
                  />
                </p>
              </form-group>
              <div><br></br></div>
              <form-group controlId="formRRepresentativeDepartment">
                <p className="input-control">
                  <label id="representativeDepartment">Representative Department :</label>
                  <input className="field"
                    type="text"
                    aria-labelledby="representativeDepartment"
                    name="representative_department"
                    defaultValue={organizationProfile.representative_department}
                    required
                  />
                </p>
              </form-group>
              <div><br></br></div>
              <form-group controlId="formName">
                <p className="input-control">
                  <label id="name">Organization Name :</label>
                  <input className="field"
                    type="text"
                    aria-labelledby="name"
                    name="name"
                    defaultValue={organizationProfile.organization_name}
                    required
                  />
                </p>
              </form-group>
              <div><br></br></div>
              <form-group controlId="formEmail">
                <p className="input-control">
                  <label id="email">Email :</label>
                  <input className="field"
                    type="email"
                    aria-labelledby="email"
                    name="email"
                    defaultValue={organizationProfile.email}
                    required
                  />
                </p>
              </form-group>
              <div><br></br></div>
              <form-group controlId="formAbout">
                <p className="input-control">
                  <label id="about">About the organization :</label>
                  <input className="field"
                    type="text"
                    aria-labelledby="about"
                    name="about"
                    defaultValue={organizationProfile.about}
                  />
                </p>
              </form-group>
              <div><br></br></div>
              <form-group controlId="formAddress">
                <p className="input-control">
                  <label id="address">Organization Address :</label>
                  <input className="field"
                    type="text"
                    aria-labelledby="address"
                    name="address"
                    defaultValue={organizationProfile.address}
                    required
                  />
                </p>
              </form-group>
              <div><br></br></div>
              <form-group controlId="formWebsite">
                <p className="input-control">
                  <label id="website">Website :</label>
                  <input className="field"
                    type="url"
                    aria-labelledby="website"
                    name="website"
                    defaultValue={organizationProfile.website}
                    required
                  />
                </p>
              </form-group>
              <div><br></br></div>
              <div className="input-group mb-3">
                <p className="input-control">
                  <label htmlFor="timezone">Timezone</label>
                  <select className="custom-select" name="timezone" id="timezone">
                    <option 
                    defaultValue="UTC+00:00/Greenwich Mean Time and Western European Time">{organizationProfile.timezone}
                    </option>
                      {TIMEZONES.map((timezone) => optionsWithDefaultSelection(timezone, organizationProfile.timezone))}
                  </select>
                </p>
              </div>
              <form-group controlId="formPhone">
                <p className="input-control">
                  <label htmlFor="phone">Phone :</label>
                  <input className="field"
                    type="text"
                    name="phone"
                    defaultValue={organizationProfile.phone}
                    pattern="^[0-9\s\-\+]+$"
                    onChange={validatePhone}
                  />
                </p>
                {!isValidPhone && (
                  <span className="error">
                    Must only contain numbers between 0-9, may start with plus "+" before country code, and may have dash "-"
                  </span>
                )}
              </form-group>
              <div><br></br></div>
              <div className="input-group mb-3">
                <p className="input-control">
                  <label htmlFor="status">Status</label>
                  <select className="custom-select" name="status" id="status">
                    <option 
                    defaultValue="Draft">{organizationProfile.status}
                    </option>
                      {STATUS.map((status) => optionsWithDefaultSelection(status, organizationProfile.status))}
                  </select>
                </p>
              </div>
              
              <div><br></br></div>
              <div>
                  {responseMessage && <span className="error" name="response" aria-label="response" role="alert">{responseMessage}</span>}
              </div>
              <div className="row">
                <div className="col-sm-6 offset-sm-9">
                  <button className="btn btn-success"
                    variant="success"
                    type="submit"
                    name="submit"
                    value="Save"
                  >Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}
