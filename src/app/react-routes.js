import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  ReactDOM
} from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
  loginUser, logoutUser, meFromToken,
  meFromTokenSuccess, meFromTokenFailure } from './actions/userActions'

// import { elastic as Menu } from 'react-burger-menu'
import Menu from './components/bMenu.js'

import Auth from '../../server/config/auth.js';

import Main from './containers/Main.js';
// import Signup from './containers/SignUpContainer.js';
import SignUpPage from './containers/SignUpPageContainer.js'
import LogInPage from './containers/LogInPageContainer.js'
import CreateBand from './containers/createband.js';
import Profile from './containers/profile.js';
import Search from './containers/Search.js';
import Gigs from './containers/Gigs.js';
import CreateGroup from './containers/CreateGroup.js';
import ManageGroup from './containers/ManageGroup.js';

class AppRoutes extends Component {
  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this);
  }

  showSettings (event) {
    event.preventDefault();
  }

  componentWillMount(){
    // If user is not already authenticated
    if (this.props.isAuth) return;
    // Get token from local storage, quit if its null
    let token = localStorage.getItem('jwtToken');
  	if(!token || token === '') return;
    console.log("local token:", token);

  	// fetch user from token (if server deems it's valid token)
    this.props.meFromToken(token)
    .then((response) => {
      if (!response.error) {
      	// reset token (possibly new token that was regenerated by the server)
      	localStorage.setItem('jwtToken', response.payload.data.token);
        this.props.meFromTokenSuccess(response.payload);
      } else {
      	localStorage.removeItem('jwtToken');//remove token from storage
        this.props.meFromTokenFailure(response.payload);
      }
    });
	 }

   handleLogout() {
     //Delete token from local storage
     localStorage.removeItem('jwtToken');
     // dispatch logout action
     this.props.logoutUser();
   }

  render(){
    return(
      <Router>
        <main id="outer-container">
          <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
            <div className="navUser">
              {this.props.isAuth ? <Link to="/profile"> <img className="navUser__icon" src="http://lorempixel.com/100/100" /> </Link> : <img className="navUser__icon" src="./img/user.svg" /> }
              <p className="navUser__userName">
                {this.props.isAuth ? this.props.user.email : "Guest User" }
              </p>
            </div>
            <br/>

            <Link to="/">
              <div className="navLinks">
                <img className="navLinks__icon" src="./img/home.svg" />
                <p id="home" className="menu-item">Home</p>
              </div>
            </Link>

            { !this.props.isAuth ? (
            <Link to="/signup">
              <div className="navLinks">
                <img className="navLinks__icon" src="./img/login.svg" />
                <p id="home" className="menu-item">Log In/Signup</p>
              </div>
            </Link>
            ) : (
            <Link to="/">
              <div className="navLinks">
                <img className="navLinks__icon" src="./img/logout.svg" />
                <p className="menu-item" onClick={this.handleLogout}> Log Out </p>
              </div>
            </Link>
            )}
            <Link to="/gigs">
              <div className="navLinks">
                <img className="navLinks__icon" src="./img/map.svg" />
                <p id="gigFind" className="menu-item">Find Gigs</p>
              </div>
            </Link>
            <Link to="/creategroup">
              <div className="navLinks">
                <img className="navLinks__icon" src="./img/group.svg" />
                <p id="createGroup" className="menu-item">Create a Group</p>
              </div>
            </Link>
            <Link to="/managegroup">
              <div className="navLinks">
                <img className="navLinks__icon" src="./img/addgroup.svg" />
                <p id="manageGroup" className="menu-item">Manage Groups</p>
              </div>
            </Link>
          </Menu>
          <div id="page-wrap">
            <Route exact path="/" component={Main} />
            <Route path="/bandcreate" component={CreateBand} />
            <Route path="/profile" component={Profile} />
            <Route path="/search" component={Search} />
            <Route path="/gigs" component={Gigs} />
            <Route path="/creategroup" component={CreateGroup} />
            <Route path="/managegroup" component={ManageGroup} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/login" component={LogInPage} />
          </div>
        </main>
      </Router>
  )
  }
}

function mapStateToProps(state) {
  return {
    	user: state.user.user,
      isAuth: state.user.isAuth,
      error: state.error,
      loading: state.loading,
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser, logoutUser, meFromToken, meFromTokenSuccess, meFromTokenFailure }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
// export default AppRoutes;
//REDUX MAGIC! This puts both of our functions into the Component's props and links them to dispatch
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({ incrementCount, decrementCount }, dispatch);
// }
//
// //MORE REDUX MAGIC! This function takes in all of our Application State and takes pieces of it and maps it
// //to the Component's props.
// function mapStateToProps(state) {
//   return {
//
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes)
// // export default AppRoutes
