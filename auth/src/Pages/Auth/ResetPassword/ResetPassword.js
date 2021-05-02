import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AuthField from '../../../Components/TextField/AuthField';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePassword } from '../../../Store/Action/auth';
import {Alert} from 'react-bootstrap';
import './RequestPassword.css';

const styles = theme => ({
    cssFocused: {
        borderWidth: '1px',
        borderColor: '#1a73e8 !important'
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'grey !important'
    },
    checkBox: {
        fontSize: '13px',
    },
});

export class ResetPassword extends Component {

    // State
    state = {
        password: '',
        passwordError: '',
    }

    //  Constructor to bind function with state
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.handlePasswordToogle = this.handlePasswordToogle.bind(this)
        this.flushError = this.flushError.bind(this)
        this.handleReset = this.handleReset.bind(this)
    } 

    //Handle Password Visibility
    handlePasswordToogle() {
        this.setState({ hidden: !this.state.hidden });
    }

    // Makes Error null
    flushError() {
        this.setState({
            passwordError: '',
        })
    }

    navigate(route) {
        this.props.history.push(route);
    }
    
    //  Hadles change of text in textfield 
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }


    //  Recieves new props. Primarily used for Error Handling
    componentWillReceiveProps(nextProps){
        if(nextProps.error !== undefined){
            if(nextProps.error.message === 'Network Error'){
                this.setState({passwordError: nextProps.error.message})
            }else{
                if(nextProps.error.response.data && nextProps.error.response.data.error) {
                    nextProps.error.response.data.error.map(el => {
                        this.setState({passwordError: el.message})
                    })
                }
            }
        }
        if(nextProps.success) { 
            this.navigate('/auth/login')
        }
    }

    //  Handles Login
    handleReset(e){
        e.preventDefault();
        if (!this.state.password) {return this.setState({ passwordError: 'Enter a password' })} else {this.flushError()}
        this.flushError();
        const body = {newpassword: this.state.password, resetLink: this.props.match.params.token}
        this.props.changePassword(body)
    }
    
    render() {
        const { classes } = this.props;
        if(this.props.isAuthenticated) {
            this.navigate('/')
        }
        return (
            <div class="rqbox">
                <Typography className="headerName" component="h1" variant="h5">
                    Reset
                </Typography>
                <Typography className="headerDesc" variant="subtitle1">
                    Change Password.
                </Typography>
                <form className="loginForm">
                    <Grid container xs={12}>
                        <Grid item xs = {12}>
                            <AuthField 
                                name="password" 
                                placeholder="Password" 
                                label="Password" 
                                margin='small'
                                error = {this.state.passwordError} 
                                onChange={this.onChange} 
                                value={this.state.password}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className="loginButton" variant="contained" onClick={this.handleReset}>Reset</Button>                        
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

//  Map state to props
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    authLoading: state.auth.authLoading,
    error: state.auth.error,
    success: state.auth.reset
  });
  

export default connect(mapStateToProps, {changePassword})(withRouter(withStyles(styles)(ResetPassword)));
