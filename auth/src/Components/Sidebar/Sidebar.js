import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router'
import ListSubheader from '@material-ui/core/ListSubheader';

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
    // SAMPLE DATA
    // const sidebarItem = [
    //       {
    //         id: 'title_name',
    //         data: [
    //           { id: 'name', icon: <icon /> ,to: 'route', isActive: false },
    //       ]
    //     },
    //     {
    //         id: 'title_name',
    //         data: [
    //           { id: 'name', icon: <icon /> ,to: 'route', isActive: false},
    //       ]              
    //     }
    //   ];

    // Handle Navigation
    handleNav(data) {
       this.props.history.push(data) 
    }

    render() {
        const { classes, item } = this.props;
        return(
            <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
                <div style={{ marginTop: '70px' }}>
                    {item.map((el) => {
                        return (
                            <List subheader={<ListSubheader style={{ fontSize: '12px'}}>{el.id}</ListSubheader>}>
                                {
                                    el.data.map((val) => {
                                        return (
                                            <ListItem button key={val.id} className={val.isActive ? classes.isActive : classes.listItem} onClick={() => this.handleNav(val.to)}>
                                                <ListItemIcon className={val.isActive ? classes.itemColor : ''}>{val.icon}</ListItemIcon>
                                                <ListItemText primary={val.id} disableTypography className={val.isActive ? classes.itemTextIsActive : classes.itemText}/>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        )
                    })}
                </div>
            </Drawer>
        );
    }
}

export default (withStyles(useStyles))(withRouter(Sidebar));