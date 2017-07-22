import React, { Component } from 'react';
import { connect } from "react-redux";
import ImageEditor from '../../../components/ImageEditor';

import {getUser} from '../../../helpers/index.js'


class UProfDiv extends Component {

  constructor(props){
    super(props)
    this.state = {
      editActive: false
    }
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  toggleEdit(){
    this.setState({editActive: !this.state.editActive });
  }

  render(){
    const user = this.props.user;
    console.log(this.props);

    if (this.props.loading) return (<h1> Loading... </h1>);
      return (
        <div className="profile__topbody__left__profblock">
          {(this.state.editActive) ? (
            <ImageEditor
              onSave={this.props.onSave}
              user={this.props.user}
              class="profile__topbody__left__profblock__imgdiv"
              type="user"
              toggleEdit={this.toggleEdit} />
          ):(
            <div>
              <div className="profile__topbody__left__profblock__imgdiv">
                <div className="profile__topbody__left__profblock__imgdiv__imgborder">
                  <img className="profile__topbody__left__profblock__imgdiv__imgborder__pic"
                    src={user.profile_image.img}
                    style={JSON.parse(user.profile_image.imageStyle)}
                  />
                </div>
                <img className="profile__topbody__left__profblock__imgdiv__stars" src="http://keycdn.theouterhaven.net/wp-content/uploads/2014/12/5star.png-610x0.png" />
              </div>
              <div className="profile__topbody__left__profblock__proftext">
                <h1> </h1>
                <h3> Guitarist/Singer </h3>
              </div>
              <button onClick={this.toggleEdit}> Edit Profile Picture </button>
            </div>
          )}
        </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    isAuth: state.user.isAuth,
    user: state.user.user,
    error: state.user.error,
    loading: state.user.loading,
    // id: state.user.user
  };
}

function mapDispatchToProps(dispatch){
  // return bindActionCreators({ loginUser }, dispatch);
}

export default connect(mapStateToProps)(UProfDiv);

// export default ProfilePage;