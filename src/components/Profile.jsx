import React, { Component } from 'react';
import { auth } from '../firebase';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

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

class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            displayName: "",
            password : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitPass = this.onSubmitPass.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const {displayName} = this.state;
        auth.currentUser.updateProfile({displayName: displayName})
            .then()
            .catch(Error => {
                alert(Error);
            })
    }

    onSubmitPass(event){
        event.preventDefault();
        const {password} = this.state;
        auth.currentUser.updatePassword(password)
            .catch(error =>{
                alert(error);
            })
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        const {name, password} = this.state;
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Edit Profile</h1>
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <TextField
                                    id="displayName"
                                    label="Your Name"
                                    className={classes.textField}
                                    value={name}
                                    onChange={this.handleChange('displayName')}
                                    margin="normal"
                                    // type="displayName"
                                />
                                <Button variant="raised" color="primary" type="submit">Edit Name</Button>
                            </form>
                            <br/>
                            <form onSubmit={this.onSubmitPass} autoComplete="off">
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
                                <Button variant="raised" color="primary" type="submit">Edit Password</Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }


}



export default withStyles(styles)(Profile);