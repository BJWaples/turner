import React from 'react'
import TitleCard from './TitleCard'
import { Grid, Container  } from 'semantic-ui-react'



class Titles extends React.Component{

    render(){    
        return(
            <div>      
                <Grid celled  >
                {this.props.titles.map(content=>{
                    return(<TitleCard key={content.id} content={content}/> )    
                })}
                </Grid>
            </div>
        )
    }
}
export default Titles