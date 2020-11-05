import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import AppContext from '../App/AppContext';
import { getNotesForFolder } from '../notes-helpers'


class NoteListMain extends Component{
  static defaultProps={
      match:{ 
        params:{}
      }

  }
static contextType = AppContext
  render(){
    const {notes} = this.context
    console.log(notes)
    const {folderId} = this.props.match.params
    const notesForFolder = getNotesForFolder(notes,folderId)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}

export default  NoteListMain
  
