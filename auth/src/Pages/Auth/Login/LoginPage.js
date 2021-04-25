import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AuthField from '../../../Components/TextField/AuthField';
import { withRouter } from 'react-router-dom';
import { login } from '../../../Store/Action/auth'
import { connect } from 'react-redux';
import {Alert} from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Login.css';

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

export class LoginPage extends Component {

    // State
    state = {
        email: '',
        password: '',
        hidden: true,
        emailError: '',
        passwordError: '',
        commonError: ''
    }

    //  Constructor to bind function with state
    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handlePasswordToogle = this.handlePasswordToogle.bind(this)
        this.flushError = this.flushError.bind(this)
    } 

    // Navigate
    navigate(route) {
        this.props.history.push(route);
    }

    //Handle Password Visibility
    handlePasswordToogle() {
        this.setState({ hidden: !this.state.hidden });
    }

    // Makes Error null
    flushError() {
        this.setState({
            emailError: '',
            passwordError: '',
            commonError: ''
        })
    }

    //  Hadles change of text in textfield 
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    //  Recieves new props. Primarily used for Error Handling
    componentWillReceiveProps(nextProps){
        if(nextProps.error !== undefined){
            if(nextProps.error.message === 'Network Error'){
                this.setState({commonError: nextProps.error.message})
            }else{
                nextProps.error.response.data && nextProps.error.response.data.error.map((el => {
                    if(el.type === 'email') this.setState({emailError: el.message})
                    if(el.type === 'password') this.setState({passwordError: el.message})
                    if(!el.type) this.setState({commonError: el.message})
                }))
            }
        }
    }

    //  Handles Login
    handleLogin(e){
        e.preventDefault();
        if (!this.state.email && !this.state.password) {return this.setState({ emailError: 'Enter a Email address', passwordError: 'Enter your password' })} else {this.flushError()}
        if (!this.state.email) {return this.setState({ emailError: 'Enter a Email address' })} else {this.flushError()}
        if (!this.state.password) {return this.setState({ passwordError: 'Enter your password' })} else {this.flushError()}
        this.flushError();
        const body = { email: this.state.email, password: this.state.password } 
        // Login
        this.props.login(body)
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div class="LoginBox">
                <Typography className="headerName" component="h1" variant="h5">
                    Sign in
                </Typography>
                <Typography className="headerDesc" variant="subtitle1">
                    Use your Books Account
                </Typography>
                <form className="loginForm">
                    <AuthField 
                        name="email" 
                        placeholder="Email" 
                        label="Email" 
                        error = {this.state.emailError} 
                        onChange={this.onChange} 
                        value={this.state.email}/>
                    <AuthField 
                        name="password" 
                        placeholder="Password" 
                        label="Password"    
                        error = {this.state.passwordError} 
                        onChange={this.onChange} 
                        value={this.state.password} 
                        hidden={this.state.hidden}/>
                    {this.state.commonError ? <Alert variant="danger">{this.state.commonError}</Alert> : ''}
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <FormControlLabel
                                value="top"
                                classes={{ label: classes.checkBox }}
                                control={<Checkbox color="primary" size="small" checkBox={this.state.hidden} onChange={this.handlePasswordToogle}/>}
                                label="Show password"
                                labelPlacement="right"/>
                            <Button className="forgotButton" onClick={()=>this.navigate('/auth/reset')} color="primary">Forgot Password</Button>                        
                        </Grid>
                        <Grid item xs={6}>
                            <Button className="loginButton" variant="contained" onClick={this.handleLogin} disabled={this.props.authLoading ? true : false}>{this.props.authLoading ? 'Loading' : 'Login'}</Button>                        
                        </Grid>
                    </Grid>
                </form>
                <Typography className="orClass" style={{ marginTop: '15px' }} variant="subtitle1">
                    or
                </Typography>
                <Button className="createButton" color="primary" onClick={()=>this.navigate('/auth/register')}>Don't have an account.  Create one</Button>
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

export default connect(mapStateToProps, {login})(withRouter(withStyles(styles)(LoginPage)));
