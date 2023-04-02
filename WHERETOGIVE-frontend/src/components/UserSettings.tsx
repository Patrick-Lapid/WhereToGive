import { Button, Text, Group, Input, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { reauthenticateWithCredential, reauthenticateWithPopup, updateEmail, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import {At, EyeOff, EyeCheck, Lock, User, Check, X, Pencil } from "tabler-icons-react";
// import { notifications } from '@mantine/notifications';
import { useAuth } from '../../ts/authenticate';

interface userProfile {
    name : string;
    email: string;
    profilePicture: string;
}

type Props = {
    bubbleProfileState : (profile : userProfile) => void;
}

const UserSettings = (props: Props) => {

    const {currentUser} = useAuth();
    const [displayName, setDisplayName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [editDisplayName, toggleEditDisplayName] = useState<boolean>(false);
    const [editEmail, toggleEditEmail] = useState<boolean>(false);
    const [editPassword, toggleEditPassword] = useState<boolean>(false);


    const updateDisplayName = (displayName : string) => {
        updateProfile(currentUser, {
            displayName: displayName
          }).then(() => {
            props.bubbleProfileState({name : currentUser.displayName, email : currentUser.email, profilePicture : currentUser.photoURL});
            console.log("Display name updated!");
            setDisplayName("");
          }).catch((error) => {
            console.log(error);
          });
    }

    const updateUserEmail = (email : string) => {
        updateEmail(currentUser, 
            email
          ).then(() => {
            props.bubbleProfileState({name : currentUser.displayName, email : currentUser.email, profilePicture : currentUser.photoURL});
            console.log("Email updated!");
            setEmail("");
          }).catch((error) => {
            console.log(error);
          });
    }

    const updateProfilePicture = (firstName : string, lastName : string) => {
        updateProfile(currentUser, {
            photoURL: `${firstName} ${lastName}`
          }).then(() => {
            props.bubbleProfileState({name : currentUser.displayName, email : currentUser.email, profilePicture : currentUser.photoURL});
            console.log("Photo updated!");
          }).catch((error) => {
            console.log(error);
          });
    }

    const handleDisplayNameChange = () => {
        if(displayName.length === 0){
            // notifications.show({
            //     title: 'Error',
            //     message: 'Display Name must be at least one character.',
            //     color: 'red',
            //     icon: <X />
            // }); 
            console.log("display name too short");
        }
        updateDisplayName(displayName);
        
    }

    const handleEmailChange = () => {
        if(displayName.length === 0){
            // notifications.show({
            //     title: 'Error',
            //     message: 'Display Name must be at least one character.',
            //     color: 'red',
            //     icon: <X />
            // }); 
            console.log("email too short");
        }
        updateUserEmail(email);
        
    }

    useEffect(() => {
        // reauthenticateWithCredential(currentUser);
    })


    return (
        <div style={{width : "95%", margin: '1rem auto 0'}}>
            
            <Paper
                radius="md"
                withBorder
                shadow="sm"
                p="lg"
                style={{
                    height: '650px',
                    display: 'flex',
                    flexDirection: 'column',
                    
                }}
            >
            <Title>
                Edit Profile
            </Title>
            <Group style={{display:"flex", flexDirection: "row", justifyContent:"space-between", alignItems:"center", height : "70%", width: "60%"}}>
            

            
                <Group style={{display:"flex", flexDirection: "column", alignItems:"center", width: "70%"}}>
                
                {!editDisplayName &&
                    <Group>
                        <Text fz="md" fw={500}>Display Name: {currentUser && currentUser.displayName == null ? "None" : currentUser.displayName}</Text>
                        <Button id="editDisplayName" size="xs" variant="outline" color='gray' onClick={() => toggleEditDisplayName(true)}><Pencil size="0.8rem" /></Button>
                    </Group>
                }

                {editDisplayName &&

                    <Group>
                        <TextInput
                            id="DisplayName"
                            placeholder="Name"
                            value={displayName}
                            onChange={(event) => setDisplayName(event.currentTarget.value)}
                            size="md"
                            icon={<User size="0.8rem" />}
                            
                        />
                        <Group>
                            <Button size="md" variant="outline" color='green' id="updateDisplayName" onClick={handleDisplayNameChange}><Check size="0.8rem" /></Button>
                            <Button size="md" variant="outline" color='red' onClick={() => toggleEditDisplayName(false)}><X size="0.8rem" /></Button>
                        </Group>

                    </Group>
                }
                    
                {
                    !editEmail && 
                    <Group>
                        <Text fz="md" fw={500}>Email: {currentUser && currentUser.email == null ? "None" : currentUser.email}</Text>
                        <Button size="xs" variant="outline" color='gray' onClick={() => toggleEditEmail(true)}><Pencil size="0.8rem" /></Button>
                    </Group>
                }

                {
                    editEmail &&
                    
                        <Group>
                            <TextInput size="md" placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.currentTarget.value)}
                             icon={<At size="0.8rem" />} />
                            <Group>
                                <Button size="md" variant="outline" color='green' onClick={handleEmailChange}><Check size="0.8rem" /></Button>
                                <Button size="md" variant="outline" color='red' onClick={() => toggleEditEmail(false)}><X size="0.8rem" /></Button>
                            </Group>
                        </Group>
                    
                }

                {
                    !editPassword &&
                    <Button variant="outline" color='gray' onClick={() => toggleEditPassword(true)}> Change Password</Button>
                }

                {   
                    editPassword &&

                    <Group>
                        <TextInput
                        type="password"
                        placeholder="Password"
                        defaultValue="Password"

                        size="md"
                        icon={<Lock size="0.8rem" />}
                        // visibilityToggleIcon={({ reveal, size }) =>
                        //     reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
                        // }
                        />
                        <Group>
                            <Button size="md" variant="outline" color='green'><Check size="0.8rem" /></Button>
                            <Button size="md" variant="outline" color='red' onClick={() => toggleEditPassword(false)}><X size="0.8rem" /></Button>
                        </Group>
                    </Group>
                }
                    
                </Group>

                <div style={{width : "20%"}}>
                    
                </div>  
            
            </Group>
            

            


            </Paper>

            
            
        </div>
    );
}

export default UserSettings;


