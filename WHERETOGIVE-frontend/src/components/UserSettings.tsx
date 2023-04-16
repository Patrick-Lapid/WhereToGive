import {
  Button,
  Text,
  Group,
  Image,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Avatar,
  Flex,
  FileInput,
} from '@mantine/core';
import {
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  updateEmail,
  updateProfile,
} from 'firebase/auth';
import React, { useEffect, useState, useRef } from 'react';
import {
  At,
  EyeOff,
  EyeCheck,
  Lock,
  User,
  Check,
  X,
  Pencil,
} from 'tabler-icons-react';
// import { notifications } from '@mantine/notifications';
import { useAuth } from '../../ts/authenticate';
import { storage } from '../firebase';
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { notifications } from '@mantine/notifications';

interface userProfile {
  name: string;
  email: string;
  profilePicture: string;
}

type Props = {
  bubbleProfileState: (profile: userProfile) => void;
};

const UserSettings = (props: Props) => {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const ref = useRef<HTMLButtonElement>(null);
  const [photo, setPhoto] = useState<any>(null);
  const [editDisplayName, toggleEditDisplayName] = useState<boolean>(false);
  const [editEmail, toggleEditEmail] = useState<boolean>(false);
  const [editPassword, toggleEditPassword] = useState<boolean>(false);

  const updateDisplayName = (displayName: string) => {
    updateProfile(currentUser, {
      displayName: displayName,
    })
      .then(() => {
        props.bubbleProfileState({
          name: currentUser.displayName,
          email: currentUser.email,
          profilePicture: currentUser.photoURL,
        });
        console.log('Display name updated!');
        setDisplayName('');
        notifications.show({
          title: 'Success!',
          message: 'Your Display Name was saved',
          color: 'green',
          icon: <Check color="white" />,
        });
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: 'Display Name Change Error',
          message: error,
          color: 'red',
          icon: <X />,
        });
      });
  };

  const updateUserEmail = (email: string) => {
    updateEmail(currentUser, email)
      .then(() => {
        props.bubbleProfileState({
          name: currentUser.displayName,
          email: currentUser.email,
          profilePicture: currentUser.photoURL,
        });
        console.log('Email updated!');
        setEmail('');
        notifications.show({
          title: 'Success!',
          message: 'Your Email was saved',
          color: 'green',
          icon: <Check color="white" />,
        });
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: 'Email Change Error',
          message: error,
          color: 'red',
          icon: <X />,
        });
      });
  };

  const updateProfilePicture = () => {
    if (photo) {
      const storageRef = firebaseRef(
        storage,
        `${currentUser.uid}/avatar.${photo.type.split(['/'])[1]}`
      );
      uploadBytes(storageRef, photo)
        .then((snapshot) => {
          getDownloadURL(storageRef)
            .then((url) => {
              updateProfile(currentUser, {
                photoURL: url,
              })
                .then(() => {
                  props.bubbleProfileState({
                    name: currentUser.displayName,
                    email: currentUser.email,
                    profilePicture: currentUser.photoURL,
                  });
                  console.log('Photo updated!', url);
                  setPhoto(null);
                  notifications.show({
                    title: 'Success!',
                    message: 'Your Profile Picture was saved :)',
                    color: 'green',
                    icon: <Check color="white" />,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  notifications.show({
                    title: 'Photo Upload Error',
                    message: error,
                    color: 'red',
                    icon: <X />,
                  });
                });
            })
            .catch((error) => {
              console.log(error);
              notifications.show({
                title: 'Photo Upload Error',
                message: error,
                color: 'red',
                icon: <X />,
              });
            });
        })
        .catch((error) => {
          console.log(error);
          notifications.show({
            title: 'Photo Upload Error',
            message: error,
            color: 'red',
            icon: <X />,
          });
        });
    }
  };

  const handleDisplayNameChange = () => {
    if (displayName.length === 0) {
      notifications.show({
        title: 'Error',
        message: 'Display Name must be at least one character.',
        color: 'red',
        icon: <X />,
      });
      console.log('display name too short');
    }
    updateDisplayName(displayName);
  };

  const handleEmailChange = () => {
    if (email.length === 0 || !email.includes('@') || !email.includes('.')) {
      notifications.show({
        title: 'Error',
        message: 'Invalid Email Format',
        color: 'red',
        icon: <X />,
      });
    }
    updateUserEmail(email);
  };

  return (
    <div style={{ width: '95%', margin: '1rem auto 0' }}>
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
        <Title>Edit Profile</Title>
        <Group
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '70%',
            width: '60%',
          }}
        >
          <Group
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '70%',
            }}
          >
            {!editDisplayName && (
              <Group>
                <Text fz="md" fw={500}>
                  Display Name:{' '}
                  {currentUser && currentUser.displayName == null
                    ? 'None'
                    : currentUser.displayName}
                </Text>
                <Button
                  id="editDisplayName"
                  size="xs"
                  variant="outline"
                  color="gray"
                  onClick={() => toggleEditDisplayName(true)}
                >
                  <Pencil size="0.8rem" />
                </Button>
              </Group>
            )}

            {editDisplayName && (
              <Group>
                <TextInput
                  id="DisplayName"
                  placeholder="Name"
                  value={displayName}
                  onChange={(event) =>
                    setDisplayName(event.currentTarget.value)
                  }
                  size="md"
                  icon={<User size="0.8rem" />}
                />
                <Group>
                  <Button
                    size="md"
                    variant="outline"
                    color="green"
                    id="updateDisplayName"
                    onClick={handleDisplayNameChange}
                  >
                    <Check size="0.8rem" />
                  </Button>
                  <Button
                    size="md"
                    variant="outline"
                    color="red"
                    onClick={() => toggleEditDisplayName(false)}
                  >
                    <X size="0.8rem" />
                  </Button>
                </Group>
              </Group>
            )}

            {!editEmail && (
              <Group>
                <Text fz="md" fw={500}>
                  Email:{' '}
                  {currentUser && currentUser.email == null
                    ? 'None'
                    : currentUser.email}
                </Text>
                <Button
                  size="xs"
                  variant="outline"
                  color="gray"
                  onClick={() => toggleEditEmail(true)}
                >
                  <Pencil size="0.8rem" />
                </Button>
              </Group>
            )}

            {editEmail && (
              <Group>
                <TextInput
                  size="md"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  icon={<At size="0.8rem" />}
                />
                <Group>
                  <Button
                    size="md"
                    variant="outline"
                    color="green"
                    onClick={handleEmailChange}
                  >
                    <Check size="0.8rem" />
                  </Button>
                  <Button
                    size="md"
                    variant="outline"
                    color="red"
                    onClick={() => toggleEditEmail(false)}
                  >
                    <X size="0.8rem" />
                  </Button>
                </Group>
              </Group>
            )}

            {!editPassword && (
              <Button
                variant="outline"
                color="gray"
                onClick={() => toggleEditPassword(true)}
              >
                {' '}
                Change Password
              </Button>
            )}

            {editPassword && (
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
                  <Button size="md" variant="outline" color="green">
                    <Check size="0.8rem" />
                  </Button>
                  <Button
                    size="md"
                    variant="outline"
                    color="red"
                    onClick={() => toggleEditPassword(false)}
                  >
                    <X size="0.8rem" />
                  </Button>
                </Group>
              </Group>
            )}
          </Group>

          <Flex
            style={{ width: '20%' }}
            gap="lg"
            justify="center"
            align="center"
            direction="column"
          >
            <Image
              maw={240}
              mx="auto"
              radius="md"
              src={photo ? URL.createObjectURL(photo) : currentUser.photoURL}
              alt="Random image"
            />
            {!photo && (
              <Button
                variant="outline"
                color="gray"
                onClick={() => ref.current.click()}
              >
                Update Profile Picture
              </Button>
            )}
            {photo && (
              <Group>
                <Button
                  size="md"
                  variant="outline"
                  color="green"
                  onClick={() => updateProfilePicture()}
                >
                  <Check size="0.8rem" />
                </Button>
                <Button
                  size="md"
                  variant="outline"
                  color="red"
                  onClick={() => setPhoto(null)}
                >
                  <X size="0.8rem" />
                </Button>
              </Group>
            )}
          </Flex>
        </Group>
      </Paper>

      <FileInput
        ref={ref}
        value={photo}
        onChange={setPhoto}
        display={'none'}
        accept="image/png,image/jpeg,image/gif"
      />
    </div>
  );
};

export default UserSettings;
