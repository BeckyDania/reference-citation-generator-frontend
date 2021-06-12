import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../resources.jpg'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
	
	  photo : {
		height: '400px',
		width: '209%',
	  },
	}));

export default function Links(props) {

	const classes = useStyles(props);

  return (

	<div >
	<div>
	<span>
	<h1>Format References Sources</h1>
	<h3>Pick a style</h3>

	<Button onClick={() => props.setPage('apamain')}  variant="outlined" color="primary">
	  APA
      </Button>
	  <Button onClick={() => props.setPage('mlamain')}  variant="outlined" color="primary">
	  MLA
      </Button>
	  
</span>
	  </div>
 <Grid container spacing={3}>
        <Grid item xs={6}>
          <img className={classes.photo} src={Image} alt="research papers"/>
        </Grid>
</Grid>

    </div>
  );
}
