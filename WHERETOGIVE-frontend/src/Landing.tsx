import { Text, Title, Button, createStyles } from '@mantine/core';
import React from 'react';
import { ChevronRight } from 'tabler-icons-react';
import Typewriter from 'typewriter-effect';
import clipart from "../public/whereToGiveClipart.svg";

type Props = {}

const useStyles = createStyles((theme) => ({
    HeroSection : {
        width: '60%',
        height: '40rem',
        margin: '4rem auto',
        [theme.fn.smallerThan('lg')] : {
            width: '90%',
        },
        [theme.fn.smallerThan('md')] : {
            width: '100%',
            height : '50rem'
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
      }
}));

const Landing = (props: Props) => {

    const {classes}  = useStyles();

    return (

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
                                    
    )
};

export default Landing;