import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  createStyles,
  Center,
  Loader,
} from '@mantine/core';
import React, { useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, useMantineTheme } from '@mantine/core';

import earthimage from '../public/earth_background_image.png';

// card images
import poverty from '../public/poverty.png';
import youth from '../public/youth.png';
import animals from '../public/animal.png';
import religion from '../public/religion.png';
import corona from '../public/corona.png';
import gender_equality from '../public/gender_equality.png';
import justice from '../public/justice.png';
import aapi from '../public/aapi.png';
import adoption from '../public/adoption.png';
import education from '../public/education.png';
import health from '../public/health.png';
import humans from '../public/humans.png';
import research from '../public/research.png';
import ukraine from '../public/ukraine.png';
import women from '../public/women.png';
import afghanistan from '../public/afghanistan.png';
import athletics from '../public/athletics.png';
import autism from '../public/autism.png';
import black_led from '../public/black-led.png';
import buddhism from '../public/buddhism.png';
import cancer from '../public/cancer.png';
import christianity from '../public/christianity.png';
import climate from '../public/climate.png';
import culture from '../public/culture.png';
import dance from '../public/dance.png';
import disabilities from '../public/disabilities.png';
import disease from '../public/disease.png';
import environment from '../public/environment.png';
import food_security from '../public/food-security.png';
import hinduism from '../public/hinduism.png';
import housing from '../public/housing.png';
import immigrants from '../public/immigrants.png';
import indigenous from '../public/indigenous.png';
import museums from '../public/museums.png';
import music from '../public/music.png';
import oceans from '../public/oceans.png';
import refugees from '../public/refugees.png';
import science from '../public/science.png';
import seniors from '../public/seniors.png';
import space from '../public/space.png';
import veterans from '../public/veterans.png';
import voting_rights from '../public/voting-rights.png';
import wildfires from '../public/wildfires.png';
import wildlife from '../public/wildlife.png';
import { useAuth } from '../ts/authenticate';
import CharitySearch from './CharitySearch';
import { LINKS, useNavigateContext } from '../ts/navigate';

function routeToCharityByCategory(tag: string) {
  window.location.replace(`/charity?param=${tag}`);
}

function handleGetStartedClick() {
  window.location.replace(`/charitysearch`);
}

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
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
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },
  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },
  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },
  controls: {
    marginTop: 1.5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },
  control: {
    height: 42,
    fontSize: theme.fontSizes.md,
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },
    '@media (max-width: 520px)': {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .4)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important',
    },
  },
  spacer: {
    aspectRatio: '960/100',
    height: 500,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    marginTop: 50,
  },
}));

interface CardProps {
  image: string;
  title: string;
  category: string;
}

