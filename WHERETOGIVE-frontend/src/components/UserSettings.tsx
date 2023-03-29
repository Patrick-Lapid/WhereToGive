import { Center, Group, Input, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { updateEmail, updateProfile } from 'firebase/auth';
import React from 'react'
import {At, EyeOff, EyeCheck, Lock, User} from "tabler-icons-react"
import { useAuth } from '../../ts/authenticate';

type Props = {}

const UserSettings = (props: Props) => {

    const {currentUser} = useAuth();

    const updateDisplayName = (firstName : string, lastName : string) => {
        updateProfile(currentUser, {
            displayName: `${firstName} ${lastName}`
          }).then(() => {
            console.log("Display name updated!");
          }).catch((error) => {
            console.log(error);
          });
    }

    const updateUserEmail = (email : string) => {
        updateEmail(currentUser, 
            email
          ).then(() => {
            console.log("Display name updated!");
          }).catch((error) => {
            console.log(error);
          });
    }

    const updateProfilePicture = (firstName : string, lastName : string) => {
        updateProfile(currentUser, {
            photoURL: `${firstName} ${lastName}`
          }).then(() => {
            console.log("Display name updated!");
          }).catch((error) => {
            console.log(error);
          });
    }



    return (
        <div className='d-flex flex-column' style={{width : "95%", margin: "2rem auto"}}>
            <Title>
                Edit Profile
            </Title>
            <Paper
                radius="md"
                withBorder
                p="lg"
                style={{
                    height: '650px',
                    display: 'flex',
                    flexDirection: 'row',
                    
                }}
            >
            <Group>
            

            <TextInput
                placeholder="Name"
                label="Display Name"
                size="md"
                icon={<User size="0.8rem" />}
                
            />

            <TextInput label="Change Email" size="md" placeholder="Email" icon={<At size="0.8rem" />} />

            <PasswordInput
            label="Change Password"
            placeholder="Password"
            defaultValue="secret"
            size="md"
            icon={<Lock size="0.8rem" />}
            visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
            }
            />
            
            </Group>
            

            <div>
                img
            </div>


            </Paper>

            
            
        </div>
    );
}

export default UserSettings;