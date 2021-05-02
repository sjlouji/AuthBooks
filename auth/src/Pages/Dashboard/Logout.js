import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../../Store/Action/auth'
import {withRouter} from 'react-router'

export class Logout extends Component {
    componentDidMount() {
        this.props.logout()
    }
    render() {
        this.props.history.push('/auth/login')
        return null
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  });

  export default connect(mapStateToProps, {logout})(withRouter(Logout));
