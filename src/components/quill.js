import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

export default class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '', theme: 'snow' };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(value) {
    console.log(value)
    if(value.includes("img"))
    {

       value =value.replace(/<img/g, '<br><img style= "width :50%;"  ');
    }
    if(value.includes("<pre"))
    {

       value =value.replace(/<pre/g, '<br><pre style= "background-color:#F2F3F4; width:600px; border-radius: 10px; padding:20px; max-height: 300px"  ');
    }
    if(this.props.placeholder =="Description")
      this.props.handleDescription(value);    
    else
      this.props.handleValue(value);
  }
  
  
  render () {
   
    return (
      <div>
        <ReactQuill 
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
         />
         
       </div>
     )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video', 'code-block'],
    ['clean'],
    

  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    syntax: true,
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video', 'code-block'
]

/* 
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
}

