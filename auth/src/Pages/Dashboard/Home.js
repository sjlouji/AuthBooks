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
import Appbar from '../../Components/Appbar/Appbar'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import BlockIcon from '@material-ui/icons/Block';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import Typography from '@material-ui/core/Typography';

const history = createBrowserHistory();
export class HomePage extends Component {
    // State
    state = {
        sidebarItem: [
            { id: 'Users', icon: <PeopleOutlineIcon /> ,to: '/', isActive: true },
            { id: 'Black List', icon: <BlockIcon /> ,to: '/blacklist', isActive: false},
            { id: 'Permissions', icon: <VerifiedUserIcon /> ,to: '/permissions', isActive: false},
            { id: 'Activity Monitoring', icon: <InboxIcon /> ,to: '/logs', isActive: false},
            { id: 'SSO Users', icon: <SupervisedUserCircleIcon /> ,to: '/sso/users', isActive: false},
            { id: 'SSO User Activity', icon: <LocalActivityIcon /> ,to: '/sso/logs', isActive: false},
          ],
    }

    // Excecuted when component recieves new props
    componentWillReceiveProps(nextProps) {
        this.setDrawerState(nextProps)
    }

    // Excecuted when the component loads first time
    componentDidMount() {
        this.setDrawerState(this.props);    
    }

    // Updates the drawer state
    setDrawerState(props) {
        this.setState({ sidebarItem:  this.state.sidebarItem.map((el, index)=> {
            if (props.location.pathname === el.to) el.isActive = true
            else el.isActive = false
            return el;
        })})
    }

    render() {
        if(!this.props.isAuthenticated) {
            this.props.history.push('/auth/login')
        }
        return(
            <div>
                {/* Appbar */}
                <Appbar
                    username={this.props.user ? this.props.user.firstName : ''}
                />
                {/* Sidebar */}
                <Sidebar item={this.state.sidebarItem}/>
                {/* Content */}
                <main style={{ padding: '100px', marginLeft: '170px'}}>
                    <Suspense fallback='Loading'>
                        {renderRoutes(this.props.route.routes)}
                    </Suspense>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  });

export default connect(mapStateToProps, {logout})(withRouter(HomePage));