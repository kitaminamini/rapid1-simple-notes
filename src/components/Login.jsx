import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth , facebookProvider, googleProvider} from '../firebase';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import blue from 'material-ui/colors/blue';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}); 



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
            console.log(authUser);
        })
        .catch(authError => {
            alert(authError);
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    async loginWithGoogle(){
        auth.signInWithPopup(googleProvider).then((result) =>{
            var token = result.credential.accessToken;

            var user = result.user;
        }).catch(error => {
            alert(error);
        });
    }

    async loginWithFacebook(){
        // const {type, token}  = await Expo.Facebook
        //     .loginWithReadPermissionsAsyn('619268188418430', {permissions: ['public_profile']})
        //
        // if (type == 'succeess'){
        //
        //     const credential = auth.FacebookAuthProvider.credential(token)
        //
        //     auth.signInWithCredential(credential)
        //         .catch((error) => {
        //             console.log(error)
        //         })
        // }

        auth.signInWithPopup(facebookProvider)
            .then((user) => {

                // console.log(user);
            }).catch(error =>{
                alert(error);
        })

    }

    render() {
        const { email, password } = this.state;
        const classes = this.props.classes;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>Log in</h1>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <TextField
                              id="email"
                              label="Email"
                              className={classes.textField}
                              value={email}
                              onChange={this.handleChange('email')}
                              margin="normal"
                              type="email"
                            />
                            <br />
                            <TextField
                              id="password"
                              label="Password"
                              className={classes.textField}
                              value={password}
                              onChange={this.handleChange('password')}
                              margin="normal"
                              type="password"
                            />
                            <br />
                            <Button variant="raised" color="primary" type="submit">Log in</Button>
                        </form>
                        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                        <p>Forget Password? <Link to="/forgetpass">Reset passeord here</Link></p>
                        <Button className={classes.button} variant="raised" color="primary"
                                onClick={() => {this.loginWithFacebook()}}>
                            Login with Facebook
                        </Button>
                        <Button className={classes.button} variant="raised" color="secondary"
                                onClick={() => {this.loginWithGoogle()}}>
                            Login with Google
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Login);
