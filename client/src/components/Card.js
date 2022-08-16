import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import * as React from 'react';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};


export default function BasicCard(props) {  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Divider variant='inset'/>
        <Typography style={{paddingLeft:40}} component="div" variant="h6">
         <b>Word: </b><u style={{color:"#0069c0"}}>{props.word}</u>
        </Typography>
        <Divider />
        <CardActions sx={{color:'#0069c0'}}  disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"  
        >
          <ExpandCircleDownIcon sx={{color:'#0069c0'}} />
        </ExpandMore>
         <Button onClick={handleExpandClick}>View More   </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        {props.entries.map((entry, index) => {
                            return<ul key={index} style={{ marginTop: 10 }}>
                                <Typography variant="body2" color="textSecondary" component="i">
                                    {entry.partOfSpeech}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {entry.origin.length !== 0 && (<h4>Origin:</h4>)}
                                    <span style={{ paddingLeft: 30}}> {entry.origin[0]}</span>
                                </Typography>
                                <Typography variant="subtitle2" style={{ marginTop: 10 }} component="p">
                                    {entry.definitions[0]}
                                </Typography>
                                <ul style={{ paddingLeft: 30, marginTop: 10 }}>
                                    {entry.examples.map((example, index) => (<li key={index}>{example}</li>))}
                                </ul>
                                <Divider />
                            </ul>
        })}
        </Collapse>

      </CardContent>  
    </Card>
  );
}
