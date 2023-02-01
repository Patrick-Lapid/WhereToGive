import { createStyles, Header, Menu, Group, Center, Burger, Container, Drawer, ScrollArea, Divider, UnstyledButton, Box, Collapse, Button, ThemeIcon, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import React from 'react';
import { Link } from 'react-router-dom';

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
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
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
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
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
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
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
  links: { link: string; label: string; links: { link: string; label: string }[] }[];
}

export default function Navbar({ links }: HeaderSearchProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                {/* <IconChevronDown size={12} stroke={1.5} /> */}

              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

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
    <Box>
        <Header height={56} mb={120}>
            <Container>
                <div className={classes.inner}>
                    <MantineLogo size={28} />
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Group className={classes.hiddenMobile}>
                    <Button variant="default">Log in</Button>
                    <Button>Sign up</Button>
                </Group>
                <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.burger} size="sm" />
                </div>
            </Container>
        </Header>
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
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

            <Link to={"/"} className={classes.collapsedLink} onClick={closeDrawer}>
                Home
            </Link>
            <UnstyledButton className={classes.collapsedLink} onClick={toggleLinks}>
                <Center inline>
                <Box component="span" mr={5}>
                    Navigation
                </Box>
                {/* <IconChevronDown size={16} color={theme.fn.primaryColor()} /> */}
                </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{collapsedLinks}</Collapse>

            {/* Swap out for HashLink */}
            <Link to={"/about"} className={classes.collapsedLink}>
                About
            </Link>
            <Link to={"/creators"} className={classes.collapsedLink}>
                Home
            </Link>

            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

            <Group position="center" grow pb="xl" px="md">
                <Button variant="default">Log in</Button>
                <Button>Sign up</Button>
            </Group>
            </ScrollArea>
        </Drawer>
    </Box>
    
  );
}