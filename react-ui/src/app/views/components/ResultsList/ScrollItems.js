import React from 'react'
import { Link } from 'react-router-dom'

import getImageStyle from '../../../utilities/getImageStyle'

export const VenueItem = ({ item }) => (
  <Link to={`/venues/${item._id}`}>
    <div className="mreview__body__item">
      <div className="mreview__body__item__imgdiv">

        <img className="mreview__body__item__imgdiv__img"
          src={(item && item.images && item.images.length > 0) ?
          item.images[0] : "http://lorempixel.com/100/100"}
        />
        <h3> {item.name} </h3>
      </div>
      <div className="mreview__body__item__text">
        <p>{item.description}</p>
        {/* <img src="http://lorempixel.com/500/100" /> */}
        <ul>
          {item && item.staff && item.staff.map( (staff, index) => (
            <li key={index}> {staff.name}: {staff.role} </li>
          ))}
        </ul>
      </div>
    </div>
  </Link>
);

export const UserItem = ({ item }) => (
  <Link to={`/users/${item._id}`}>
    <div className="mreview__body__item">
      <div className="mreview__body__item__imgdiv">
        {item && item.profile_img &&
          <img className="mreview__body__item__imgdiv__img"
            src={item.profile_image.img}
            // style={getImageStyle(item.profile_image)}
          />
        }
        {item &&
          <h3> {item.name} </h3>
        }
      </div>
      <div className="mreview__body__item__text">
        <p>{item.description}</p>
        {/* <img src="http://lorempixel.com/500/100" /> */}
        <ul>
          {item && item.groups && item.groups.map( (group, index) => (
            <li key={index}> Group#{index}: {group.name} </li>
          ))}
        </ul>
      </div>
    </div>
  </Link>
);

export const GroupItem = ({ item }) => (
  <Link to={`/groups/${item._id}`}>
    <div className="mreview__body__item">
      <div className="mreview__body__item__imgdiv">
        <img className="mreview__body__item__imgdiv__img" src="http://lorempixel.com/100/100" />
        <h3> {item.name} </h3>
      </div>
      <div className="mreview__body__item__text">
        <p>{item.description}</p>
        {/* <img src="http://lorempixel.com/500/100" /> */}
        <ul>
          {item.members && item.members.map( (member, index) => (
            <li key={index}> Member#{index}: {member.name} - {member.instrument} </li>
          ))}
        </ul>
      </div>
    </div>
  </Link>
);