// Display cards with tags to go page that shows charities that fall under the tag
function Card({ image, title, category }: CardProps) {
  const { classes } = useStyles();
  return (
    <div id="card-selector">
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${image})` }}
        className={classes.card}
      >
        <div>
          <Text className={classes.category} size="xs">
            {category}
          </Text>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
        </div>
        <div id="explore-button">
          <Button
            onClick={() => {
              routeToCharityByCategory(category);
            }}
            variant="white"
            color="dark"
          >
            Explore
          </Button>
        </div>
      </Paper>
    </div>
  );
}

const data = [
  {
    image: `${adoption}`,
    title: 'Support Adoption and Foster Care',
    category: 'adoption',
  },
  {
    image: `${aapi}`,
    title: 'Support the AAPI Community',
    category: 'aapi-led',
  },
  {
    image: `${afghanistan}`,
    title: 'Help People Affected by the Afghanistan Crisis',
    category: 'afghanistan',
  },
  {
    image: `${animals}`,
    title: 'Support Animal Welfare',
    category: 'animals',
  },
  {
    image: `${athletics}`,
    title: 'Support Athletics and Sports Programs',
    category: 'athletics',
  },
  {
    image: `${autism}`,
    title: 'Support Autism Awareness and Research',
    category: 'autism',
  },
  {
    image: `${black_led}`,
    title: 'Support Black-led Organizations',
    category: 'black-led',
  },
  {
    image: `${buddhism}`,
    title: 'Support Buddhist Organizations',
    category: 'buddhism',
  },
  {
    image: `${cancer}`,
    title: 'Support Cancer Research and Patients',
    category: 'cancer',
  },
  {
    image: `${christianity}`,
    title: 'Support Christian Organizations',
    category: 'christianity',
  },
  {
    image: `${climate}`,
    title: 'Support Climate Change Mitigation and Adaptation',
    category: 'climate',
  },
  {
    image: `${corona}`,
    title: 'Support efforts against corona',
    category: 'corona',
  },
  {
    image: `${wildlife}`,
    title: 'Support Environmental Conservation and Protection',
    category: 'conservation',
  },
  {
    image: `${culture}`,
    title: 'Support Cultural Preservation and Awareness',
    category: 'culture',
  },
  {
    image: `${dance}`,
    title: 'Support Dance and Performing Arts',
    category: 'dance',
  },
  {
    image: `${disabilities}`,
    title: 'Support Disability Rights and Accessibility',
    category: 'disabilities',
  },
  {
    image: `${disease}`,
    title: 'Support Disease Prevention and Treatment',
    category: 'disease',
  },
  {
    image: `${education}`,
    title: 'Support Education and Schools',
    category: 'education',
  },
  {
    image: `${environment}`,
    title: 'Support Environmental Protection and Sustainability',
    category: 'environment',
  },
  {
    image: `${food_security}`,
    title: 'Support Food Security and Access',
    category: 'food security',
  },
  {
    image: `${gender_equality}`,
    title: "Support Gender Equality and Women's Rights",
    category: 'gender equality',
  },
  {
    image: `${health}`,
    title: 'Support Health and Wellness',
    category: 'health',
  },
  {
    image: `${hinduism}`,
    title: 'Support Hindu Organizations',
    category: 'hinduism',
  },
  {
    image: `${housing}`,
    title: 'Support Affordable Housing and Homelessness Prevention',
    category: 'housing',
  },
  {
    image: `${humans}`,
    title: 'Support Humanitarian Aid and Relief',
    category: 'humans',
  },
  {
    image: `${immigrants}`,
    title: 'Support Immigrant and Refugee Rights',
    category: 'immigrants',
  },
  {
    image: `${indigenous}`,
    title: 'Support Indigenous-led Organizations',
    category: 'indigenous-led',
  },
  {
    category: 'cancer research',
    image: `${cancer}`,
    title: 'Support cancer research',
  },
  {
    category: 'climate',
    image: `${climate}`,
    title: 'Fight climate change',
  },
  {
    category: 'education',
    image: `${education}`,
    title: 'Support education initiatives',
  },
  {
    category: 'healthcare',
    image: `${health}`,
    title: 'Support healthcare initiatives',
  },
  {
    category: 'hunger',
    image: `${food_security}`,
    title: 'Fight hunger and food insecurity',
  },
  {
    category: 'justice',
    image: `${justice}`,
    title: 'Fight for justice',
  },
  {
    category: 'museums',
    image: `${museums}`,
    title: 'Support museums and cultural institutions',
  },
  {
    category: 'music',
    image: `${music}`,
    title: 'Support music and the arts',
  },
  {
    category: 'oceans',
    image: `${oceans}`,
    title: 'Protect the oceans',
  },
  {
    category: 'poverty',
    image: `${poverty}`,
    title: 'Lend a helping hand to those in poverty',
  },
  {
    category: 'refugees',
    image: `${refugees}`,
    title: 'Support refugees and displaced persons',
  },
  {
    category: 'religion',
    image: `${religion}`,
    title: 'Donate to your religious institutions',
  },
  {
    category: 'research',
    image: `${research}`,
    title: 'Support scientific research',
  },
  {
    category: 'science',
    image: `${science}`,
    title: 'Support scientific education and literacy',
  },
  {
    category: 'seniors',
    image: `${seniors}`,
    title: 'Support senior citizens',
  },
  {
    category: 'space',
    image: `${space}`,
    title: 'Support space exploration',
  },
  {
    category: 'ukraine',
    image: `${ukraine}`,
    title: 'Support Ukraine',
  },
  {
    category: 'veterans',
    image: `${veterans}`,
    title: 'Support veterans and their families',
  },
  {
    category: 'voting rights',
    image: `${voting_rights}`,
    title: 'Protect voting rights',
  },
  {
    category: 'water',
    image: `${oceans}`,
    title: 'Protect the water',
  },
  {
    category: 'wildfires',
    image: `${wildfires}`,
    title: 'Support wildfire relief efforts',
  },
  {
    category: 'wildlife',
    image: `${wildlife}`,
    title: 'Protect wildlife and their habitats',
  },
  {
    category: 'women-led',
    image: `${women}`,
    title: 'Support women-led initiatives',
  },
  {
    category: 'youth',
    image: `${youth}`,
    title: 'Support youth initiatives',
  },
];

export default function Dashboard() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = data.map((item) => (
    <div id="slide">
      <Carousel.Slide key={item.title}>
        <Card {...item} />
      </Carousel.Slide>
    </div>
  ));
  const { classes } = useStyles();
  const { loading } = useAuth();
  const { updateLink } = useNavigateContext();

  useEffect(() => {
    updateLink(LINKS.DASHBOARD);
  }, []);

  return (
    <>
      {!loading && (
        <div>
          <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />
            <div className={classes.inner}>
              <Title className={classes.title}>
                Find{' '}
                <Text component="span" inherit className={classes.highlight}>
                  WhereToGive
                </Text>
              </Title>
              <Container size={640}>
                <Text size="lg" className={classes.description}>
                  Search for your favorite charities.
                </Text>
              </Container>
              <div className={classes.controls}>
                <Button
                  id="get-started-button"
                  className={classes.control}
                  variant="white"
                  size="lg"
                  onClick={handleGetStartedClick}
                >
                  Get started
                </Button>
              </div>
            </div>
          </div>

          <div id="carousel" className={classes.spacer}>
            <Carousel
              slideSize="25%"
              breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 1 }]}
              slideGap="xl"
              align="start"
              slidesToScroll={mobile ? 1 : 2}
            >
              {slides}
            </Carousel>
          </div>
        </div>
      )}
      {loading && (
        <div style={{ backgroundColor: 'white', height: '50rem' }}>
          <Center h={500}>
            <div>
              <Loader size="xl" color="teal" variant="dots" />
            </div>
          </Center>
        </div>
      )}
    </>
  );
}
