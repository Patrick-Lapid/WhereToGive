import { auth } from './firebase';
import { Button, Center, Text } from '@mantine/core';
import {createStyles} from '@mantine/core';
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

