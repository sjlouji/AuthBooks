import React, { Component } from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router'
import { Grid } from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import UserTable from '../../../Components/Table/UserTable';
import { connect } from 'react-redux';
import { loadUserList } from '../../../Store/Action/user'
import Moment from 'react-moment';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export class UsersPage extends Component {

    // Contructor
    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
    }

    // Holds the state
    state = {
        column: [
            { name: "firstName", label: "Name", options: {filter: false} },
            { name: "email", label: "Email", options: {filter: false} },
            { name: "isActive", label: "Is Active", options: {filter: true} },
            { name: "user_type", label: "User Type", options: {filter: false} },
            { name: "createdAt", label: "Created At", options: {filter: false, sort: true} },
            { name: "actions", label: "", options: {filter: false, sort: true} },
        ],
        row: [],
        open: false,
        error: ''
    }

    componentWillReceiveProps(nextProps) {
        // Push the user data to state
        if(nextProps.user && nextProps.user.user){
            this.setUserState(nextProps)
        }
        // Handle Error
        if(nextProps.error !== undefined){
            // Network Error
            if(nextProps.error.message === 'Network Error'){
                this.setState({error: nextProps.error.message, open: true})
            }else{
            // Other Errors 
                nextProps.error.response.data && nextProps.error.response.data.error.map((el => {
                    this.setState({
                        open: true,
                        error: el.message
                    })
                }))
            }
        }
    }

    // Converts user data into MD table readabble format
    setUserState(props) {
        this.setState({
            row: props.user.user.map((el)=> {
                el.isActive = this.getActiveStatus(el.isActive)
                el.user_type = <Chip label={this.getUserType(el.isSuperAdmin, el.isAdmin)} style={this.getColorChip(el.isSuperAdmin, el.isAdmin)} size='small'></Chip>
                el.createdAt = <Moment format="llll">{el.createdAt}</Moment>
                el.actions = <div>
                            <EditIcon onClick={()=> console.log('hello')} style={{ cursor: 'pointer', color: 'white', background: '#5f6368', fontSize: '25px', borderRadius: '50px', margin: '5px' }}/>
                            <ArrowRightIcon onClick={()=> console.log('hello')} style={{ cursor: 'pointer', color: 'white', background: '#5f6368', fontSize: '25px', borderRadius: '50px', margin: '5px' }}/>
                        </div>
                return el;
            })
        })
    }

    // Get IsActive Status. IsActive ? Yes : No
    getActiveStatus(isActive) {
        if(isActive) return 'Yes';
        return 'No'
    }

    // Get the color for the chip
    getColorChip(superAdmin, admin) {
        if(superAdmin) {
            return {background: '#2e6da0', color: 'white'}
        }
        else if(admin) {
            return {background: '#ce0045', color: 'white'}
        }
        else return {}        
    }

    // Get the user type
    getUserType(superAdmin, admin) {
        if(superAdmin) {
            return 'Super Admin'
        }
        else if(admin) {
            return 'Admin'
        }
        else return 'Member'
    }

    // Trigers on component mount
    componentDidMount(){
        this.fetchData()
    }

    //  Fetch user list and set default error response as empty
    fetchData() {
        this.setState({
            error: '',
            open: false
        })
        this.props.loadUserList()
    }

    // Handle Navigation
    handleNav(data) {
        this.props.history.push(data)
    }

    // Handle Snackbar open and close
    handleClose() {
        this.setState({
            open: !this.state.open,
        })
    }

    render() {
        return(
            <div>
                {/* Page Name */}
                <Grid container direction="row">
                    <Grid xs={6}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <PeopleAltIcon  style={{ color: '#5f6368', fontSize: '20px' }}/>
                            </Grid>
                            <Grid item style={{ marginLeft: '5px' }}>
                                <Typography style={{ fontFamily: 'Roboto,RobotoDraft,Helvetica,Arial,sans-serif', fontSize: '15px', fontWeight: '500', color: '#5f6368' }}>Users</Typography>
                            </Grid>
                        </Grid>
                        {/* Breadcrumbs */}
                        <Breadcrumbs aria-label="breadcrumb" style={{ fontSize: '13px' }}>
                            <Link color="inherit" style={{ cursor: 'pointer' }} onClick={() => this.handleNav('/')}>
                                Users
                            </Link>
                            <Typography style={{ fontSize: '13px' }} color="textPrimary">List Users</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid xs={6}>
                        <Button variant="contained" size="medium" color="primary" style={{ float: 'right' }} startIcon={<AddIcon />}>
                            Add User
                        </Button>
                    </Grid>
                </Grid>
                {/* Table */}
                <UserTable 
                    style={{ padding: '50px' }}
                    tabName = "Users"
                    columns={this.state.column}
                    row={this.state.row}/>
                {/* Error Snack bar */}
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        {this.state.error}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isUserLoading: state.auth.isAuthenticated,
    user: state.user,
    error: state.user.error
  });

export default connect(mapStateToProps, {loadUserList})(withRouter(UsersPage));