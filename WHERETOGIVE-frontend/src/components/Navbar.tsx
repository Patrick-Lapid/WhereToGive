import { createStyles, Header, Menu, Group, Center, Burger, Container, Drawer, ScrollArea, Divider, UnstyledButton, Box, Collapse, Button, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from 'tabler-icons-react';
import globe from "../../public/spinningGlobe.gif";
import React, { useState } from 'react';
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

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
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
  links: { link: string; label: string; }[];
}

export default function Navbar({ links }: HeaderSearchProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link)
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
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
    <Box>
        <Header height={56} mb={10}>
            <Container>
                <div className={classes.inner}>
                    {/* Site Header + GIF */}
                    <Group spacing={8}>
                        <Title order={3}>WhereToGive</Title>
                        <img style={{paddingTop : "1px"}} src={globe} alt="logo" width={30} />
                    </Group>
                    {/* links + user auth buttons */}
                    <Group spacing={45} className={classes.links}>
                        <Group spacing={5}>
                            {items}
                        </Group>
                        
                        <Group spacing={5}>
                            <Button className="ml-3" size='xs' variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Log in</Button>
                            <Button size='xs' variant="subtle">Sign up</Button>
                        </Group>
                        
                    </Group>
                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.burger} size="sm" />
                </div>
            </Container>
        </Header>
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
                <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                <Link to={"/"} className={classes.collapsedLink} onClick={closeDrawer}>
                    Home
                </Link>
                <UnstyledButton className={classes.collapsedLink} onClick={toggleLinks}>
                    <Center inline>
                    <Box component="span" mr={5}>
                        Navigation
                    </Box>
                    <ChevronDown className='pt-1' size={16} color={theme.fn.primaryColor()} />
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
                    <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Log in</Button>
                    <Button variant="subtle">Sign up</Button>
                </Group>
            </ScrollArea>
        </Drawer>
    </Box>
    
  );
}