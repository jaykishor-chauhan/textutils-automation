import React from 'react'
import { useState } from "react"
import  '../App.css';

export default function TextBox(props) {
  
  const [text, setText] = useState("");

  const handleOnChange = (evnt)=>{
    setText(evnt.target.value);
  }
  
  const converToUppercase = ()=>{
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert('Text has successfully converted to uppercase.', 'success');
  }

  const converToLowercase = ()=>{
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert('Text has successfully converted to lower case.', 'success');
  }

  const restText = ()=>{
    setText("");
    props.showAlert('Text has successfully reset.', 'success');
  }
  
  const copyText = ()=>{
    let cpyText = document.getElementById('textBox');
    cpyText.select();
    navigator.clipboard.writeText(cpyText.value);
    document.getSelection().removeAllRanges();
    props.showAlert('Text has successfully copied to clipboard.', 'success');
  }

  const removeExtraSpacr = ()=>{
    setText(text.replace(/\s+/g, ' ').trim());
    props.showAlert('Extra space has been successfully removed from text.', 'success');
  }


  const darkStyle = {
    backgroundColor: '#5e6060',
    color: 'white'
  }
  const lightStyle ={
    backgroundColor: 'white',
    color: 'black'
  }

  
  return (
    <div>
      <div className={`mb-3 container mt-5 text-${props.mode === 'light'?'dark' : 'light'}`}>
        <h2 className={`text-${props.mode === 'light'?'dark' : 'light'}`}>{props.heading}</h2>
        <textarea 
          className="form-control placeholder" 
          style={props.mode === 'dark' ? darkStyle:lightStyle}
          id="textBox" 
          placeholder='Enter your text here..' 
          value={text} 
          onChange={handleOnChange} 
          rows="8">  
        </textarea>
        <button className='btn btn-primary m-2' disabled={text.length === 0} onClick={converToUppercase}>Convert to Uppercase</button>
        <button className='btn btn-primary m-2' disabled={text.length === 0} onClick={converToLowercase}>Convert to Lowercase</button>
        <button className='btn btn-primary m-2' disabled={text.length === 0} onClick={restText}>Reset</button>
        <button className='btn btn-primary m-2' disabled={text.length === 0} onClick={copyText}>Copy Text</button>
        <button className='btn btn-primary m-2' disabled={text.length === 0} onClick={removeExtraSpacr}>Remove extra space</button>
        <h2 className='mt-3'>Text Summary</h2>
        <p>Words: {text.length>0 ? text.trim().split(/\s+/).length : 0} and Character: {text.length}</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text:'Nothing to preview.'}</p>
      </div>
    </div>
  )
}
