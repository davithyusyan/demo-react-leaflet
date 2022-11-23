const buttonStyle = {border: 'none'}

const Button = ({handleClick}) => {
    return  (
        <button onClick={event => handleClick(event, 100)} style={buttonStyle} className='btn btn-primary'>Save</button>
    )
};

export default Button;