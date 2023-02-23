import { Text, Title, Button, createStyles } from '@mantine/core';
import React from 'react';
import { ChevronRight, Compass } from 'tabler-icons-react';
import Typewriter from 'typewriter-effect';
import clipart from "../public/whereToGiveClipart.svg";
import wave1 from "../public/wave1.svg";
import wave2 from "../public/wave2.svg";

type Props = {}

const useStyles = createStyles((theme) => ({
    HeroSection : {
        width: '70%',
        height: '25rem',
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

    infoTitle : {
        fontSize : "45px",
        margin: 'auto', 
        textAlign : 'center'
    },

    infoBox : {
        display : 'flex',
        alignItems : 'center',
        
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
                    <Title
                        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                        className={classes.infoTitle}
                        fw={700}
                        // color="dimmed"

                    >
                        Let us Navigate You 
                        <Compass size={45} strokeWidth={1.5} style={{marginLeft: '10px'}}></Compass>
                    </Title>
                    
                    <div className={classes.infoBox}>

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