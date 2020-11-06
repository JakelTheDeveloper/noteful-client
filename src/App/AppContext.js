import React from 'react';

export default React.createContext({
    notes: [],
    folers:[],
    deleteNote: () => {},
    addFolder:()=>{},
    addNote:()=>{}
})