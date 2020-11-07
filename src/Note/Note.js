import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppContext from './../App/AppContext'
import PropTypes from 'prop-types'
import './Note.css'

export default class Note extends Component {
  static defaultProps ={
    note:{
      note_name:'',
      id: 1,
      modified:'',
      folder_id: 1,
      note_content:''
    },
    onDeleteNote: () => {},
  }
  static contextType = AppContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        //this.context.props.deleteNote(note)
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render(){

    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    note_name: PropTypes.string.isRequired,
    modified: PropTypes.string,
    folder_id: PropTypes.number.isRequired,
    note_content: PropTypes.string.isRequired
  }),
  onDeleteNote: PropTypes.func
}