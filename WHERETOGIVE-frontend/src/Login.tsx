import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { ChevronsLeft } from 'tabler-icons-react';
import React, { useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Anchor,
    Stack,
    Container,
    Center
  } from '@mantine/core';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Modal } from '@mantine/core';
import {createStyles} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    inner: {
        background : "none",
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

export function AuthenticationForm(props: PaperProps) {
    const { classes } = useStyles();
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
        email: '',
        name: '',
        password: '',
        terms: true,
        },

        validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [resetPasswordClicked, setResetPasswordClicked] = useState(false);

    return (
        <Container className='mt-3'>
            <Paper radius="md" p="xl" withBorder {...props}>
                <Group position='apart' className='pb-3'>
                    <Text size="lg" weight={500}>
                    Login
                    </Text>
                    <Button size='xs' variant='subtle' onClick={()=>{window.location.replace("/")}}>
                        <ChevronsLeft size={15} />
                        Back
                    </Button>
                </Group>  
                <form onSubmit={form.onSubmit(() => {
                if (type === 'register') {
                        onClickRegister(form.values.email, form.values.password);
                }
                else {
                        onClickSignIn(form.values.email, form.values.password);
                }})}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                id="NameInput"
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)} />
                        )}
                        <TextInput
                            required
                            id="EmailInput"
                            label="Email"
                            placeholder="WHERETOGIVE-user@example.com"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'} />
                        <PasswordInput
                            required
                            id="PasswordInput"
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'} />
                    </Stack>
                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs">
                    {type === 'register'
                        ? 'Already have an account? Login'
                        : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit">{upperFirst(type)}</Button>
                    </Group>
                </form>
            </Paper>
            
            <Modal 
                withCloseButton={true} 
                opened={modalIsOpen} 
                onClose={() => 
                [
                    setInvalidPassword(false),
                    setModalIsOpen(false),
                    setInvalidEmail(false),
                    setRegistrationError(false),
                    setEmailSent(false),
                    setResetPasswordClicked(false)
                ]}>
                { resetPasswordClicked && 
                    <>                       
                        <TextInput
                            required
                            label="Email"
                            placeholder="WHERETOGIVE-user@example.com"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'} 
                        />
                        <Center><Button onClick={()=>onClickResetPassword(form.values.email)}>Submit</Button></Center>
                    </> 
                }
                { emailSent && <Text styles={classes.inner}>Email with password reset directions sent.</Text> }
                { invalidPassword && <Text styles={classes.inner}>Invalid Password.</Text> }
                { invalidEmail && <Text styles={classes.inner}>Invalid Email.</Text> }
                { registrationError && <Text styles={classes.inner}>User already exists.</Text> }
                <Center>
                    { invalidPassword && <Button onClick={()=>setResetPasswordClicked(true)}>Reset Password</Button> }
                </Center>
            </Modal>

        </Container>
    );

    function onClickRegister(email:string, password:string){
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            // navigate to Dashboard on login success
            const user = userCredential.user;
            const refreshToken = user.getIdToken();
            sessionStorage.setItem('Auth Token', await refreshToken);
            window.location.replace("/dashboard");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            if(errorCode == "auth/email-already-in-use")
            {
                setRegistrationError(true);
                setModalIsOpen(true);
            }
        });
    }

    function onClickSignIn(email:string, password:string){
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const refreshToken = user.getIdToken();
            // navigate to Dashboard on login success
            sessionStorage.setItem('Auth Token', await refreshToken);
            window.location.replace("/dashboard");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode == 'auth/wrong-password'){
                setInvalidPassword(true);
                setModalIsOpen(true);
            }
            if(errorCode == 'auth/user-not-found'){
                setInvalidEmail(true);
                setModalIsOpen(true);
            }
        }); 
    }

    function onClickResetPassword(email:string){
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                setEmailSent(true);
                setModalIsOpen(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
}

