import React ,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';

export class Profile extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <Avatar {...this.props.style ? {style: this.props.style} : ''}>{this.props.value}</Avatar>
            </div>
        );
    }    
}

export default Profile;