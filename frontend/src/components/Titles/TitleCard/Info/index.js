import React from 'react'
import axios from 'axios'
import { Loader,Segment,Header, Item  } from 'semantic-ui-react'

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
        else if(!this.state.data[0]){
             //TODO:: create requsted failure view
            return (
                <div/>
            )
        }
        //TODO:: extends app to feature awards and participant info
        let title = this.props.title_name 
        let year = this.props.release_year
        let description = this.state.data[0].description 
        let genre = this.state.data[0].name
        return (            
            <div>
                <Header >
                    <Segment >
                        {title}
                    </Segment>
            
                    <Header.Subheader >
                    <span> {year} </span>
                    </Header.Subheader>    
                </Header>
      
                <Item>
                <Segment>
                {genre}
                    </Segment>
                       
                    <Segment>
                        {description}
                    </Segment>
                </Item>

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