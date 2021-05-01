import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router'

const drawerWidth = 240;

const useStyles = ((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: 0,
      borderRight: '0'
    },
    drawerContainer: {
      overflow: 'auto',
    },
    isActive: {
        backgroundColor: '#e8f0fe',
        color: '#1967d2',
        borderRadius: '0px 50px 50px 0px'
    },
    listItem: {
        borderRadius: '0px 50px 50px 0px',
        color: '#5f6368'
    },
    itemColor: {
        color: '#1967d2',
    },
    itemTextIsActive: {
        fontFamily: 'Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
        fontSize: '13px',
        fontWeight: '800'
    },
    itemText: {
        fontFamily: 'Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
        fontSize: '13px',
        fontWeight: '400'
    }
  }));

export class Sidebar extends Component {
    // PROPS
    // 1. item - Array of Objects
    // const sidebarItem = [
    //    { id: 'name_to_display', icon: icon_component ,to: to_which_page, isActive: true || false},
    // ];

    // Handle Navigation
    handleNav(data) {
       this.props.history.push(data) 
    }

    render() {
        const { classes } = this.props;
        return(
            <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
                <div style={{ marginTop: '70px' }}>
                    <List>
                        {this.props.item.map((data)=> {
                            return (
                                <ListItem button key={data.id} className={data.isActive ? classes.isActive : classes.listItem} onClick={() => this.handleNav(data.to)}>
                                    <ListItemIcon className={data.isActive ? classes.itemColor : ''}>{data.icon}</ListItemIcon>
                                    <ListItemText primary={data.id} disableTypography className={data.isActive ? classes.itemTextIsActive : classes.itemText}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            </Drawer>
        );
    }
}

export default (withStyles(useStyles))(withRouter(Sidebar));