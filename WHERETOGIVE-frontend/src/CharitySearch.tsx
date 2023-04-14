import {
  Avatar,
  Button,
  Center,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { createStyles } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Autocomplete, Paper, Col } from '@mantine/core';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';
import MultiSelectAutocomplete from './components/MultiSelectAutocomplete';
import { Container } from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react';
import { Carousel } from '@mantine/carousel';
import earthimage from '../public/space_background.png';
import Map from 'react-map-gl';
import { MAPBOX_ACCESS_TOKEN } from '../config.js';
import { LINKS, useNavigateContext } from '../ts/navigate';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 180,
    paddingBottom: 130,
    backgroundImage: `url(${earthimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (max-width: 520px)': {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    margin: 'auto',
  },
}));

interface CharityCardProps {
  DescriptionLong: string;
  DescriptionShort: string;
  ID: number;
  Location: string;
  LogoURL: string;
  Name: string;
  Tags: any[];
  WebsiteURL: string;
  EIN: string;
}

function CharityTile({
  DescriptionLong,
  DescriptionShort,
  ID,
  Location,
  LogoURL,
  Name,
  Tags,
  WebsiteURL,
  EIN,
}: CharityCardProps) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Avatar src={`${LogoURL}`} size={50} radius={50} mx="auto" />
      <Text color="black" align="center" size="lg" weight={500} mt="md">
        {Name}
      </Text>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflowY: 'auto',
        }}
      >
        <Text align="center" color="dimmed" size="sm">
          {DescriptionShort}
        </Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          data-cy="rating-info-button"
          onClick={() => handleViewRatingClick(EIN)}
          variant="default"
          fullWidth
          mt="md"
        >
          View Rating Information
        </Button>
        <Button
          onClick={() => handleMoreClick(WebsiteURL)}
          variant="default"
          fullWidth
          mt="md"
        >
          Visit Website
        </Button>
      </div>
    </Paper>
  );
}
function handleViewRatingClick(EIN: string) {
  window.location.replace(`https://www.charitynavigator.org/ein/${EIN}`);
}

function handleMoreClick(websiteURL: string) {
  window.location.replace(`${websiteURL}`);
}

type CharitySearchProps = {};

interface Charity {
  id: number;
  name: string;
  description: string;
  tags: string; // Add other properties as needed
}

export default function CharitySearch({}: CharitySearchProps) {
  const { classes } = useStyles();

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [charities, setCharities] = useState<CharityCardProps[]>([]);
  const { updateLink } = useNavigateContext();


  // fetch all tags from database then use the tags to filter the charities in search
  useEffect(() => {
    updateLink(LINKS.SEARCH)
    const fetchTags = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/tags` // input array of tags
        );
        const tags = await response.json();
        setTags(tags);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchTags();
  }, []);

  async function getCharities() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/charities/?tag=${selectedTags
          .map((tag: any) => tag.value)
          .join(',')}` // input array of tags
      );
      const jsonData = await response.json();
      setCharities(jsonData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  const slides = charities
    ? charities.map((item: CharityCardProps) => (
        <Carousel.Slide key={item.ID}>
          <CharityTile key={item.ID} {...item} />
        </Carousel.Slide>
      ))
    : null;

  return (
    <div className={classes.wrapper}>
      <Stack justify-content="center" spacing="md">
        <Center>
          <Title
            className="mt-5"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
            fw={700}
          >
            Search for Charities
          </Title>
        </Center>
        <Center>
          <Title
            size="sm"
            variant="gradient"
            gradient={{ from: 'cyan', to: 'indigo', deg: 45 }}
            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
            fw={400}
          >
            Select Tags
          </Title>
        </Center>
        <Center>
          <Container style={{ width: '75%', height: '100%' }}>
            <div data-cy="multi-select-autocomplete">
              <MultiSelectAutocomplete
                tags={tags}
                setSelectedTags={setSelectedTags}
              />
            </div>
          </Container>
        </Center>

        <Center>
          <Button
            onClick={getCharities}
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          >
            <ChevronRight size={16} strokeWidth={2.5} />
            Find the perfect charities
            <Text td="underline" style={{ marginLeft: '3px' }}>
              {' '}
              for you
            </Text>
          </Button>
        </Center>
        {isLoading && <div>Loading...</div>}
        {charities.length > 0 && (
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
        <Center>
          <Title
            size="sm"
            variant="gradient"
            gradient={{ from: 'cyan', to: 'indigo', deg: 45 }}
            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
            fw={400}
          >
            Charity Location Search
          </Title>
        </Center>
        <div data-cy="map">
        <Center>
            <Map
              initialViewState={{
                longitude: -100,
                latitude: 40,
                zoom: 3.5,
              }}
              style={{ width: '100%', height: 500 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
              attributionControl={false}
            />  
        </Center>
        </div>
      </Stack>
    </div>
  );
}
