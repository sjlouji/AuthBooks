import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AuthField from '../../../Components/TextField/AuthField';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../../Store/Action/auth';
import {Alert} from 'react-bootstrap';
import './Register.css';

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

export class RegisterPage extends Component {

    // State
    state = {
        email: '',
        firstName: '',
        lastName: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        hidden: true,
        emailError: '',
        passwordError: '',
        firstNameError: '',
        lastNameError: '',
        confirmError: '',
        mobileError: '',
        confirmPasswordError: '',
        commonError: '',
    }

    //  Constructor to bind function with state
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handlePasswordToogle = this.handlePasswordToogle.bind(this)
        this.flushError = this.flushError.bind(this)
    } 

    //Handle Password Visibility
    handlePasswordToogle() {
        this.setState({ hidden: !this.state.hidden });
    }

    // Makes Error null
    flushError() {
        this.setState({
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            commonError: '',
        })
    }


    //  Recieves new props. Primarily used for Error Handling
    componentWillReceiveProps(nextProps){
        if(nextProps.error !== undefined){
            if(nextProps.error.message === 'Network Error'){
                this.setState({commonError: nextProps.error.message})
            }else{
                if(nextProps.error.response.data && nextProps.error.response.data.error) {
                    nextProps.error.response.data.error.map(el => {
                        if(el.type === 'password') this.setState({passwordError: el.message})
                        if(el.type === 'email') this.setState({emailError: el.message})
                        if(el.type === 'firstName') this.setState({firstNameError: el.message})
                        if(el.type === 'lastName') this.setState({laseNameError: el.message})
                        if(!el.type) this.setState({commonError: el.message})
                    })
                }
            }
        }
    }

    // Navigate to pages
    navigate(route) {
        this.props.history.push(route);
    }
    
    //  Hadles change of text in textfield 
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    //  Handles Login
    handleRegister(e){
        e.preventDefault();
        if (!this.state.firstName) {return this.setState({ firstNameError: 'First Name is Required' })} else {this.flushError()}
        if (!this.state.lastName) {return this.setState({ lastNameError: 'Last Name is Required' })} else {this.flushError()}
        if (!this.state.email) {return this.setState({ emailError: 'Enter a Email address' })} else {this.flushError()}
        if (!this.state.password) {return this.setState({ passwordError: 'Enter your password' })} else {this.flushError()}
        if (!this.state.confirmPassword) {return this.setState({ confirmPasswordError: 'Confirm Password again' })} else {this.flushError()}
        if (this.state.password !== this.state.confirmPassword) {return this.setState({ confirmPasswordError: 'Password mismatch',  passwordError: 'Password mismatch' })} else {this.flushError()}
        this.flushError();
        const body = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password }
        this.props.register(body)
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div class="box">
                <Typography className="headerName" component="h1" variant="h5">
                    Sign up
                </Typography>
                <Typography className="headerDesc" variant="subtitle1">
                    Create your Books Account
                </Typography>
                <form className="loginForm">
                    <Grid container xs={12}>
                        <Grid item xs={6} style={{padding: '5px'}}> 
                            <AuthField 
                                name="firstName" 
                                placeholder="First Name" 
                                margin='small'
                                label="First Name" 
                                error = {this.state.firstNameError} 
                                onChange={this.onChange} 
                                value={this.state.firstName}/>
                        </Grid>
                        <Grid item xs={6} style={{padding: '5px'}}>
                            <AuthField 
                                name="lastName" 
                                placeholder="Last Name" 
                                margin='small'
                                label="Last Name" 
                                error = {this.state.lastNameError} 
                                onChange={this.onChange} 
                                value={this.state.lastName}/>                            
                        </Grid>
                        <Grid item xs = {12} style={{padding: '5px', marginTop: '10px'}}>
                            <AuthField 
                                name="email" 
                                placeholder="Email" 
                                margin='small'
                                label="Email" 
                                error = {this.state.emailError} 
                                onChange={this.onChange} 
                                value={this.state.email}/>
                        </Grid>
                        <Grid item xs = {12} style={{padding: '5px'}}>
                            <AuthField 
                                name="password" 
                                placeholder="Password" 
                                label="Password"    
                                error = {this.state.passwordError} 
                                onChange={this.onChange} 
                                value={this.state.password} 
                                hidden={this.state.hidden}/>
                        </Grid>
                        <Grid item xs = {12} style={{padding: '5px'}}>
                            <AuthField 
                                name="confirmPassword" 
                                placeholder="confirmPassword" 
                                label="Password"    
                                error = {this.state.confirmPasswordError}
                                onChange={this.onChange} 
                                value={this.state.confirmPassword} 
                                hidden={this.state.hidden}/>
                        </Grid>
                    </Grid>
                    {this.state.commonError ? <Alert variant="danger">{this.state.commonError}</Alert> : ''}
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <FormControlLabel
                                value="top"
                                classes={{ label: classes.checkBox }}
                                control={<Checkbox color="primary" size="small" checkBox={this.state.hidden} onChange={this.handlePasswordToogle}/>}
                                label="Show password"
                                labelPlacement="right"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className="loginButton" variant="contained" onClick={this.handleRegister} disabled={this.props.authLoading ? true : false}>{this.props.authLoading ? 'Loading' : 'Register'}</Button>                        
                        </Grid>
                    </Grid>
                </form>
                <Typography className="orClass" style={{ marginTop: '15px' }} variant="subtitle1">
                    or
                </Typography>
                <Button className="createButton" color="primary" onClick={()=>this.navigate('/auth/login')}>Have an account.  Login in</Button>
            </div>
        );
    }
}


//  Map state to props
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    authLoading: state.auth.authLoading,
    error: state.auth.error
});
  

export default connect(mapStateToProps, {register})(withRouter(withStyles(styles)(RegisterPage)));
