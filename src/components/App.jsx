import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { auth } from '../firebase';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Home from '@material-ui/icons/Home';

import PrivateRoute from './PrivateRoute';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';
import Profile from './Profile';

const theme = createMuiTheme();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authenticated: false,
            currentUser: null ,
            isFacebook: false};
        this.logout= this.logout.bind(this);
    }


    styles = theme => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
        icon: {
            margin: theme.spacing.unit * 2,
        },
        iconHover: {
            margin: theme.spacing.unit * 2,
            '&:hover': {
                color: green[200],
            },
        },
    });






    componentWillMount() { auth.onAuthStateChanged(user => {
        console.log(user)
        if (user){
            user.providerData.forEach((profile)=> {
                if (profile.providerId == "facebook.com"){
                    this.setState({
                        isFacebook: true
                    });
                    user.updateProfile({
                        emailVerified: true
                    });
                }
            })

            if (this.state.isFacebook || (user && user.emailVerified)) {
                this.setState({
                        authenticated: true,
                        currentUser: user,
                        loading: false },
                    () => { this.props.history.push('/') }
                );
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false
                });
            }
        }

        else{
            this.setState({
                authenticated: false,
                currentUser: null,
                loading: false,
                isFacebook: false
            });
        }


        });
    }

    logout(){
        if (window.confirm("Are you sure you want to Log Out?")){
            auth.signOut();
        }
    }

    render () {
        const { authenticated, loading } = this.state;
        const content = loading ? (
            <div align="center">
                <CircularProgress size={80} thickness={5} />
            </div>
        ) : (
            <div>
                <PrivateRoute
                    exact
                    path="/"
                    component={Main}
                    authenticated={authenticated}
                    />
                <PrivateRoute
                    exact path="/editprofile"
                    component={Profile}
                    authenticated={authenticated}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/forgetpass" component={ForgetPassword} />

            </div>
        );
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                Simple Note
                            </Typography>
                            { authenticated &&
                                <Button variant="raised" color="default" onClick={() => this.logout()}>Log out</Button>
                            }
                            { authenticated &&
                            <Button variant="raised" color="default" onClick={() => this.props.history.push('/')}>
                                <Home/>
                            </Button>
                            }
                        </Toolbar>
                    </AppBar>
                    { content }
                </div>
            </MuiThemeProvider>
         );
    }
}

export default withRouter(App);
