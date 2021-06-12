import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
		margin: theme.spacing(1),
	  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar(props) {
 
  const classes = useStyles(props);
 
  return (
    <div className={classes.root}>
   
      <AppBar position="static">
      
      
        <Toolbar >
      <IconButton
        
        aria-label="return to the homepage"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               color="inherit"
                >
         <HomeIcon onClick={() => props.setPage('style')} /> 
         </IconButton>
    
        
 
          <Typography variant="h6" className={classes.title}>
                             MLA/APA Reference Generator
          </Typography>
      
          


         <Button className={classes.button} onClick={() => props.setPage('apamain')}  variant="outlined" color="inherit">
   APA
     </Button>
   <Button onClick={() => props.setPage('mlamain')}  variant="outlined" color="inherit">
   MLA
     </Button>
        
       


      
        </Toolbar>
      </AppBar>
    </div>
  );
}