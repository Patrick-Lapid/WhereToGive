import {
    ActionIcon,
  Avatar,
  Button,
  Center,
  Loader,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { createStyles, Badge } from '@mantine/core';
import React, { useEffect, useState, useRef } from 'react';
import { Autocomplete, Paper, Col } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import MultiSelectAutocomplete from './components/MultiSelectAutocomplete';
import { Container, Tooltip } from '@mantine/core';
import { ChevronRight, Search, Star } from 'tabler-icons-react';
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
import { useAuth } from '../ts/authenticate';
import { notifications } from '@mantine/notifications';

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
  const {tagColors} = useAuth();
  return (
    <Paper
        key={ID}
        radius="md"
        withBorder
        shadow="sm"
        p="lg"
        style={{
        height: '420px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        }}
    >
        {/* <ActionIcon variant="light" color="yellow" onClick={() => {}}>
        <Star color="gold" size="1.125rem" />
        </ActionIcon> */}
        <ActionIcon onClick={() => {}}>
        <Star color="grey" size="1.125rem" />
        </ActionIcon>
        <Avatar
        src={`${LogoURL}`}
        size={50}
        radius={50}
        mx="auto"
        />
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

        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            overflowY: 'auto',
            gap: "5px"
        }}>
        {Tags && Tags.length > 0 && Tags.map((tag, index) => {
            if(index <= 5)
                return(<Badge color={tagColors[tag]}>{tag}</Badge>);
        })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button
            data-cy="rating-info-button"
            onClick={() => handleViewRatingClick(EIN)}
            variant="default"
            fullWidth
            className='mt-2'
        >
            View Rating Information
        </Button>
        <Button
            onClick={() => handleMoreClick(WebsiteURL)}
            variant="default"
            fullWidth
            className='mt-2'
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

function mapCharityPropertiesToCardProps(properties: any): CharityCardProps {
  const { id, charityName, descriptionShort, logoURL, websiteURL, ein, tags, ...rest } =
    properties;

  // Map the properties to match the CharityCardProps interface
  return {
    DescriptionLong: '', // Add appropriate value if available in the data
    DescriptionShort: descriptionShort,
    ID: id,
    Location: '', // Add appropriate value if available in the data
    LogoURL: logoURL,
    Name: charityName,
    Tags: tags, // Add appropriate value if available in the data
    WebsiteURL: websiteURL,
    EIN: ein, // Add appropriate value if available in the data
    ...rest,
  };
}

type CharitySearchProps = {};

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
        // cluster selected
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

            let charityCardPropsArray = leaves.map(
              (leave: { properties: any }) => {
                const {
                  id,
                  charityName,
                  descriptionShort,
                  logoURL,
                  websiteURL,
                  tags,
                  ein,
                  ...rest
                } = leave.properties;

                // Map the properties to match the CharityCardProps interface
                return {
                  DescriptionLong: '', // Add appropriate value if available in the data
                  DescriptionShort: descriptionShort,
                  ID: id,
                  Location: '', // Add appropriate value if available in the data
                  LogoURL: logoURL,
                  Name: charityName,
                  Tags: tags, // Add appropriate value if available in the data
                  WebsiteURL: websiteURL,
                  EIN: ein, // Add appropriate value if available in the data
                  ...rest,
                };
              }
            );
            setCharities(charityCardPropsArray);
            notifications.show({
                title: 'Updated!',
                color:"green",
                icon: <Search size="1rem" color='white' />,
                message: `Showing ${leaves.length} results`,
            });
    
          }
        );
      } else {
        // single charity selected

        const singleCharity = mapCharityPropertiesToCardProps(
          feature.properties
        );
        setCharities([singleCharity]);
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
            gradient={{ from: 'white', to: 'cyan', deg: 45 }}
            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
            fw={700}
          >
            Search for Charities
          </Title>
        </Center>
        <Center>
          <Title
            size="sm"
            color='white'
            // variant="gradient"
            // gradient={{ from: 'cyan', to: 'indigo', deg: 45 }}
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
            gradient={{ from: 'rgb(220,220,220)', to: 'cyan', deg: 45 }}
            color='black'
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
            <div className="mx-4 mt-1">
                <Carousel
                    slideSize="33.33%"
                    breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 1 }]}
                    slideGap="xl"
                    align="start"
                    slidesToScroll={mobile ? 1 : 2}
                >
                    {slides}
                </Carousel>
            </div>
          
        )}

        <Center>
          <Tooltip label="Tips: Autocomplete location search will bring map into focus on target location. Selecting a cluster will display the corresponding charity tiles.">
            <Title
              className="mt-5"
              color='white'
              sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
              fw={700}
            >
              Location Search
            </Title>
          </Tooltip>
        </Center>

        <div data-cy="map">
          {/* <Center> */}
            <Map
              ref={mapRef}
              initialViewState={{
                longitude: -100,
                latitude: 40,
                zoom: 3.5,
              }}
              style={{ width: '100%', height: 700 }}
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
          {/* </Center> */}
        </div>
      </Stack>
    </div>
  );
}
