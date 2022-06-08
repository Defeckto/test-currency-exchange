import React from 'react';

const Header = (props) => {
    return (
        <header className="header">
            <div>$ {props.headerExchangeRateUSD}</div>
            <div>€ {props.headerExchangeRateEUR}</div>
        </header>
    );
}

export default Header;
