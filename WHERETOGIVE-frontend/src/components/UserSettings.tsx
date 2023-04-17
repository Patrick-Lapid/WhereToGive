import {
  Button,
  Text,
  Group,
  Image,
  Paper,
  TextInput,
  Title,
  Flex,
  FileInput,
} from '@mantine/core';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import React, { useState, useRef } from 'react';
import { At, Lock, User, Check, X, Pencil } from 'tabler-icons-react';
import { useAuth } from '../../ts/authenticate';
import { storage } from '../firebase';
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';

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
  const modalRef = useRef(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const ref = useRef<HTMLButtonElement>(null);
  const [photo, setPhoto] = useState<any>(null);
  const [editDisplayName, toggleEditDisplayName] = useState<boolean>(false);
  const [editEmail, toggleEditEmail] = useState<boolean>(false);
  const [editPassword, toggleEditPassword] = useState<boolean>(false);

  async function handleRequiresRecentLoginError(password: string) {
    try {
      // Prompt the user to reauthenticate with a popup
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );

      reauthenticateWithCredential(currentUser, credential)
        .then(() => {
          if (email !== '') {
            updateEmail(currentUser, email).then(() => {
              props.bubbleProfileState({
                name: currentUser.displayName,
                email: currentUser.email,
                profilePicture: currentUser.photoURL,
              });
              toggleEditEmail(false);
              setEmail('');
              notifications.show({
                title: 'Success!',
                message: 'Your Email was saved',
                color: 'green',
                icon: <Check color="white" />,
              });
            });

            return;
          }

          if (password !== '') {
            updatePassword(currentUser, password).then(() => {
              setPassword('');
              toggleEditPassword(false);
              notifications.show({
                title: 'Success!',
                message: 'Your Password was saved',
                color: 'green',
                icon: <Check color="white" />,
              });
            });

            return;
          }
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            notifications.show({
              title: 'Error',
              message: 'Wrong Password',
              color: 'red',
              icon: <X />,
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

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
        toggleEditDisplayName(false);
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
        toggleEditEmail(false);
        notifications.show({
          title: 'Success!',
          message: 'Your Email was saved',
          color: 'green',
          icon: <Check color="white" />,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/requires-recent-login') {
          notifications.show({
            title: 'Requires Recent Login',
            message: 'Please Re-enter Credentials',
            color: 'red',
            icon: <X />,
          });
          modals.openConfirmModal({
            title: 'Please Re-Enter Password',
            children: (
              <TextInput
                type="password"
                placeholder="Password"
                label="Password"
                ref={modalRef}
              />
            ),
            labels: { confirm: 'Authenticate', cancel: 'Cancel' },
            onCancel: () => {
              setEmail('');
              toggleEditEmail(false);
            },
            onConfirm: () => {
              if (modalRef.current.value === '') {
                console.log('error');
                setEmail('');
                toggleEditEmail(false);
              } else {
                handleRequiresRecentLoginError(modalRef.current.value);
              }
            },
          });
        }
      });
  };

  const updateUserPassword = (password: string) => {
    updatePassword(currentUser, password)
      .then(() => {
        setPassword('');
        toggleEditPassword(false);
        notifications.show({
          title: 'Success!',
          message: 'Your Password was saved',
          color: 'green',
          icon: <Check color="white" />,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/requires-recent-login') {
          notifications.show({
            title: 'Requires Recent Login',
            message: 'Please Re-enter Credentials',
            color: 'red',
            icon: <X />,
          });
          modals.openConfirmModal({
            title: 'Please Re-Enter Password',
            children: (
              <TextInput
                type="password"
                placeholder="Password"
                label="Password"
                ref={modalRef}
              />
            ),
            labels: { confirm: 'Authenticate', cancel: 'Cancel' },
            onCancel: () => {
              setPassword('');
              toggleEditPassword(false);
            },
            onConfirm: () => {
              if (modalRef.current.value === '') {
                console.log('error');
                setPassword('');
                toggleEditPassword(false);
              } else {
                handleRequiresRecentLoginError(modalRef.current.value);
              }
            },
          });
        }
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
      return;
    }
    updateUserEmail(email);
  };

  const handlePasswordChange = () => {
    if (password.length < 6) {
      notifications.show({
        title: 'Error',
        message: 'Invalid Password Length',
        color: 'red',
        icon: <X />,
      });
      return;
    }
    updateUserPassword(password);
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
                    onClick={() => handleEmailChange()}
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
                Change Password
              </Button>
            )}

            {editPassword && (
              <Group>
                <TextInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  size="md"
                  icon={<Lock size="0.8rem" />}
                  // visibilityToggleIcon={({ reveal, size }) =>
                  //     reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
                  // }
                />
                <Group>
                  <Button
                    size="md"
                    variant="outline"
                    color="green"
                    onClick={() => handlePasswordChange()}
                  >
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
