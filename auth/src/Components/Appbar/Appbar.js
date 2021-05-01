import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../Logo/Logo';
import Profile from './Profile';
import Search from './Search';

export class Sidebar extends Component {
    render() {
        const colors = ['#C62828', '#AD1457', '#6A1B9A', '#4527A0', '#283593', '#1565C0', '#D84315', '#424242'];
        const randomElement = colors[Math.floor(Math.random() * colors.length)];
        return(
            <div>
                <AppBar position="fixed" color="inherit" elevation="0" style={{ borderBottom: '1px solid #cecece' }}>
                    <Toolbar>
                        {/* Logo */}
                        <Logo />

                        {/* Search bar */}
                        <Search />

                        {/* Profile Icon */}
                        <Profile 
                            style={{ float: 'right', width: '35px', height: '35px', background: randomElement}}
                            value = {this.props.username ? this.props.username.slice(0,1).toUpperCase() : ''}
                        />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default (Sidebar);