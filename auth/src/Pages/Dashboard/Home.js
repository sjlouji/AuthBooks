import React, { Component,Suspense } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import {withRouter} from 'react-router'
import { logout } from '../../Store/Action/auth'
import { createBrowserHistory } from 'history';
import Sidebar from '../../Components/Sidebar/Sidebar'
import Appbar from '../../Components/Appbar/Appbar'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import BlockIcon from '@material-ui/icons/Block';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const history = createBrowserHistory();
export class HomePage extends Component {
    // State
    state = {
        sidebarItem: [
          {
              id: 'Auth',
              data: [
                { id: 'Users', icon: <PeopleOutlineIcon style={{ fontSize: '20px' }}/> ,to: '/', isActive: true },
                { id: 'Black List', icon: <BlockIcon style={{ fontSize: '20px' }}/> ,to: '/blacklist', isActive: false},
                { id: 'Permissions', icon: <VerifiedUserIcon style={{ fontSize: '20px' }}/> ,to: '/permissions', isActive: false},
                { id: 'Activity Monitoring', icon: <InboxIcon style={{ fontSize: '20px' }}/> ,to: '/logs', isActive: false},
            ]
          },
          {
              id: 'Sso',
              data: [
                { id: 'SSO Users', icon: <SupervisedUserCircleIcon style={{ fontSize: '20px' }}/> ,to: '/sso/users', isActive: false},
                { id: 'SSO User Activity', icon: <LocalActivityIcon style={{ fontSize: '20px' }}/> ,to: '/sso/logs', isActive: false},
            ]              
          }
        ],
        appbarMenu: [
            { id: 'My Account', icon: <SupervisorAccountIcon style={{ fontSize: '20px' }}/> ,to: '/profile' },
            { id: 'Logout', icon: <ExitToAppIcon style={{ fontSize: '20px' }}/> ,to: '/', },
        ],
        user: null,
    }

    // Excecuted when component recieves new props
    componentWillReceiveProps(nextProps) {
        this.checkAuth();   
        this.setDrawerState(nextProps)
        this.updateUser(nextProps);
    }

    // Excecuted when the component loads first time
    componentDidMount() {
        this.checkAuth();   
        this.updateUser(this.props);
        this.setDrawerState(this.props); 
    }

    // Redirect to login page
    checkAuth(){
        if(!this.props.isAuthenticated) {
            this.props.history.push('/auth/login')
        }
    }

    // Updates the drawer state
    setDrawerState(props) {
        this.setState({ sidebarItem:  this.state.sidebarItem.map((el, index)=> {
            el.data.map((val) => {
                if (props.location.pathname === val.to) val.isActive = true
                else val.isActive = false
                return val;
            })
            return el;
        })})
    }

    // Update User Data
    updateUser(props) {
        if(props) {
            this.setState({
                user: props.user || null,
            })
        }
    }

    // Handle Logout
    handleLogout() {
        this.props.logout()
    }

    render() {
        this.checkAuth()
        return(
            <div>
                {/* Appbar */}
                <Appbar
                    username={this.state.user ? this.state.user.firstName : ''}
                    email={this.state.user ? this.state.user.email : ''}
                    item={this.state.appbarMenu}
                    logout={() => this.handleLogout()}
                />
                {/* Sidebar */}
                <Sidebar 
                    item={this.state.sidebarItem} />
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