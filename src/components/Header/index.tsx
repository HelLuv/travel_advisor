import * as React from 'react';

interface HeaderProps {

}

const Header:React.FC<HeaderProps> = ({})=>{

    return (
<h1>Header</h1>
    )
};

export default React.memo(Header);