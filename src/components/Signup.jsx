import React, { Component } from 'react';
import { auth } from '../firebase';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Modal from 'material-ui/Modal';

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

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            displayName : "",
            isSignUpSuccess : false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password, displayName} = this.state;
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.updateProfile({displayName: displayName});
            console.log(authUser);
            authUser.sendEmailVerification();
        }).then(()=>
            this.setState({
                isSignUpSuccess : true
            })
        )
        .catch(authError => {
            alert(authError);
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email, password, displayName } = this.state;
        const classes = this.props.classes;
        return (
            <div>
                {/*{ this.state.isSignUpSuccess ? < Modal >hi</Modal> : null }*/}
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Sign up</h1>
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <TextField
                                    id="displayName"
                                    label="Your Name"
                                    className={classes.textField}
                                    value={displayName}
                                    onChange={this.handleChange('displayName')}
                                    margin="normal"
                                    type="displayName"
                                />
                                <br />
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
                                <Button variant="raised" color="primary" type="submit">Sign up</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Signup);
