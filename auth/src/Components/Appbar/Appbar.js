import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../Logo/Logo';
import Profile from './Profile';
import Search from './Search';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import {withRouter} from 'react-router'

export class Sidebar extends Component {
    // PROPS
    // 1. username - Name to be displayed
    // 2. email - Email to be displayed
    // 3. logout - Callback function to handle Logout.  To perform logout, id must be equal to `Logout`
    // 4. appbarMenu: [
    //     { id: 'name', icon: <icon /> ,to: 'path', },
    // ]

    // State
    state = {
        open: false,
        anchorEl: null,
    }

    // Constructor
    constructor(props){
        super(props);
        this.handleToggle = this.handleToggle.bind(this)
        this.handleNav = this.handleNav.bind(this)
        this.myRef = React.createRef();
    }

    //  Open and close the login and logout tab
    handleToggle(event) { 
        this.setState({
            anchorEl: event.currentTarget,
            open: !this.state.open,
        })
    }

    // Handle Logout and Naviagtion
    handleNav(data, event, id) {
        this.handleToggle(event)
        if (id === 'Logout') {
            this.props.logout()
        }
        this.props.history.push(data) 
     }
 
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
                        <div onClick={(event)=>this.handleToggle(event)}  style={{ cursor: 'pointer' }}>
                            <Profile 
                                style={{ float: 'right', width: '35px', height: '35px', background: randomElement}}
                                value = {this.props.username ? this.props.username.slice(0,1).toUpperCase() : ''}
                            />
                        </div>
                        <div>
                            <Popper open={this.state.open} anchorEl={this.state.anchorEl} transition disablePortal>
                                    <Paper style={{ width: '250px', border: '1px solid #cecece'}} elevation="0">
                                        <div style={{ padding: '25px' }}>
                                            <Grid container spacing={3}>
                                                <Grid xs={3}> 
                                                    <Avatar style={{ width: '40px', height: '40px' }}>{this.props.username ? this.props.username.slice(0,1).toUpperCase() : ''}</Avatar>
                                                </Grid>
                                                <Grid xs={6}>
                                                    <Typography style={{ fontFamily: 'Roboto,RobotoDraft,Helvetica,Arial,sans-serif', fontSize: '13px', fontWeight: '800' }}>
                                                        {this.props.username ? this.props.username: ''}
                                                    </Typography>
                                                    <Typography variant="body2" style={{ fontFamily: 'Roboto,RobotoDraft,Helvetica,Arial,sans-serif', fontSize: '13px', fontWeight: '400' }}>
                                                        {this.props.email ? this.props.email: ''}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <Divider />
                                        <ClickAwayListener onClickAway={(event)=>this.handleToggle(event)}>
                                        <MenuList autoFocusItem={this.state.open} id="menu-list-grow">
                                            {this.props.item.map((el) => {
                                                return (
                                                    <MenuItem onClick={(event) => this.handleNav(el.to, event, el.id)}>
                                                        <ListItemIcon>
                                                            {el.icon}
                                                        </ListItemIcon>
                                                        <Typography style={{ fontFamily: 'Roboto,RobotoDraft,Helvetica,Arial,sans-serif', fontSize: '13px', fontWeight: '400' }}>
                                                            {el.id}
                                                        </Typography>
                                                    </MenuItem> 
                                                )                           
                                            })}
                                        </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                            </Popper>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(Sidebar);