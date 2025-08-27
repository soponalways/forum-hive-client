import React from 'react';

const Button = ({children, className, onClick}) => {
    return (
        <button onClick={onClick} className={`btn hover:bg-secondary border-0  ${className}`}>{children}</button>
    );
};

export default Button;