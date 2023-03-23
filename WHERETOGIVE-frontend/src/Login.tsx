import { ChevronsLeft } from 'tabler-icons-react';
import React from 'react';
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
import { useAuth } from '../ts/authenticate';

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
    // UserAuth context
    const {signup, login, resetPassword, invalidPassword, invalidEmail, registrationError, emailSent, resetPasswordClicked, modalIsOpen, setInvalidPassword, setInvalidEmail, setRegistrationError, setEmailSent, setResetPasswordClicked, setModalIsOpen} = useAuth();

    return (
        <div style={{backgroundColor : "white"}}>
            <Container className='mt-5'>
                
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
                            signup(form.values.email, form.values.password, form.values.name);
                    }
                    else {
                            login(form.values.email, form.values.password);
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
                            <Button id="login-toggle-selector" type="submit">{upperFirst(type)}</Button>
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
                            <Center><Button onClick={()=>resetPassword(form.values.email)}>Submit</Button></Center>
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
        </div>
    );

}

