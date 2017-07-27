import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { actions as venueActions } from '../../../../state/ducks/venue'

import VenueList from './VenueList'

function mapStateToProps(state) {
  return {
    	user: state.auth.user,
      isAuth: state.auth.isAuth,
      
      isLoading: state.venue.loading,
      error: state.venue.error,
      venues: state.venue.venueList,
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...venueActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueList);
