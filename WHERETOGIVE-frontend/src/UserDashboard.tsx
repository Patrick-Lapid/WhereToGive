import { Center, Code, createStyles, Group, Loader, Navbar, Text  } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../ts/authenticate';
import {
    BellRinging,
    Fingerprint,
    Key,
    Settings,
    TwoFA,
    DatabaseImport,
    Receipt2,
    Logout,
    SwitchHorizontal,
    Selector
  } from 'tabler-icons-react';
import { UserButton } from './components/UserButton';
import UserAnalytics from './components/UserAnalytics';
  
enum UserTabs {
    "UserCharities" = "Saved Charities",
    "Analytics" = "Analytics",
    "Settings" = "Account Settings",
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
  

  const tabs = [
    
      { link: '', label: UserTabs.UserCharities , icon: BellRinging },
      { link: '', label: UserTabs.Analytics, icon: Receipt2 },
      { link: '', label: UserTabs.Settings, icon: Settings },
    
  ];
  

const UserDashboard = () => {
    
    const {currentUser, loading, logout} = useAuth();
    const { classes, cx } = useStyles();
    const [active, setActive] = useState<UserTabs>(UserTabs.UserCharities);

    const links = tabs.map((item) => (
        <a
          className={cx(classes.link, { [classes.linkActive]: item.label === active })}
          href={item.link}
          key={item.label}
          onClick={(event) => {
            event.preventDefault();
            setActive(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} />
          {item.label}
        </a>
      ));
    

    useEffect(() => {
        console.log(currentUser);
    }, []);

    return (
        <>
        {!loading && 
        <div style={{height:"100%", display:"flex"}}>
            <Navbar width={{ sm: 300 }} p="md">

            <Navbar.Section className={classes.section}>
                <UserButton
                image="https://i.imgur.com/fGxgcDF.png"
                name={currentUser ? currentUser.displayName : "Default Name"}
                email="Potential Donor"
                icon={<Selector size="0.9rem" stroke="1.5" />}
                />
            </Navbar.Section>

                <Navbar.Section grow>
                    {links}
                </Navbar.Section>

                <Navbar.Section className={classes.footer}>
                    <div className={classes.link} onClick={() => logout()}>
                    <SwitchHorizontal className={classes.linkIcon}  />
                    <span>Change account</span>
                    </div>

                    <div className={classes.link} onClick={() => logout()}>
                    <Logout className={classes.linkIcon} />
                    <span>Logout</span>
                    </div>
                </Navbar.Section>
            </Navbar>
            

            <div className={classes.componentSection}>
                {active === UserTabs.UserCharities && <UserAnalytics />}
                {active === UserTabs.Analytics && <p>{UserTabs.Analytics}</p>}
                {active === UserTabs.Settings && <p>{UserTabs.Settings}</p>}
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
