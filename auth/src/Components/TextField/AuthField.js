import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    cssLabel: {
        color : '#1a73e8'
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `#1a73e8 !important`,
        }
    },
    cssErrorOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `red !important`,
        }
    },
    cssFocused: {
        borderWidth: '1px',
        borderColor: '#1a73e8 !important'
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'grey !important'
    },
    errorNotchedOutline: {
        borderWidth: '1px',
        borderColor: 'red !important'
    },
    checkBox: {
        fontSize: '13px',
    },
});

export class AuthField extends Component { 
    // PROPS
    // 1. name - string
    // 2. value - string
    // 3. hidden - boolean
    // 4. label - string
    // 5. placeholder - string
    // 6. error - string
    // 7. onChange - function
    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField 
                    variant="outlined" 
                    margin={this.props.margin ? this.props.margin : 'normal'} 
                    required 
                    {...this.props.style ? {style: this.props.style} : ''}
                    {...this.props.name === 'email' ? 'autoFocus' : ''} 
                    onChange={this.props.onChange} 
                    value={this.props.value}
                    type={this.props.name === 'email' ? 'email' : (this.props.hidden ? 'password' : 'text')}
                    InputLabelProps={{ 
                        shrink: true, 
                        classes: { 
                            classes: { 
                                root: classes.cssLabel, 
                                focused: classes.cssFocused 
                            }
                        }
                    }} 
                    InputProps={{
                        classes: {   
                            root: this.props.error ? classes.cssErrorOutlinedInput : classes.cssOutlinedInput, 
                            focused: classes.cssFocused, 
                            notchedOutline: this.props.error ? classes.errorNotchedOutline : classes.notchedOutline 
                        }}}
                    placeholder={this.props.placeholder} 
                    fullWidth 
                    id={this.props.placeholder} 
                    label={this.props.label}  
                    {...(this.props.error && {error: true, helperText: this.props.error})}
                    name={this.props.name}
                />
            </div>
        );
    }
}

export default withStyles(styles)(AuthField);
