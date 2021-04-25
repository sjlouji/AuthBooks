import React, { Component } from 'react';
import {withRouter} from 'react-router'
import LoopIcon from '@material-ui/icons/Loop';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
export class Sidebar extends Component {
    render() {
        return(
            <div  style={{ width: '50px', height: '100vh' ,backgroundColor: '#141d2f' }}>
                <Grid container justify="center">
                    <LoopIcon style = {{ color: 'white', marginTop: '10px' }}/>
                </Grid>
                <div>
                    <Grid container justify="center">
                        <HomeIcon style = {{ color: 'white', marginTop: '10px', textAlign: 'center' }}/>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default (withRouter(Sidebar));