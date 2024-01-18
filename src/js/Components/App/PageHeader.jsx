import React from 'react';

const PageHeader = ({ name, icon, signOut }) => {
    return (
        <header>
            {icon && <span className="icon-wrapper">{icon}</span>}
            <h2 className="header-text">{name}</h2>
            <button onClick={signOut}>Sign Out</button>
        </header>
    );
};

export default PageHeader;