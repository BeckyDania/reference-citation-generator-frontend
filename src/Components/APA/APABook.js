import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';


console.log(process.env.NODE_ENV)
let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://127.0.0.1:8000'
} else {
  baseURL = 'https://limitless-harbor-79486.herokuapp.com'
}

const useStyles = (theme) => ({
	root: {
	  'button': {
		margin: theme.spacing(2),
	  },
	},
});

class APABook extends Component {

	constructor(props){
		super(props)
		this.state={
		  style: 'apa',
		  source: 'book',
		  lastname: '',
		  firstname: '',
		  title: '', 
		  publisher: '',
		  date: '',
		  website: '',
		  volume: '0',
		  issue: '0',
		  pages: ''
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleClick = (event) => {
		this.setState({
			[event.currentTarget.id]: event.currentTarget.value
		})
	}



	handleChange = (event) => {
		this.setState({
			[event.currentTarget.id]: event.currentTarget.value
		})
	}

	handleClickOpen = (event) => {
		this.setState({
			open: true
		})	
  	};

	handleClose = (event) => {
		this.setState({
			open: false
		})	
 	 };

	  handleSubmit = (event) => {
			event.preventDefault()
			
			const url = baseURL + '/api/v1/sources/'
			fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					style: this.state.style, 
					source: this.state.source,
					lastname: this.state.lastname, 
					firstname: this.state.firstname, 
					title: this.state.title, 
					publisher: this.state.publisher, 
					date: this.state.date, 
					website: this.state.website, 
					volume: this.state.volume, 
					issue: this.state.issue, 
					pages: this.state.pages
				}),
				headers: {
				  'Content-Type': 'application/json'
				}
			  	}).then( res => {
					return res.json()
			  	}).then( json => {
					this.props.addSource(json.data)
					this.setState({
						style: 'apa',
						source: 'book',
						lastname: '',
						firstname: '',
						title: '', 
						publisher: '',
						date: '',
						website: '',
						volume: '0',
						issue: '0',
						pages: ''
				})
				this.handleClose()
			  }).catch (error => console.error({'Error': error}))
		}

	render(props){
		const {classes} = this.props;

		return(
		<div className={classes.root}>
			 <Button 
			 	variant="outlined" 
			 	color="primary" 
			 	onClick={this.handleClickOpen}>
	  			Book
      		</Button>
			<Dialog 
				open={this.state.open}  
				onClose={this.handleClose} 
				onSubmit={this.handleSubmit} 
				aria-labelledby="Format a Source">
			
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
			onChange={this.handleChange}
			value={this.state.lastname}
            fullWidth
          />

			<TextField
             margin="dense"
             id="firstname"
             label="Author's Firstname"
             type="text"
			 onChange={this.handleChange}
			 value={this.state.firstname}
             fullWidth
          />
			<TextField
            margin="dense"
            id="title"
            label="Title of Book"
            type="text"
			onChange={this.handleChange}
			value={this.state.title}
            fullWidth
          />

		  	<TextField
            margin="dense"
            id="publisher"
            label="Publisher"
            type="text"
			onChange={this.handleChange}
			value={this.state.publisher}
            fullWidth
          	/>

			<TextField
            autoFocus
            margin="dense"
            id="date"
            label="Publication Date"
            type="year"
			onChange={this.handleChange}
			value={this.state.date}
          />
		  </DialogContent>
		  <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit}>
            Add Source
          </Button>
        </DialogActions>
			</Dialog>

		</div>	
		)
	
	}
}
export default withStyles(useStyles)(APABook)