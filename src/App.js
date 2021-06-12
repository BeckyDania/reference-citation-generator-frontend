import './App.css';
import React, {Component} from 'react'
import '@fontsource/roboto'
import MLAMain from './Components/MLA/MLAMain'
import APAMain from './Components/APA/APAMain'
import MenuAppBar from './Components/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Homepage from './Components/Homepage';




export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'style'
    };
  }

  setPage = (pageName) => {
    this.setState({
      page: pageName
    });
  };

render(){
  let page;
  if(this.state.page === 'style') {
    page = <Homepage setPage={this.setPage}/>
  }
  else if(this.state.page === 'mlamain') {
    page = <MLAMain setPage={this.setPage}/>
  }
  else if(this.state.page === 'apamain') {
    page = <APAMain setPage={this.setPage}/>
  }

  
  return(
    <div className="App">
    <MenuAppBar setPage={this.setPage}/>
    
    <CssBaseline />
  
      <Container maxWidth="sm">
         <Typography component={Paper} elevation={3}variant="outlined" square style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
             {page}
            </Typography>

        </Container>
     
    </div>
  )
}
    
  }

