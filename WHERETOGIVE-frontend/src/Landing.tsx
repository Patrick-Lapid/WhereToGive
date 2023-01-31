import { Button, Center, Text } from '@mantine/core';
import {createStyles} from '@mantine/core';
import Navbar from './components/Navbar';
import React from 'react';

const useStyles = createStyles((theme) => ({
    button: {
        margin: 'auto',
    },
}));

type LandingProps = {}

function onClickLogin(){
    window.location.replace("/login");
}

export default function Landing({}: LandingProps) {
    const { classes } = useStyles();
    return (
        <>
            <Navbar links={[{link : "google.com", label : "Test", links : [{link : "test.com", label : "Test header 1"}]},{link : "", label : "Test2", links : [{link : "test.com", label : "Test header 2"}]}, {link : "", label : "Test3", links : [{link : "test.com", label : "Test header 3"}, {link : "test.com", label : "Test header 4"}]}]} />  
            <Center>
                <Button 
                className={classes.button}
                onClick={onClickLogin}>Login</Button>
            </Center>
        </>
        );
}