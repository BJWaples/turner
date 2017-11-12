import React from 'react'
import ModalInfo from './Info'
import { Card,Modal,Button  } from 'semantic-ui-react'

class TitleCard extends React.Component {
    render(){
        return(
            <div>
                <Card>
                <Card.Content>
                    <Card.Header>
                        {this.props.content.title_name}
                    </Card.Header>
                    <Card.Meta>
                        <span  >
                            {this.props.content.release_year}
                        </span>
                    </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Modal size='large' closeOnDimmerClick dimmer='blurring' trigger={<Button>Details</Button>}>
                            
                                    <ModalInfo release_year={this.props.content.release_year} id={this.props.content.id} title_name={this.props.content.title_name}/>
                  
                            </Modal>
                        </a>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}
export default TitleCard