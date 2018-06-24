import React, { Component } from 'react';
import Loading from './Loading';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';


const styles = {
    card: {
        maxWidth: 500,
    },
    toolbar: {
        background: 'orange',
        color: 'white'
    },
    orgImage: {
        width: '50px',
        height: '50px',
    },
    media: {
        maxHeight: 0,
        paddingTop: '56.25%',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    paper: {
        textAlign: 'center',
    },
};

class MemberDetail extends Component {

    

    render() {

        const { selectedMember, userRepos, userOrgs, isLoading } = this.props;
        const { classes } = this.props;

        if(isLoading){
            return (
                <Loading />
            )
        } else {
            return (
                <div style={styles.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={5}>
                            <Paper style={styles.paper}>
                                <Card style={styles.card}>
                                    <CardMedia style={styles.media}
                                        image={selectedMember.avatar_url}
                                        title={selectedMember.name} />
                                    <CardContent>
                                        <Typography gutterBottom variant="headline" component="h2">{selectedMember.name}
                                            <Typography component="p">{selectedMember.login}</Typography>
                                        </Typography>
                                        <Typography component="p">
                                            <b>Location: </b>{selectedMember.location}
                                        </Typography>
                                        <Typography component="p">
                                            <b>Email: </b>{selectedMember.email? selectedMember.email: "Not Available"}
                                        </Typography>
                                        <Typography component="p">
                                            <b>Creation Date: </b>{selectedMember.created_at}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography component="p">
                                            <b>Followers: </b>{selectedMember.followers}
                                        </Typography>
                                        <Typography component="p">
                                            <b>Following: </b>{selectedMember.following}
                                        </Typography>
                                        <Typography component="p">
                                            <b>Public Repositories: </b>{selectedMember.public_repos}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography component="h2"><b>Organizations</b></Typography>
                                        {this.props.userOrgs.map((org) => {
                                            return (
                                                <Typography key={org.login}><img style={styles.orgImage}
                                                    src={org.avatar_url} alt={org.avatar_url} /></Typography>
                                            )
                                        })}
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper style={styles.paper}>
                                <Toolbar style={styles.Toolbar} id="headerBar">
                                    <Typography variant="title" color="inherit" noWrap>Repositories</Typography>
                                </Toolbar>
                                {this.props.userRepos.map((repo) => {
                                    return (
                                        <Card key={repo.name} className="pull-right" style={styles}>
                                            <CardContent>
                                                <a href={repo.html_url}><Typography gutterBottom variant="headline" component="h2">{repo.name}</Typography></a>
                                                <Typography component="p">{repo.description}</Typography>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        
    }


}

export default MemberDetail;