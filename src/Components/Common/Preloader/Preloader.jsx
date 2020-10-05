import React from 'react'

let Preloader = (props) =>{
    return  (props.show ? <img className='preloader-image' src="/preloader.gif" /> : null)
}
export default Preloader