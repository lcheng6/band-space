import React, { Component } from 'react';
import { connect } from "react-redux";

import ImageEditor from './ImageEditor';
import SVGInline from 'react-inlinesvg';
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage'
import getImageStyle from '../../../utilities/getImageStyle'


class ImageDisplay extends Component {

  constructor(props){
    super(props)
    this.state = {
      editActive: false,
      data: false
    }

    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleSave = this.handleSave.bind(this);
  }

  toggleEdit(){
    this.setState({editActive: !this.state.editActive });
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currUser !== null) {
      this.setState({data:true});
    }
  }

  handleSave(update) {
    const saveSelect = {
      user: this.props.updateUser,
      venue: this.props.updateVenue,
      group: this.props.updateGroup,
    }
    saveSelect[this.props.type](update);
  }

  render(){
    if (this.props.error) {
      console.log("error", this.props.error);
      return <ErrorMessage message={this.props.error} onRetry={()=>console.log('Sorry')} />
    }
    if (this.props.isLoading) return (<Spinner />);

    const subject = this.props.subject;

    return (
      <div className="profile__topbody__left__profblock">
        {(this.state.editActive) ? (
          <ImageEditor
            onSave={this.handleSave}
            subject={subject}
            class="profile__topbody__left__profblock__imgdiv"
            toggleEdit={this.toggleEdit}
            error={this.props.error}
          />
        ):(
          <div>
            <div className="profile__topbody__left__profblock__imgdiv">
              <div className="profile__topbody__left__profblock__imgdiv__imgborder">
                <img className="profile__topbody__left__profblock__imgdiv__imgborder__pic"
                  src={subject.profile_image.img}
                  style={getImageStyle(subject.profile_image)}
                />
              </div>
              {/* <img className="profile__topbody__left__profblock__imgdiv__stars" src="http://keycdn.theouterhaven.net/wp-content/uploads/2014/12/5star.png-610x0.png" /> */}
            </div>
            <div className="profile__topbody__left__profblock__proftext">
              <h1 style={{"fontSize" : 50}}> {subject.name}</h1>
              <h3 style={{"fontSize" : 20}}> Guitarist/Singer </h3>
            </div>
            <div onClick={this.toggleEdit}>
            <SVGInline className="editProfPic" src="img/edit.svg" />
            </div>
          </div>
          )}
        </div>
    )
  }
}

export default ImageDisplay
// export default ProfilePage;
