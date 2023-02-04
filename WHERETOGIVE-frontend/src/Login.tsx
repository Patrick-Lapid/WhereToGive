import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
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
  } from '@mantine/core';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';

export function AuthenticationForm(props: PaperProps) {
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
              }
            }
            )}>
              
                <Stack>
                    
                    {type === 'register' && (
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)} />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'} />

                    <PasswordInput
                        required
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
                        size="xs"
                    >
                {type === 'register'
                    ? 'Already have an account? Login'
                    : "Don't have an account? Register"}
                    </Anchor>

                    <Button type="submit">{upperFirst(type)}</Button>
                </Group>
            </form>
        </Paper>
    </Container>
  );
}

function onClickRegister(email:string, password:string){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // navigate to Dashboard on login success
        window.location.replace("/dashboard");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
    }); 

    

}