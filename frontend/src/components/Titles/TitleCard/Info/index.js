import React from 'react'
import axios from 'axios'
import { Divider,Loader,Segment,Header  } from 'semantic-ui-react'

class ModalInfo extends React.Component {
    state={
        loading:true,
        loaded: false,
        data:null
    }

    componentDidMount(){
    
        axios({
            method: 'post',
            url: '/titles/details',
            data: {
              id: this.props.id,

            }
          }).then(response=>{
              this.setState({
                loading:false,
                data: response.data
              })
          })
    }
    view(){
        if(this.state.loading){
            return (
                <Loader/>
            )
        }
        return (            
            <div>
                <Header>
                    {this.props.title_name}
                </Header>
                <Divider/>
                {this.props.release_year}
                <Segment>
                    {this.state.data[0].description}
                </Segment>
            </div>)
    }
    render(){
        return(
            <div>
                {this.view()}
            </div>
        )
    }
}
export default ModalInfo