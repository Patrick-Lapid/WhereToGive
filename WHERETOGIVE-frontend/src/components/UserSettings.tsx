import { Group, Input } from '@mantine/core';
import React from 'react'
import { useAuth } from '../../ts/authenticate';

type Props = {}

const UserSettings = (props: Props) => {

    const {currentUser} = useAuth();

    return (
        <div className='d-flex flex-column' style={{width : "95%", margin: "2rem auto"}}>
            <Input />
        </div>
    );
}

export default UserSettings;