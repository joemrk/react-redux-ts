import React from 'react'
import s from './form_control_style.module.css'

let TextInput = ({ input, meta, ...props }) => {
     const valid = meta.touched && !meta.valid
     return (
          <div className={s.inputWrap}>
               <input type="text" {...input} {...props} className={valid ? s.invalid : ''} />
               <span className={s.inputMessage}>{valid && meta.error}</span>
          </div>
     )
}

export default TextInput
