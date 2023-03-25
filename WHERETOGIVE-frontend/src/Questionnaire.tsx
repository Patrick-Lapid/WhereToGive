import { auth } from './firebase';
import { Button, Center, Text } from '@mantine/core';
import { createStyles } from '@mantine/core';
import React from 'react';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuth } from '../ts/authenticate';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
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

type QuestionnaireProps = {};

export default function Questionnaire({}: QuestionnaireProps) {
  const { classes } = useStyles();
  const { logout } = useAuth();

  useEffect(() => {
    // Check session storage for auth token
    let authToken = sessionStorage.getItem('Auth Token');
    if (!authToken) {
      window.location.replace('/');
    }
  }, []);
  return (
    <>
      <Text fw={700} fz="xl" ta="center" c="blue">
        Questionnaire
      </Text>
      <Center>
        <Button className={classes.button} onClick={logout}>
          {' '}
          Sign Out
        </Button>
      </Center>
    </>
  );
}
