import React, {Component} from 'react'
import APABook from './APABook'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import APAarticle from './APAarticle';
import APAWebsite from './APAWebsite';

 
console.log(process.env.NODE_ENV)
let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://127.0.0.1:8000'
} else {
  baseURL = 'https://limitless-harbor-79486.herokuapp.com'
}

export default class APAMain extends Component {

	constructor(props){
		super(props)
		this.state={
		  sources: [],
		  sourceEdited: {},
		  style: '',
		  source: '',
		  lastname: '',
		  firstname: '',
		  title: '', 
		  publisher: '',
		  date: '',
		  website: '',
		  volume: '',
		  issue: '',
		  pages: ''
		  
		}
	}

	getSources = () => {
		fetch(baseURL + "/api/v1/sources/")
		.then(res => { return res.json()
		}).then(json => {
			console.log("this is json", json)
		  this.setState({
			sources: json.data
		  })
		  
		})
	  }

	
	addSource = (newSource) =>{
		const copySources = [...this.state.sources]
		copySources.push(newSource)
		this.setState({
		  sources: copySources
		})
		
	}

	deleteSource = async(id) => {
		const url = baseURL + '/api/v1/sources/' + id
	  
	  try{
		const response = await fetch(url, {
		  method: 'DELETE'
		})
	
		if (response.status === 200){
		  const index = this.state.sources.findIndex(source => source.id === id)
	
		  let copySources = [...this.state.sources]
	
		  copySources.splice(index, 1)
	
		  this.setState({
			sources: copySources
		  })
		}
	}
	  catch(err){
		console.log('error: ', err)
		}
	  }
	
	editSource = (source) => {
		this.setState({
			sourceEdited: source
		})
	}
	
	handleEditChange=(event)=>{
		const target = {...this.state.sourceEdited}
		const source = {
			[event.target.id]: event.target.value,
		}
		const newSourceCurrentlyBeingEdited = Object.assign(target, source)
		console.log('this is the source', source)

    this.setState ({
      sourceEdited: newSourceCurrentlyBeingEdited

    })
}

	updateSource = async(e)=>{
		e.preventDefault()
		console.log('update is working')
		console.log('worked', this.state.sourceEdited)
		const url = baseURL + '/api/v1/sources/' + this.state.sourceEdited.id
	try{
		const response = await fetch(url, {
			method: 'PUT',
			body: JSON.stringify(this.state.sourceEdited),
			headers:{
				'Content-Type': 'application/json'
			},
		})
		if (response.status === 200){
			//const updateSource = await response.json()
			this.getSources()
			/* console.log("this is the update", updateSource)
			const findIndex = this.state.sources.findIndex(source => source.id === updateSource.json.data.id)
			const copySources = [...this.state.sources]
			copySources[findIndex] = updateSource.json.data
			this.setState({
				sources: copySources
				
				
			}) */
			this.handleClose()
		}
	}
	catch(err){
		console.log('Error =>', err)
	}
}

 	handleClickOpen = (event, source) => {
		 //let temp = {}
		 //temp.id = id
		this.setState({
			[event.currentTarget.id]: event.currentTarget.value,
			open: true,
			sourceEdited: source
		})	
  	};
 
	handleClose = (event) => {
		this.setState({
			open: false
		})	
 	 };  

componentDidMount(){
		this.getSources()  
 }


	render(){
		


		return(

			<div className="App">
			<h1>APA</h1>
			<h4>Click on one of the following types of source</h4>
		<Grid container spacing={3}>
		<Grid item xs={3}>
			<APABook addSource={this.addSource}/>
		</Grid>
		<Grid item xs={3}>
			<APAarticle addSource={this.addSource}/>
		</Grid>
		<Grid item xs={3}>
			<APAWebsite addSource={this.addSource}/>
		</Grid>
		
</Grid>
	<Grid/>	
    
	<Grid>
	  <Grid>
		<Typography variant="h5">
		  Reference List
		</Typography>

		<div >
		
		  <List>
			{ this.state.sources.sort((a, b) => a.lastname.localeCompare(b.lastname)).map((source) =>(
			  <ListItem alignItems="flex-start" >
				<ListItemText
				  primary={
				   
					  <Typography
						component="span"
						variant="body2"
						className= "inline"
						color="textPrimary"
						text-indent= "-3em">
						{source.lastname}, {source.firstname} . {source.title}, {source.publisher}, {source.date} .
					  </Typography>
									  }
				/>
			   
				  <IconButton aria-label="delete">
				  <DeleteIcon onClick={() => this.deleteSource(source.id)} />
				  </IconButton>
				  
				  
				  <IconButton aria-label="edit">
				 	 <EditIcon onClick={(event) => this.handleClickOpen(event, source)}/>  

							 
				  </IconButton> 

			  </ListItem>
			  
			))}
		  </List>
	{ this.state.open &&
		<>
		<Dialog 
			  open={this.state.open}  
			  onClose={this.handleClose} 
			  onSubmit={ (event) => this.updateSource(event)}
			  aria-labelledby="Edit a Source">
		  
		  <DialogTitle id="form-dialog-title">Book</DialogTitle>
		  <DialogContentText>
		  Enter the book information here
		</DialogContentText>
		<DialogContent>
		<TextField
		  margin="dense"
		  id="lastname"
		  label="Author's Lastname"
		  type="text"
		  onChange={(event) => this.handleEditChange(event)}
		  value={this.state.sourceEdited.lastname}
		  fullWidth
		/>

		  <TextField
		   margin="dense"
		   id="firstname"
		   label="Author's Firstname"
		   type="text"
		   onChange={(event) => this.handleEditChange(event)}
		   value={this.state.sourceEdited.firstname}
		   fullWidth
		/>
		  <TextField
		  margin="dense"
		  id="title"
		  label="Title of Book"
		  type="text"
		  onChange={(event) => this.handleEditChange(event)}
		  value={this.state.sourceEdited.title}
		  fullWidth
		/>

			<TextField
		  margin="dense"
		  id="publisher"
		  label="Publisher"
		  type="text"
		  onChange={(event) => this.handleEditChange(event)}
		  value={this.state.sourceEdited.publisher}
		  fullWidth
			/>

		  <TextField
		  autoFocus
		  margin="dense"
		  id="date"
		  label="Publication Date"
		  type="year"
		  onChange={(event) => this.handleEditChange(event)}
		  value={this.state.sourceEdited.date}
		/>
		</DialogContent>
		<DialogActions>
		<Button onClick={this.handleClose} color="primary">
		  Cancel
		</Button>
	{/* 	<Button onClick={this.updateSource}> */}
	<Button onClick={(event)=>{
		this.updateSource(event);
		this.handleClose();
	}}>
		  Edit Source
		</Button>
	  </DialogActions>
		  </Dialog>
		</>
		
	}
	
		</div>
	

	  </Grid>

	</Grid>


</div>
			
				
		);
	}
}		


