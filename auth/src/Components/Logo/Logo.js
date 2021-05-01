import React, {Component} from 'react';
import './Logo.css';

export class Logo extends Component {
    render() {
        return(
          <div className='logo-top'>
            <div className='logo-auth'>Auth</div>
            <div className='logo-pink'></div>
          </div>
        );
    }
}

export default (Logo);