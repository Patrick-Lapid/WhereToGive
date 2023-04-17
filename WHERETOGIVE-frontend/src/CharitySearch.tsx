import {
  Avatar,
  Button,
  Center,
  Loader,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { createStyles } from '@mantine/core';
import React, { useEffect, useState, useRef } from 'react';
import { Autocomplete, Paper, Col } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import MultiSelectAutocomplete from './components/MultiSelectAutocomplete';
import { Container } from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react';
import { Carousel } from '@mantine/carousel';
import earthimage from '../public/space_background.png';
import Map, {
  GeoJSONSource,
  Layer,
  MapLayerMouseEvent,
  Source,
} from 'react-map-gl';
import { MAPBOX_ACCESS_TOKEN } from '../config.js';
import { LINKS, useNavigateContext } from '../ts/navigate';
import { geojsonData } from '../models/ChartiesGeoJSON';
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from './components/layers';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

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

  // Create a map reference
  const mapRef = useRef(null);

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [charities, setCharities] = useState<CharityCardProps[]>([]);
  const { updateLink } = useNavigateContext();

  const initializeGeocoder = () => {
    const map = mapRef.current.getMap();

    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_ACCESS_TOKEN,
      mapboxgl: mapRef.current.getMap(),
    });

    geocoder.on('result', (result) => {
      // handle the geocoder result
      console.log(result);
    });

    map.addControl(geocoder, 'top-left');
  };

  const handleClick = async (event: MapLayerMouseEvent) => {
    const map = event.target;

    const features = map.queryRenderedFeatures(event.point, {
      layers: ['clusters', 'unclustered-point'],
    });

    if (features.length) {
      const feature = features[0];

      if (feature.properties.point_count) {
        const clusterId = feature.properties.cluster_id;
        const mapboxSource = map.getSource(
          'charities'
        ) as unknown as GeoJSONSource;

        mapboxSource.getClusterLeaves(
          clusterId,
          Infinity,
          0,
          (err: any, leaves: any) => {
            if (err) {
              console.error('Error getting cluster leaves:', err);
              return;
            }

            console.log(
              'Charities in the selected cluster:',
              leaves.map((leave: { properties: any }) => leave.properties)
            );
          }
        );
      } else {
        console.log('Selected charity:', feature.properties);
      }
    }
  };

  // fetch all tags from database then use the tags to filter the charities in search
  useEffect(() => {
    updateLink(LINKS.SEARCH);
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

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        mapboxgl: mapRef.current.getMap(),
      });

      geocoder.on('result', (result) => {
        // handle the geocoder result
        console.log(result);
      });

      map.addControl(geocoder, 'top-left');
    }
  }, [mapRef]);

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
        {isLoading && (
          <div style={{ backgroundColor: 'white', height: '50rem' }}>
            <Center h={500}>
              <div>
                <Loader size="xl" color="teal" variant="dots" />
              </div>
            </Center>
          </div>
        )}
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
              ref={mapRef}
              initialViewState={{
                longitude: -100,
                latitude: 40,
                zoom: 3.5,
              }}
              style={{ width: '100%', height: 500 }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
              attributionControl={false}
              onClick={handleClick}
              onLoad={initializeGeocoder}
            >
              <Source
                id="charities"
                type="geojson"
                data={geojsonData}
                cluster={true}
                clusterMaxZoom={14}
                clusterRadius={50}
              >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                <Layer {...unclusteredPointLayer} />
              </Source>
            </Map>

            {/* <Map
              ref={mapRef}
              initialViewState={{
                longitude: -100,
                latitude: 40,
                zoom: 3.5,
              }}
              style={{ width: '100%', height: 500 }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
              attributionControl={false}
              onClick={handleClick}
            >   
            <Source
                id="charities"
                type="geojson"
                data={geojsonData}
                cluster={true}
                clusterMaxZoom={14}
                clusterRadius={50}
              >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                <Layer {...unclusteredPointLayer} />
              </Source>
            </Map> */}
          </Center>
        </div>
      </Stack>
    </div>
  );
}
