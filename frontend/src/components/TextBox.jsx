import './textbox.css'

const Textbox = ({ message }) => {

    return(
        <div className='box'>
            <div className='text'>{ message }</div>
        </div>
    )
}

export default Textbox