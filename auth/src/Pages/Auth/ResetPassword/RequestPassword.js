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

export class RequestPassword extends Component {

    // State
    state = {
        email: '',
        emailError: '',
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
            emailError: '',
        })
    }

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
        if (!this.state.email) {return this.setState({ emailError: 'Enter a Email address' })} else {this.flushError()}
        this.flushError();
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div class="rqbox">
                <Typography className="headerName" component="h1" variant="h5">
                    Reset
                </Typography>
                <Typography className="headerDesc" variant="subtitle1">
                    Reqeust access to reset.
                </Typography>
                <form className="loginForm">
                    <Grid container xs={12}>
                        <Grid item xs = {12}>
                            <AuthField 
                                name="email" 
                                placeholder="Email" 
                                margin='small'
                                label="Email" 
                                error = {this.state.emailError} 
                                onChange={this.onChange} 
                                value={this.state.email}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Button className="forgotButton" color="primary" onClick={()=>this.navigate('/auth/login')}>Login Back</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className="loginButton" variant="contained" onClick={this.handleRegister}>Reset</Button>                        
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(RequestPassword));
