import { Text, Title, Button, createStyles, Stepper, Group } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Compass, UserCheck, MapSearch, ShieldCheck } from 'tabler-icons-react';
import Typewriter from 'typewriter-effect';
import clipart from "../public/whereToGiveClipart.svg";
import wave1 from "../public/wave1.svg";
import wave2 from "../public/wave2.svg";

type Props = {}

const useStyles = createStyles((theme, _params, getRef) => ({
    HeroSection : {
        width: '70%',
        height: '35rem',
        margin: '4rem auto',
        [theme.fn.smallerThan('lg')] : {
            width: '90%',
        },
        [theme.fn.smallerThan('md')] : {
            width: '100%',
            height : '45rem'
        }
    },
    
    HeroSectionBox: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
        margin: '3rem 3rem 0 5rem',
        [theme.fn.smallerThan('md')] : {
            display: 'flex',
            flexDirection : 'column',
            gap: '2rem',
            margin: '3rem',
        }
    },
    
    HeroSectionBoxLeft: {
        paddingRight: '6rem',
        [theme.fn.smallerThan('md')] : {
            display: 'flex',
            paddingRight : 0,
            flexDirection : 'column',
            alignItems : 'center',
            margin: 'auto',
        }
    },
    
    HeroSectionBoxRight: {
        marginLeft: 'auto',
        [theme.fn.smallerThan('md')] : {
            margin: '3rem auto',
        }
    },

    spacer: {
        aspectRatio: '960/100',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },

    spacer1 : {backgroundImage: `url(${wave1})`},

    spacer2 : {backgroundImage: `url(${wave2})`},

    infoSection : {
        backgroundColor : "#009c77",
        height : '45rem',
        color : 'white',
        paddingTop : "5rem"
        
    },

    infoBox : {
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
    },

    infoTitle : {
        fontSize : "45px",
        margin: 'auto', 
        textAlign : 'center',
        [theme.fn.smallerThan('md')] : {
            fontSize : "35px",
        }
    },

    stepSection : {
        width: '70%',
        margin : "auto",
    },

    root: {
        padding: theme.spacing.md,
        width : "100%",
        display : "flex",
        flexDirection : "column",
        marginTop : "3rem",
        gap : "1rem",
        alignItems : "center",
        color : "white"
      },
    
      separator: {
        height: 2,
        borderTop: `2px dashed ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]}`,
        borderRadius: theme.radius.xl,
        backgroundColor: 'transparent',
      },

      stepDescription : {
        color : 'rgb(246,246,246)',
      },

      content : {
        fontSize : "20px",
        textAlign : "center",
        [theme.fn.smallerThan('md')] : {
            margin : "2rem",
        }

      },
    
      separatorActive: {
        borderWidth: 0,
        backgroundColor: "white",
      },
    
      stepIcon: {
        ref: getRef('stepIcon'),
        borderColor: 'transparent',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
        borderWidth: 0,
    
        '&[data-completed]': {
          borderWidth: 0,
          backgroundColor: 'transparent',
          backgroundImage: theme.fn.linearGradient(45, theme.colors.blue[8], theme.colors.cyan[2]),
        },
      },
    
      step: {
        transition: 'transform 150ms ease',

        color : "white",
    
        '&[data-progress]': {
          transform: 'scale(1.05)',
        },
      },    

    footer : {
        backgroundColor : "#001220",
        height : '45rem',
        color : 'white',
        paddingTop : "5rem"
    }
}));

const Landing = (props: Props) => {

    const {classes, cx}  = useStyles();
    const [loggedIn, setLoggedIn] = useState(false);
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    useEffect(() => {
        // Check session storage for auth token
        
        let authToken = sessionStorage.getItem('Auth Token')
        
        if (authToken) {
            setLoggedIn(true);
            // generate user asynchronously
            setActive(2);
        }

    }, []);

    return (
            <>
                {/* Hero Section */}
                <div className={classes.HeroSection}>
                    <div className={classes.HeroSectionBox}>
                        <div className={classes.HeroSectionBoxLeft}>
                            <Title 
                                className='mt-5'
                                variant="gradient"
                    
                                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                                fw={700}
                            >
                                Know WhereToGive 
                            </Title>
                            
                            <div className='d-flex mt-2 ml-1' style={{gap:"4px"}}>
                                <Text
                                    fw={600}
                                    c="dimmed"
                                >
                                    Built for the
                                </Text>

                                <Text
                                    fw={600}
                                    c="dimmed"
                                    className='ml-3'
                                >
                                    
                                    <Typewriter
                                        options={{
                                            strings: ['Donor', 'Giver', 'Helpful', 'Generous'],
                                            autoStart: true,
                                            loop: true,
                                        }}
                                    />
                                </Text>
                            </div>
                            
                            <Button 
                                variant="gradient" 
                                gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                                className="mt-5"
                            >
                                <ChevronRight size={16} strokeWidth={2.5}/>
                                Find the perfect charity 
                                <Text td="underline" style={{marginLeft : "3px"}}> for you</Text>
                            </Button>
                            
                        </div>
                        <div className={classes.HeroSectionBoxRight}>
                            <img src={clipart} alt="Landing Clipart" />
                        </div>
                    </div>
                </div>
                
                {/* Wave1 spacer */}
                <div className={cx(classes.spacer, classes.spacer1)}></div>

                {/* InfoSection */}
                <div className={classes.infoSection}>
                   {/* InfoSection Title */}
                    <div className={classes.infoBox}>
                        <Title
                            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                            className={classes.infoTitle}
                            fw={700}
                            // color="dimmed"

                        >
                            Let us Navigate You 
                            <Compass size={45} strokeWidth={1.5} style={{marginLeft: '10px'}}></Compass>
                        </Title>
                        
                        {/* <div className={classes.stepSection}> */}
                            <Stepper iconSize={65} size={'xl'} active={active} classNames={classes} onStepClick={setActive} breakpoint="md">
                                <Stepper.Step label="First" description="Create Account" icon={<UserCheck size={31} />}>
                                Create an account / Login to Existing account
                                </Stepper.Step>
                                <Stepper.Step label="Second" description="Browse Charities" icon={<MapSearch size={31} />}>
                                Complete Survey to find charities tailored to you / Browse Charity Dashboard
                                </Stepper.Step>
                                <Stepper.Step label="Full Access" description="Track Donations" icon={<ShieldCheck size={31} />}>
                                Self Report Donations to Charities / Save Favorite Charities for Later
                                </Stepper.Step>
                            </Stepper>

                            {/* <Group position="center" mt="xl">
                                <Button variant="default" onClick={prevStep}>Back</Button>
                                <Button onClick={nextStep}>Next step</Button>
                            </Group> */}

                        {/* </div> */}

                    </div>
                    
                    
                  

                </div>

                {/* Wave2 spacer */}
                <div className={cx(classes.spacer, classes.spacer2)}></div>
                

                {/* Footer */}
                <div className={classes.footer}></div>
            </>
            
                              
    )
};

export default Landing;
