import React, { Component } from 'react';
import { auth, db } from '../firebase';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import List, {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from 'material-ui/List';
import SortableComponent from './SortableComponent'



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    list: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: 360,
        maxHeight: 200,
        overflow: 'auto',
    },

});



class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes : [],
            current : ""
        };
        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    componentWillMount() {
        const uid = auth.currentUser.uid;
        let notesRef = db.ref('notes/' + uid).orderByKey().limitToLast(100);
        notesRef.on('child_added', snapshot => {
            let note = { text: snapshot.val(), id: snapshot.key };
            this.setState({ notes: [note].concat(this.state.notes) });
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    addNote(e) {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        db.ref('notes/' + uid).push(this.state.current);
        this.setState({ current : "" });
    }

    deleteNote = noteId => event => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete this note?")){
            const uid = auth.currentUser.uid;
            db.ref('notes/'+uid+'/'+noteId).remove(this.state.current);
            window.location.reload();
        }
    };




    render() {
        const classes = this.props.classes;
        // const {notes} = this.state.notes;
        console.log("in main-----")
        console.log(this.state.notes)
        return (
            <Grid container className={classes.container}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <h2>Hello, { auth.currentUser.displayName }</h2>
                        {/*<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />*/}
                            <List className={classes.list}>

                                { this.state.notes.length > 0 ?
                                    <SortableComponent items={this.state.notes}>

                                    </SortableComponent>
                                    : null
                                }
                                { /* Render the list of messages */

                                    this.state.notes.map( (note,index) =>
                                        <ListItem key={note.id}>
                                            <ListItemText primary={(index+1) + '. ' + note.text}/>
                                            <ListItemSecondaryAction>
                                              <IconButton aria-label="Delete">
                                                <DeleteIcon onClick={this.deleteNote(note.id)} />
                                              </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem> )
                                }
                            </List>
                            <form onSubmit={this.addNote}>
                                <TextField
                                    id="note"
                                    label="Enter new note"
                                    className={classes.textField}
                                    value={this.state.current}
                                    onChange={this.handleChange('current')}
                                    margin="normal"
                                    />
                                <br />
                                <Button variant="raised" color="primary" type="submit">Add</Button>
                            </form>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <h2>Your Profile</h2>
                        <br/>
                        <h3>Name: {auth.currentUser.displayName}</h3>
                        <br/>
                        <h3>Email: {auth.currentUser.email}</h3>
                        <br/>
                        <Button variant="raised" color="secondary"
                                onClick={()=> {this.props.history.push('/editprofile')}}>
                            Edit Profile
                        </Button>
                    </Paper>
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(Main);

