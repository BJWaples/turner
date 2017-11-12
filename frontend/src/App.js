import React, { Component } from 'react';
import './App.css'
import Titles from './components/Titles'
import axios from 'axios'
import { Menu, Input,Loader  } from 'semantic-ui-react'
import Fuse from 'fuse.js'

class App extends Component {
  constructor(props){
    super(props)
    this.title=this.title.bind(this)
    this.onChange=this.onChange.bind(this)
  }
  state={
    loaded:false,
    titles:[],
    value:''
  }
 
  componentDidMount(){
    axios.get('/titles').then(response=>{
      this.titles=response.data
        this.setState({
          loaded:true,
          titles:response.data
        })
    })
}
  title(){
    if(this.state.loaded){
      return <Titles titles={this.state.titles}/>
    }
    return <Loader/>
  }
  onChange(event){
    let options = {
      minMatchCharLength: 4,
      keys: ['title_name']
    }
    let fuse = new Fuse(this.titles, options)

      this.setState({
        loaded:this.state.loaded,
        titles:fuse.search(event.target.value),
        value:event.target.value
      })
  }
  render() {
    return (
      <div className="App">
          <div>
                <Menu>
                    <Menu.Item position='right'>
                        <Input onChange={this.onChange} className='icon' icon='search' placeholder='Search...' value={this.state.value} />
                    </Menu.Item>   
                </Menu>
            </div>
        {this.title()}
      </div>
    )
  }
}

export default App
