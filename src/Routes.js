import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Members from "./members/Members";
import MemberPortfolio from "./members/MemberPortfolio";
import MemberProfile from "./members/MemberProfile";
import Portfolio from "./myspace/Portfolio";
import PersonalDetails from "./myspace/PersonalDetails";
import AdditionalInfo from "./myspace/AdditionalInfo";
import PersonalBackground from "./myspace/PersonalBackground";
import Organizations from "./organizations/Organizations";
import OtherOrganizationPortfolio from "./organizations/OtherOrganizationPortfolio";
import OtherOrganizationProfile from "./organizations/OtherOrganizationProfile";
import OtherProgramProfile from "./organizations/OtherProgramProfile";
import OrganizationPortfolio from "./myorganization/OrganizationPortfolio";
import OrganizationProfile from "./myorganization/OrganizationProfile";
import ProgramProfile from "./myorganization/ProgramProfile";
import Register from "./register/Register";
import Login from "./login/Login";
import ProtectedRoute from "./ProtectedRoute";
import Navigation from "./Navigation";
import AuthProvider from "./AuthContext";


export default function Routes() {

  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <ProtectedRoute exact path="/members">
            <Members />
          </ProtectedRoute>
          <ProtectedRoute path="/members/portfolio/">
            <MemberPortfolio />
          </ProtectedRoute>
          <ProtectedRoute path="/members/profile/">
            <MemberProfile />
          </ProtectedRoute>
          <ProtectedRoute exact path="/organizations">
            <Organizations />
          </ProtectedRoute>
          <ProtectedRoute path="/organizations/portfolio/">
            <OtherOrganizationPortfolio />
          </ProtectedRoute>
          <ProtectedRoute path="/organizations/profile/">
            <OtherOrganizationProfile />
          </ProtectedRoute>
          <ProtectedRoute path="/organizations/programs/">
            <OtherProgramProfile />
          </ProtectedRoute>
          <ProtectedRoute
            exact path="/portfolio">
            <Portfolio />
          </ProtectedRoute>
          <ProtectedRoute
            exact path="/personal-details">
            <PersonalDetails />
          </ProtectedRoute>
          <ProtectedRoute
            exact path="/additional-info">
            <AdditionalInfo />
          </ProtectedRoute>
          <ProtectedRoute
            exact path="/personal-background">
            <PersonalBackground />
          </ProtectedRoute>
          <ProtectedRoute
            exact path="/request-history">
          </ProtectedRoute>
          <ProtectedRoute
            exact path="/organization-portfolio">
            <OrganizationPortfolio />
          </ProtectedRoute>
          <ProtectedRoute
            exact path="/organization-profile">
            <OrganizationProfile />
          </ProtectedRoute>
          <ProtectedRoute
            path="/organization-programs/">
            <ProgramProfile />
          </ProtectedRoute>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}