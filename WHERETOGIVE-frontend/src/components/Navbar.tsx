import {
  createStyles,
  Group,
  Center,
  Burger,
  Container,
  Drawer,
  ScrollArea,
  Divider,
  UnstyledButton,
  Box,
  Collapse,
  Button,
  Text,
  Title,
  Menu,
  Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import {
  ArrowsExchange,
  ChevronDown,
  LayoutDashboard,
  Logout,
  PigMoney,
  Settings,
  WorldDownload,
} from 'tabler-icons-react';
import globe from '../../public/spinningGlobe.gif';
import profilePicture from '../../public/noProfilePicture.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../ts/authenticate';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  collapsedLink: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string }[];
}

interface User {
  name: string;
  image: any;
}

export default function Navbar({ links }: HeaderSearchProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { logout, loading, currentUser } = useAuth();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  const collapsedLinks = links.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.label}>
      <Group noWrap align="flex-start">
        {/* <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.fn.primaryColor()} />
        </ThemeIcon> */}
        <div>
          <Text size="sm" weight={500}>
            {item.label}
          </Text>
          {/* <Text size="xs" color="dimmed">
            {item.description}
          </Text> */}
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box style={{}}>
      {/* <Header height={56}> */}
      {!loading && (
        <Container>
          <div className={classes.inner}>
            {/* Site Header + GIF */}
            <Group spacing={8}>
              <Title order={3}>WhereToGive</Title>
              <img
                style={{ paddingTop: '1px' }}
                src={globe}
                alt="logo"
                width={30}
              />
            </Group>
            {/* links + user auth buttons */}
            <Group spacing={45} className={classes.links} color="teal">
              <Group spacing={5}>{items}</Group>
              {!currentUser && (
                <Group spacing={5}>
                  <Button
                    className="ml-3"
                    size="xs"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    onClick={() => {
                      window.location.replace('/login');
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    size="xs"
                    variant="subtle"
                    onClick={() => {
                      window.location.replace('/login');
                    }}
                  >
                    Sign up
                  </Button>
                </Group>
              )}

              {currentUser && (
                <Menu
                  width={260}
                  position="bottom-end"
                  transition="pop-top-right"
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
                >
                  <Menu.Target>
                    <UnstyledButton
                      className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                      })}
                    >
                      <Group spacing={7}>
                        <Avatar
                          src={currentUser && currentUser.photoURL}
                          alt={currentUser && currentUser.displayName}
                          radius="xl"
                          size={20}
                        />
                        <Text
                          weight={500}
                          size="sm"
                          sx={{ lineHeight: 1 }}
                          mr={3}
                        >
                          {currentUser && currentUser.displayName}
                        </Text>
                        <ChevronDown size={12} />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<LayoutDashboard size={14} />}>
                      <Link to={'/profile'}>Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item icon={<WorldDownload size={14} />}>
                      Saved charities
                    </Menu.Item>
                    <Menu.Item icon={<PigMoney size={14} />}>
                      Your donations
                    </Menu.Item>

                    <Menu.Label>Settings</Menu.Label>
                    <Menu.Item icon={<Settings size={14} />}>
                      Account settings
                    </Menu.Item>
                    <Menu.Item icon={<ArrowsExchange size={14} />}>
                      Change account
                    </Menu.Item>
                    <Menu.Item
                      icon={<Logout color="red" size={14} />}
                      onClick={logout}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.burger}
              size="sm"
            />
          </div>
        </Container>
      )}

      {/* </Header> */}
      {/* FullScreen Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Link
            to={'/'}
            className={classes.collapsedLink}
            onClick={closeDrawer}
          >
            Home
          </Link>
          <UnstyledButton
            className={classes.collapsedLink}
            onClick={toggleLinks}
          >
            <Center inline>
              <Box component="span" mr={5}>
                Navigation
              </Box>
              <ChevronDown
                className="pt-1"
                size={16}
                color={theme.fn.primaryColor()}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{collapsedLinks}</Collapse>

          {/* Swap out for HashLink */}
          <Link to={'/about'} className={classes.collapsedLink}>
            About
          </Link>
          <Link to={'/creators'} className={classes.collapsedLink}>
            Home
          </Link>

          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          {!currentUser && (
            <Group position="center" grow pb="xl" px="md">
              <Button
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                onClick={() => {
                  window.location.replace('/login');
                }}
              >
                Log in
              </Button>
              <Button
                variant="subtle"
                onClick={() => {
                  window.location.replace('/login');
                }}
              >
                Sign up
              </Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
