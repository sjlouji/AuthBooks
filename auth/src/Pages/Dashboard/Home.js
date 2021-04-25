import React, { Component,Suspense } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import AppsIcon from '@material-ui/icons/Apps';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {withRouter} from 'react-router'
import { logout } from '../../Store/Action/auth'
import  PrivateRoute  from '../../Route/PrivateRoute';
import { createBrowserHistory } from 'history';
import Sidebar from '../../Components/Sidebar/Sidebar'

const history = createBrowserHistory();
export class HomePage extends Component {

    render() {
        return(
            <div>
                <Sidebar />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  });

export default connect(mapStateToProps, {logout})(withRouter(HomePage));