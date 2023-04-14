import { Center, createStyles,  Loader, Navbar  } from '@mantine/core';
import React, {  useEffect, useState } from 'react';
import { useAuth } from '../ts/authenticate';
import {
    LayoutList,
    Settings,
    Logout,
    SwitchHorizontal,
    Selector,
    Home,
    DeviceDesktopAnalytics
  } from 'tabler-icons-react';
import { UserButton } from './components/UserButton';
import UserAnalytics from './components/UserAnalytics';
import UserCharities from './components/UserCharities';
import UserSettings from './components/UserSettings';
import { LINKS, useNavigateContext } from '../ts/navigate';


interface userProfile {
    name : string;
    email: string;
    profilePicture: string;
}

  const useStyles = createStyles((theme) => ({
    section: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        marginBottom: theme.spacing.md,
    
        '&:not(:last-of-type)': {
          borderBottom: ` 1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
        },
      },
    
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: `calc(${theme.spacing.md} * 1.5)`,
      borderBottom: ` 1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
  
    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: ` 1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
  
    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      padding: "1rem",
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  
        
      },
    },
  
    linkIcon: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },
  
    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        
      },
    },
    componentSection : {
        height : "100%",
        width : "100%",
        backgroundColor : "rgb(246,246,246)"
        // [theme.fn.smallerThan('lg')] : {
        //     width: '90%',
        // },
        // [theme.fn.smallerThan('md')] : {
        //     width: '100%',
        //     height : '45rem'
        // }
    }
  }));
  

  

  

const UserDashboard = () => {
    
    const {currentUser, loading, logout, switchAccount} = useAuth();
    const { classes, cx } = useStyles();
    const [profile, setProfile] = useState<userProfile>();
    const {activeProfileSection, updateActiveProfileSection} = useNavigateContext();

    const tabs = [
    
        { link: '', label: LINKS.SAVED_CHARITIES , icon: LayoutList },
        { link: '', label: LINKS.USER_DASHBOARD, icon: DeviceDesktopAnalytics },
        { link: '', label: LINKS.SETTINGS, icon: Settings },
      
    ];

    const links = tabs.map((item) => (
        <a
          className={cx(classes.link, { [classes.linkActive]: item.label === activeProfileSection })}
          href={item.link}
          key={item.label}
          onClick={(event) => {
            event.preventDefault();
            updateActiveProfileSection(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} />
          {item.label}
        </a>
    ));

    useEffect(() => {
        console.log(activeProfileSection);
    }, [activeProfileSection]);

    return (
        <>
            {!loading && 
                <div style={{height:"100%", display:"flex"}}>
                    <Navbar width={{ sm: 300 }} p="md">

                    <Navbar.Section className={classes.section}>
                        <UserButton
                        image={currentUser.photoURL}
                        name={currentUser.displayName}
                        email={currentUser.email}
                        icon={<Selector size="0.9rem" stroke="1.5" />}
                        />
                    </Navbar.Section>

                        <Navbar.Section grow>
                            {links}
                        </Navbar.Section>

                        <Navbar.Section className={classes.footer}>
                            <div style={{cursor : "pointer"}} className={classes.link} onClick={() => window.location.replace('/')}>
                            <Home className={classes.linkIcon}  />
                            <span>Home</span>
                            </div>

                            <div style={{cursor : "pointer"}} className={classes.link} onClick={() => switchAccount()}>
                            <SwitchHorizontal className={classes.linkIcon}  />
                            <span>Change account</span>
                            </div>

                            <div style={{cursor : "pointer"}} className={classes.link} onClick={() => logout()}>
                            <Logout className={classes.linkIcon} />
                            <span>Logout</span>
                            </div>
                        </Navbar.Section>
                    </Navbar>
                    

                    <div className={classes.componentSection}>
                        {activeProfileSection === LINKS.SAVED_CHARITIES && <p><UserCharities /></p>}
                        {activeProfileSection === LINKS.USER_DASHBOARD && <UserAnalytics />}
                        {activeProfileSection === LINKS.SETTINGS && <UserSettings bubbleProfileState={setProfile} />}
                    </div>
                    
                </div>
            }

            {loading && 
                <div style={{backgroundColor : "white", height : "50rem"}}>
                    <Center h={500}>
                        <div>
                            <Loader size="xl" color="teal" variant="dots" />
                        </div>
                    </Center>
                </div>
            }
        </>
    );
}

export default UserDashboard;
