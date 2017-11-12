import React from 'react'
import TitleCard from './TitleCard'
import { Grid  } from 'semantic-ui-react'

class Titles extends React.Component{

    render(){    
        let titles = this.props.titles
        return(
            <div>      
                <Grid celled  >
                {titles.map(content=>{
                    return(<TitleCard key={content.id} content={content}/> )    
                })}
                </Grid>
            </div>
        )
    }
}
export default Titles