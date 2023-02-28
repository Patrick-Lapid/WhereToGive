import { Carousel } from '@mantine/carousel';
import { Avatar, createStyles,Button, Text, Paper, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  container: {
    height: 700,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  title: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },

    card: {
        height: '400px', backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        maxHeight: '150px', overflowY: 'auto',
        borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    scroll:{
        width:'100%',
        maxHeight:'200px',
        overflowY: 'auto',
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));


interface CharityCardProps {
    DescriptionLong:string;
    DescriptionShort: string;
    ID: number;
    Location: string;
    LogoURL: string;
    Name:string;
    Tags:any[];
    WebsiteURL:string;
}

  function CharityTile({DescriptionLong, DescriptionShort, ID, Location, LogoURL, Name, Tags, WebsiteURL}: CharityCardProps) {
    return (
      <Paper
        radius="md"
        withBorder
        p="lg"
        sx={(theme) => ({
          height:"350px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        })}
      >
        <Avatar src={`${LogoURL}`} size={50} radius={50} mx="auto" />
        <Text color="black" align="center" size="lg" weight={500} mt="md">
          {Name}
        </Text>
        <div style={{ paddingTop:10, alignItems:"center", justifyContent:"center", overflowY:"auto", height:"140px"}}>
          <Text align="center" color="dimmed" size="sm">
            {DescriptionShort}
          </Text>
        </div>
        <Button onClick={()=>handleMoreClick(WebsiteURL)} variant="default" fullWidth mt="md" style={{flex:"1", marginBottom:"auto"}}>
          More
        </Button>
      </Paper>
    );
  }


function handleMoreClick(websiteURL: string){
  window.location.replace(`${websiteURL}`);
}

export default function CharityByCategory() {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const { classes } = useStyles();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramValue = urlParams.get('param');

    const [data, setData] = useState<CharityCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:8000/api/charities/?tag=${paramValue}`);
            const jsonData = await response.json();
            setData(jsonData);
            setIsLoading(false);
          } catch (error) {
            setError(error);
            setIsLoading(false);
          }
        };
        fetchData();
      }, []);

      const slides = data ? data.map((item: CharityCardProps) => (
        <Carousel.Slide key={item.ID}>
          <CharityTile key={item.ID} {...item} />
        </Carousel.Slide>
      )) : null;

    return (
        <div>
          { isLoading && <div>Loading...</div> }
          {data.length > 0 && (
            <Carousel
              slideSize="33.33%"
              breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 1 }]}
              slideGap="xl"
              align="start"
              slidesToScroll={mobile ? 1 : 2}
            >
              {slides}
            </Carousel>
          )}
        </div>
    );
}