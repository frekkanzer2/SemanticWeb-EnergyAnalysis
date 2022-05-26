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
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

export function TerritoryPage(props) {

    var territorydata = {
        name: props.name,
        definition: props.definition,
        description: props.description,
        placedSources: [], // array of {name: STRING, address: STRING} DEF 1 is source name; 2 is semantic resource address
        crit_amb: [], // this and the following 4 arrays contains only strings
        crit_fin: [],
        crit_pol: [],
        crit_soc: [],
        crit_tec: [],
        placedCompanies: [], // array of {name: STRING, address: STRING} DEF 1 is source name; 2 is semantic resource address
        thumbnail: props.image
    }

    territorydata.crit_amb = props.criteria[0];
    territorydata.crit_fin = props.criteria[1];
    territorydata.crit_pol = props.criteria[2];
    territorydata.crit_soc = props.criteria[3];
    territorydata.crit_tec = props.criteria[4];
    territorydata.placedSources = props.sources;
    territorydata.placedCompanies = props.companies;

    const [open_ambiental, setOpen_ambiental] = React.useState(false);
    const [open_finance, setOpen_finance] = React.useState(false);
    const [open_political, setOpen_political] = React.useState(false);
    const [open_social, setOpen_social] = React.useState(false);
    const [open_technical, setOpen_technical] = React.useState(false);
    const [pressed_company, setPressed_company] = React.useState({});

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

    var callback_changePage = props.changePageCallback;
    
    const onPressedSource = (chosenSource) => {
        for (var i = 0; i < territorydata.placedSources.length; i++) {
            if (chosenSource == territorydata.placedSources[i].name) {
                callback_changePage(2, territorydata.placedSources[i].address);
                break;
            }
        }
    };

    const [company_open, setCompany_open] = React.useState(false);
  
    const handleCompanyClickOpen = (company_address) => {
        fetch("http://127.0.0.1:8080/singleCompanyInformations?res=" + company_address)
            .then(res => res.json())
            .then(
                (result) => {
                    setPressed_company({
                        name: result.name,
                        description: result.description,
                        thumbnail: result.thumbnail,
                        f_date: result.foundingDate,
                        f_link: result.founder
                    })
                    setCompany_open(true);
                },
                (error) => {
                    console.log("Backend error");
                }
            )
    };
  
    const handleCompanyClose = () => {
        setCompany_open(false);
    };

    return(
        <Container maxWidth="xl" className='pageContainer'>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                            
                        <Typography variant="h3" component="div" gutterBottom>
                            {territorydata.name}
                        </Typography>
                        <Space8/>
                        
                        <Typography variant="h5" component="div" gutterBottom>
                            Description
                        </Typography>
                        <Typography variant="caption" component="div" gutterBottom>
                        What is a territory?
                        </Typography>
                        
                        <Container maxWidth="xl" style={{marginLeft: 0}}>
                            <Typography variant="body1" component="div" gutterBottom align='justify'>
                                {territorydata.definition}
                            </Typography>
                        </Container>
                        <Space16/>

                        <Typography variant="caption" component="div" gutterBottom>
                        About {territorydata.name}
                        </Typography>
                        
                        <Container maxWidth="xl" style={{marginLeft: 0}}>
                            <Typography variant="body1" component="div" gutterBottom align='justify'>
                                {territorydata.description}
                            </Typography>
                        </Container>

                    </Grid>
                    <Grid item xs={5}>
                        
                        <Space16/> <Space16/> <Space16/> <Space16/> <Space16/>

                        {
                            (territorydata.thumbnail == null || territorydata.thumbnail == undefined || territorydata.thumbnail == "" || territorydata.thumbnail == " ")
                            ? <div></div>
                            : <Card className='image-right table-dark' sx={{ marginBottom: 2 }}>
                                <CardActionArea>
                                    <CardMedia sx={{ height: 120, objectFit: 'contain' }}
                                    component="img"
                                    image={territorydata.thumbnail}
                                    />
                                </CardActionArea>
                            </Card>
                        }

                        <Typography variant="h5" component="div" gutterBottom>
                            Sources
                        </Typography>

                        <Typography variant="caption" component="div" gutterBottom>
                            Which sources you can use in {territorydata.name} to produce energy
                        </Typography>
                        
                        <Container maxWidth="sm" style={{marginLeft: 0, marginBottom: 16}}>
                            <List
                            sx={{ width: '100%' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            >
                                {
                                    territorydata.placedSources.length > 0 ?
                                    territorydata.placedSources.map(
                                        source => {
                                            return (
                                                <ListItemButton className='listitem-dark' onClick={() => {onPressedSource(source.name)}}>
                                                    <ListItemText primary={source.name} />
                                                </ListItemButton>
                                            )
                                        }
                                    ) :
                                    <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                        <ListItemText primary={"Empty"} />
                                    </ListItemButton>
                                }
                            </List>
                        </Container>
                        
                        <Typography variant="h5" component="div" gutterBottom>
                            Utilization Criteria
                        </Typography>

                        <Typography variant="caption" component="div" gutterBottom>
                            It's possible to use the listed sources in {territorydata.name} according to the following criteria
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
                                    {
                                        territorydata.crit_amb.length > 0 ?
                                            territorydata.crit_amb.map(
                                                crit => {
                                                    return (
                                                        <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                                            <ListItemText primary={"- " + crit.criteria_name} />
                                                        </ListItemButton>
                                                    )
                                                }
                                            )
                                        :
                                            <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                                <ListItemText primary={"Empty"} />
                                            </ListItemButton>
                                    }
                                </List>
                            </Collapse>
                            <ListItemButton onClick={handleClick_finance} className='listitem-dark'>
                                <ListItemText primary="Finance Criteria" />
                                {open_finance ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open_finance} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>{
                                    territorydata.crit_fin.length > 0 ?
                                        territorydata.crit_fin.map(
                                            crit => {
                                                return (
                                                    <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                                        <ListItemText primary={"- " + crit.criteria_name} />
                                                    </ListItemButton>
                                                )
                                            }
                                        )
                                    :
                                        <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                            <ListItemText primary={"Empty"} />
                                        </ListItemButton>
                                    }
                                </List>
                            </Collapse>
                            <ListItemButton onClick={handleClick_political} className='listitem-dark'>
                                <ListItemText primary="Political Criteria" />
                                {open_political ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open_political} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>{
                                    territorydata.crit_pol.length > 0 ?
                                        territorydata.crit_pol.map(
                                            crit => {
                                                return (
                                                    <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                                        <ListItemText primary={"- " + crit.criteria_name} />
                                                    </ListItemButton>
                                                )
                                            }
                                        )
                                    :
                                        <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                            <ListItemText primary={"Empty"} />
                                        </ListItemButton>
                                    }
                                </List>
                            </Collapse>
                            <ListItemButton onClick={handleClick_social} className='listitem-dark'>
                                <ListItemText primary="Social Criteria" />
                                {open_social ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open_social} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        territorydata.crit_soc.length > 0 ?
                                            territorydata.crit_soc.map(
                                                crit => {
                                                    return (
                                                        <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                                            <ListItemText primary={"- " + crit.criteria_name} />
                                                        </ListItemButton>
                                                    )
                                                }
                                            )
                                        :
                                            <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                                <ListItemText primary={"Empty"} />
                                            </ListItemButton>
                                    }
                                </List>
                            </Collapse>
                            <ListItemButton onClick={handleClick_technical} className='listitem-dark'>
                                <ListItemText primary="Technical Criteria" />
                                {open_technical ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open_technical} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>{
                                    territorydata.crit_tec.length > 0 ?
                                        territorydata.crit_tec.map(
                                            crit => {
                                                return (
                                                    <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                                        <ListItemText primary={"- " + crit.criteria_name} />
                                                    </ListItemButton>
                                                )
                                            }
                                        )
                                    :
                                        <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                            <ListItemText primary={"Empty"} />
                                        </ListItemButton>
                                    }
                                </List>
                            </Collapse>
                            </List>
                        </Container>
                        
                        <Typography variant="h5" component="div" gutterBottom>
                            Investor Companies
                        </Typography>

                        <Typography variant="caption" component="div" gutterBottom>
                            Which companies use sources and produce energy in {territorydata.name}
                        </Typography>
                        
                        <Container maxWidth="sm" style={{marginLeft: 0, marginBottom: 16}}>
                            <List
                            sx={{ width: '100%' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            >
                            {
                                territorydata.placedCompanies.length > 0 ?
                                territorydata.placedCompanies.map(
                                    company => {
                                        return (
                                            <div>
                                                <ListItemButton className='listitem-dark' onClick={() => {
                                                    handleCompanyClickOpen(company.address);
                                                }}>
                                                    <ListItemText primary={company.name} />
                                                </ListItemButton>
                                                <Dialog
                                                    open={company_open}
                                                    keepMounted
                                                    onClose={handleCompanyClose}
                                                    aria-describedby="alert-dialog-slide-description"
                                                >
                                                    <DialogTitle className="table-dark" sx={{color: "#FFFFFF"}}>
                                                        {pressed_company.name}
                                                    </DialogTitle>
                                                    <DialogContent className="table-dark">
                                                        <DialogContentText id="alert-dialog-slide-description" sx={{color: "#FFFFFF"}}>

                                                            {
                                                                (pressed_company.thumbnail == null || pressed_company.thumbnail == undefined || pressed_company.thumbnail == "" || pressed_company.thumbnail == " ")
                                                                ? <div></div>
                                                                : <Card className='table-dark' sx={{ marginBottom: 2 }}>
                                                                    <CardActionArea>
                                                                        <CardMedia sx={{ height: 80, objectFit: 'contain' }}
                                                                        component="img"
                                                                        image={pressed_company.thumbnail}
                                                                        />
                                                                    </CardActionArea>
                                                                    <Space8/>
                                                                </Card>
                                                            }
                        
                                                            <Typography variant="subtitle" component="div" gutterBottom>
                                                                Description
                                                            </Typography>

                                                            <Typography variant="caption" component="div" gutterBottom align='justify'>
                                                                {pressed_company.description}
                                                            </Typography>

                                                            {

                                                                (pressed_company.f_date == undefined || pressed_company.f_date == null || pressed_company.f_date == "" || pressed_company.f_date == " ")
                                                                ? <div></div>
                                                                : <div>
                                                                    <Space8/>

                                                                    <Typography variant="subtitle" component="div" gutterBottom>
                                                                        Founding date
                                                                    </Typography>

                                                                    <Typography variant="caption" component="div" gutterBottom>
                                                                        Founded in {pressed_company.f_date}
                                                                    </Typography>
                                                                </div>

                                                            }

                                                        </DialogContentText>
                                                    </DialogContent>
                                                    {

                                                        (pressed_company.f_link == undefined || pressed_company.f_link == null || pressed_company.f_link == "" || pressed_company.f_link == " ")
                                                        ? <div></div>
                                                        : <DialogActions className="table-dark">
                                                            <Button onClick={() => {
                                                                window.open(pressed_company.f_link);
                                                            }}>About the founder</Button>
                                                        </DialogActions>

                                                    }
                                                </Dialog>
                                            </div>
                                        )
                                    }
                                ) :
                                <ListItemButton sx={{ pl: 4 }} className='sublistitem-dark'>
                                    <ListItemText primary={"Empty"} />
                                </ListItemButton>
                            }
                            </List>
                        </Container>

                    </Grid>
                </Grid>
            </Box>

        </Container>
    );

}