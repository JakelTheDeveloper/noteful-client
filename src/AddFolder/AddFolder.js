import React, { Component } from 'react';
import ValidationError from '../ValidationError';
import AppContext from '../App/AppContext';
import './AddFolder.css';

class AddFolder extends Component {
    constructor (props){
        super(props);
        this.state = {
            error: null
        }
    }

    static contextType = AppContext;

    validateName(folderName) {
        const name = folderName.trim();
        return (name.length === 0  ? 'folder name required': false);
        // if(name.length === 0){
        //     return 'Folder name required'
        // }else{

        // }
        // this.setState({name: {value: name}});
      }

      clearError=()=>{
          this.setState({
              error:null
          })
      }
    handleSubmit(event){
        event.preventDefault();
        // const{name} = this.state;
        const name = event.target.folderName.value;
        const error = this.validateName(name)
        if(error){
            this.setState({error})
        }else{
        const url = 'http://localhost:9090/folders';
        const options = {
          method: 'POST',
          body: JSON.stringify({name: name}),
          headers: {'Content-Type': 'application/json'}
        }
        fetch(url, options)
        .then(res => {
          if(!res.ok){
            throw new Error('Something went wrong posting "folders", please try again later');
          }
          return res.json();
        })
        .then(folder => {
          this.context.addFolder(folder)
          //where Router comes into play to push the user to the foler id url
          this.props.history.push(`/folder/${folder.id}`)
        // allow parent to perform extra behaviour
        
        })
        .catch(err => console.log(err.message)) 
      }
    }
    
    render() {

        return (
            <form className='add_folder' onSubmit={(event) => this.handleSubmit(event)}>
            <h2>Add a Folder</h2>
            <div className='form_group'>
              <label htmlFor='folder__name'>Name of folder:</label>
              <input type='text' className='folder__name' id='folder__name' name='folderName' required/>
              {this.state.error && (<ValidationError message={this.state.error} clearError={this.clearError} />)}
            </div>
            
            <div className="addFolder-button-group">
            <button type="reset" className="addFolder-button" onClick={() => this.props.history.goBack()}>
                Cancel
            </button>
            <button type="submit" className="addFolder-button" disabled={this.state.error}>
                Save Folder
            </button>
           </div>
          </form>
        )
    }
}

export default AddFolder;