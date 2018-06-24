import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MemberDetail from './MemberDetail';
import SideBar from './SideBar';
import Default from './Default';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },

  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Main extends React.Component {
  
    
    state = {
      selectedMember: null,
      userRepos: [],
      userOrgs: [],
      members: [],
      isLoading: true
    }
    

  componentDidMount(){
    return fetch('https://api.github.com/orgs/code42/members')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          members: responseJson,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  getUser(user) {
    var url = user.url;
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                selectedMember: responseJson,
            });
            this.getRepos(responseJson.repos_url);
            this.getOrgs(responseJson.organizations_url);
        })
        .catch((error) => {
            console.error(error);
        });
}

getRepos(url){
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        userRepos: responseJson,
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
getOrgs(url){
  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        userOrgs: responseJson,
        isLoading: false
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
  
  handleClick(member) {
    this.getUser(member);
    this.setState({
      isLoading: true
    });
}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <SideBar onClick={this.handleClick.bind(this)} members={this.state.members} />
          <main className={classes.content}>
            {this.state.selectedMember ? (<MemberDetail selectedMember={this.state.selectedMember} userRepos={this.state.userRepos} userOrgs={this.state.userOrgs} isLoading={this.state.isLoading}/>): (<Default />)}
          </main>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
