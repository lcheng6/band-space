import Signup from './Signup.js'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { actions as authActions } from '../../../../state/ducks/auth'

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuth: state.auth.isAuth,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ ...authActions }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
