import { auth } from './firebase';
import { Button, Center, Text } from '@mantine/core';
import {createStyles} from '@mantine/core';
import Navbar from './components/Navbar';
import React from 'react';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        alignItems: 'center',
    },
    header: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        margin: 'auto',
    },
}));

type DashboardProps = {}

function onClickSignOut(){
    signOut(auth).then(() => {
        // Sign-out successful.
        sessionStorage.clear();
        window.location.replace("/");
    }).catch((error) => {
        // An error happened.
    });
}

function onClickQuestionnaire(){
    window.location.replace("/questionnaire");
}

export default function Dashboard({}: DashboardProps) {
    const { classes } = useStyles();
    useEffect(() => {
        // Check session storage for auth token
        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) {
            window.location.replace("/");
        }    
    }, [])
    return (
        <>
            <Navbar links={[{link : "google.com", label : "Test", links : [{link : "test.com", label : "Test header 1"}]},{link : "", label : "Test2", links : [{link : "test.com", label : "Test header 2"}]}, {link : "", label : "Test3", links : [{link : "test.com", label : "Test header 3"}, {link : "test.com", label : "Test header 4"}]}]} />  
            <Text fw={700} fz="xl" ta="center" c="blue">Dashboard</Text>
            <Center className={classes.inner}>
                <Button 
                    className={classes.button}
                    onClick={onClickQuestionnaire}> 
                    Questionnaire
                </Button>
                <Button 
                    className={classes.button}
                    onClick={onClickSignOut}> 
                    Sign Out
                </Button>
            </Center>
        </>
        );
}

