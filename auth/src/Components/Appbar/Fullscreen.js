import React ,{Component} from 'react';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

export class Fullscreen extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <FullscreenIcon {...this.props.style ? {style: this.props.style} : ''}></FullscreenIcon>
            </div>
        );
    }    
}

export default Fullscreen;