import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
// import { SessionContext } from "./session";

export default function Logout() {
    Cookies.remove("user");
    Cookies.remove("access_token");
    Cookies.remove("access_expiry");
    return <Redirect to="/" />;
  };
  