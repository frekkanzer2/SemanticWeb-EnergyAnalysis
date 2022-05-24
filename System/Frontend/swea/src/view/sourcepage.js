import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemText from '@mui/material/ListItemText';
import '../css/page.css';
import { Space8, Space12, Space16 } from "../utils/spacing";

export function SourcePage(props) {
    
    var sourcedata = {
        name: props.name,
        description: props.description
    }

    const [open_ambiental, setOpen_ambiental] = React.useState(false);
    const [open_finance, setOpen_finance] = React.useState(false);
    const [open_political, setOpen_political] = React.useState(false);
    const [open_social, setOpen_social] = React.useState(false);
    const [open_technical, setOpen_technical] = React.useState(false);

    const handleClick_ambiental = () => {
        setOpen_ambiental(!open_ambiental);
    };
    const handleClick_finance = () => {
        setOpen_finance(!open_finance);
    };
    const handleClick_political = () => {
        setOpen_political(!open_political);
    };
    const handleClick_social = () => {
        setOpen_social(!open_social);
    };
    const handleClick_technical = () => {
        setOpen_technical(!open_technical);
    };

    return (
        <Container maxWidth="xl" className='pageContainer'>
            <Typography variant="h3" component="div" gutterBottom>
                {sourcedata.name}
            </Typography>
            <Space8/>
            
            <Typography variant="h5" component="div" gutterBottom>
                Description
            </Typography>
            
            <Container maxWidth="sm" style={{marginLeft: 0}}>
                <Typography variant="body1" component="div" gutterBottom>
                    {sourcedata.description}
                </Typography>
            </Container>
            <Space16/>

            <Typography variant="h5" component="div" gutterBottom>
                Territories
            </Typography>
            <Typography variant="caption" component="div" gutterBottom>
                Where you can use {sourcedata.name}
            </Typography>
            
            <Container maxWidth="sm" style={{marginLeft: 0, marginBottom: 16}}>
                <List
                sx={{ width: '100%' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                >
                <ListItemButton className='listitem-dark'>
                    <ListItemText primary="Territory 1" />
                </ListItemButton>
                <ListItemButton className='listitem-dark'>
                    <ListItemText primary="Territory 2" />
                </ListItemButton>
                <ListItemButton className='listitem-dark'>
                    <ListItemText primary="Territory 3" />
                </ListItemButton>
                </List>
            </Container>

            <Typography variant="h5" component="div" gutterBottom>
                Utilization Criteria
            </Typography>
            <Typography variant="caption" component="div" gutterBottom>
            It's possible to use {sourcedata.name} in a territory according to the following criteria
            </Typography>
            
            <Container maxWidth="sm" style={{marginLeft: 0, marginBottom: 16}}>
                <List
                sx={{ width: '100%' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                >
                <ListItemButton onClick={handleClick_ambiental} className='listitem-dark'>
                    <ListItemText primary="Ambiental Criteria" />
                    {open_ambiental ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open_ambiental} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                        <ListItemText primary="DESCRIPTION HERE" />
                    </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton onClick={handleClick_finance} className='listitem-dark'>
                    <ListItemText primary="Finance Criteria" />
                    {open_finance ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open_finance} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                        <ListItemText primary="DESCRIPTION HERE" />
                    </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton onClick={handleClick_political} className='listitem-dark'>
                    <ListItemText primary="Political Criteria" />
                    {open_political ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open_political} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                        <ListItemText primary="DESCRIPTION HERE" />
                    </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton onClick={handleClick_social} className='listitem-dark'>
                    <ListItemText primary="Social Criteria" />
                    {open_social ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open_social} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                        <ListItemText primary="DESCRIPTION HERE" />
                    </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton onClick={handleClick_technical} className='listitem-dark'>
                    <ListItemText primary="Technical Criteria" />
                    {open_technical ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open_technical} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                        <ListItemText primary="DESCRIPTION HERE" />
                    </ListItemButton>
                    </List>
                </Collapse>
                </List>
            </Container>

        </Container>
    );

}