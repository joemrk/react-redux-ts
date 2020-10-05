import React from 'react'
import '../styles/text_writer.css'

const TextWriter = (props) => {
    let writerRef = React.createRef()
    
    let onClick = ()=>{
        props.onClick()
        writerRef.current.value = ''
    }
    let onChange = () =>{
        props.onChange(writerRef.current.value)
    }
    return (
        <div className="page-block text-write">
            {/* <div ref={writerRef} className="text-write-input" role="textbox" contenteditable="true" aria-multiline="true" aria-required="true"></div> */}
            <textarea ref={writerRef} onChange={onChange} value={props.state} className="text-write-input"></textarea>
            <div className="write-actions">
                <div className="write-submit-btn">
                    <a onClick={onClick} className="text-write-submit" href="#">Send</a>
                </div>
            </div>
        </div>
    )
}

export default TextWriter