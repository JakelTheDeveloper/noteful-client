import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import AppContext from './AppContext';
import ErrorBoundary from '../ErrorBoundary';
import config from '../config';
// import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        error: null
    };

    handleDeleteNote = noteId => {    
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    handleAddFolder = (folder) => {
        this.setState({
            folders: [...this.state.folders,folder]
        });
    }

    handleAddNote = (note) => {
        this.setState({
            notes: [...this.state.notes,note]
        });
    }


    componentDidMount() {
      fetch(`${config.URL}/folders`)
      .then(response => response.json())
      .then(folders => this.setState({folders}))
    fetch(`${config.URL}/notes`)
      .then((response) => response.json())
      .then((notes) => this.setState({notes}));
    }


    renderNavRoutes() {
        // const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                        //     routeProps => (
                        //     <NoteListNav
                        //         folders={folders}
                        //         notes={notes}
                        //         {...routeProps}
                        //     />
                        // )}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav}/>
                <Route path="/add-note" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        // const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain} 
                        //=> {
                        //     const {folderId} = routeProps.match.params;
                        //     const notesForFolder = getNotesForFolder(
                        //         notes,
                        //         folderId
                        //     );
                        //     return (
                        //         <NoteListMain
                        //             {...routeProps}
                        //             notes={notesForFolder}
                        //         />
                        //     );
                        // }}
                    />
                ))}
                 <Route path="/add-folder" component={AddFolder} />
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote
        };
        return (
            <ErrorBoundary>
            <AppContext.Provider value={value}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </AppContext.Provider>
            </ErrorBoundary>
        );
       
    }
}

export default App;
