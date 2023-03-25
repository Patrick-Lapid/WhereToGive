import {
  Text,
  Title,
  Button,
  createStyles,
  Stepper,
  Group,
  Card,
  Badge,
  Divider,
  Image,
  Loader,
  Center,
  Container,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import {
  ChevronRight,
  Compass,
  UserCheck,
  MapSearch,
  ShieldCheck,
  ArrowRight,
  Bolt,
} from 'tabler-icons-react';
import Typewriter from 'typewriter-effect';
import clipart from '../public/whereToGiveClipart.svg';
import noProfilePicture from '../public/noProfilePicture.png';
import chartClipart from '../public/charts2.jpg';
import givingClipart from '../public/giving.png';
import wave1 from '../public/wave1.svg';
import wave2 from '../public/wave2.svg';
import { Link } from 'react-router-dom';
import DeveloperCard from './components/Card';
import { useAuth } from '../ts/authenticate';

type Props = {};

const useStyles = createStyles((theme, _params, getRef) => ({
  HeroSection: {
    width: '70%',
    height: '35rem',
    margin: '4rem auto',
    [theme.fn.smallerThan('lg')]: {
      width: '90%',
    },
    [theme.fn.smallerThan('md')]: {
      width: '100%',
      height: '45rem',
    },
  },

  HeroSectionBox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
    margin: '3rem 3rem 0 5rem',
    [theme.fn.smallerThan('md')]: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      margin: '3rem',
    },
  },

  HeroSectionBoxLeft: {
    paddingRight: '6rem',
    [theme.fn.smallerThan('md')]: {
      display: 'flex',
      paddingRight: 0,
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto',
    },
  },

  HeroSectionBoxRight: {
    marginLeft: 'auto',
    [theme.fn.smallerThan('md')]: {
      margin: '3rem auto',
    },
  },

  spacer: {
    aspectRatio: '960/100',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },

  spacer1: { backgroundImage: `url(${wave1})` },

  spacer2: { backgroundImage: `url(${wave2})` },

  infoSection: {
    backgroundColor: '#009c77',
    height: '55rem',
    color: 'white',
    paddingTop: '5rem',
    [theme.fn.smallerThan('md')]: {
      height: '85rem',
    },
    [theme.fn.smallerThan('sm')]: {
      height: '95rem',
    },
  },

  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  infoTitle: {
    fontSize: '45px',
    margin: 'auto',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: {
      fontSize: '35px',
    },
  },

  stepSection: {
    margin: 'auto',
  },

  root: {
    padding: theme.spacing.md,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '3rem',
    gap: '1rem',
    alignItems: 'center',
    color: 'white',
  },

  separator: {
    height: 2,
    borderTop: `2px dashed ${
      theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]
    }`,
    borderRadius: theme.radius.xl,
    backgroundColor: 'transparent',
  },

  stepDescription: {
    color: 'rgb(246,246,246)',
  },

  content: {
    fontSize: '20px',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: {
      margin: '2rem',
    },
  },

  separatorActive: {
    borderWidth: 0,
    backgroundColor: 'white',
  },

  stepIcon: {
    ref: getRef('stepIcon'),
    borderColor: 'transparent',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
    borderWidth: 0,

    '&[data-completed]': {
      borderWidth: 0,
      backgroundColor: 'transparent',
      backgroundImage: theme.fn.linearGradient(
        45,
        theme.colors.teal[7],
        theme.colors.cyan[2]
      ),
    },
  },

  step: {
    transition: 'transform 150ms ease',

    color: 'white',

    '&[data-progress]': {
      transform: 'scale(1.05)',
    },
  },

  infoNav: {
    width: '65%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: '2em',
    margin: '3em auto',
    [theme.fn.smallerThan('md')]: {
      width: '80%',
      flexDirection: 'column',
      margin: 'auto',
      gap: '1em',
    },
  },

  footerTitle: {
    fontSize: '45px',
    textAlign: 'center',
    [theme.fn.smallerThan('md')]: {
      fontSize: '35px',
    },
  },

  footer: {
    backgroundColor: '#001220',
    height: '55rem',
    color: 'white',
    paddingTop: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.fn.smallerThan(1700)]: {
      height: '90rem',
    },
    [theme.fn.smallerThan(850)]: {
      height: '165rem',
    },
  },
  developerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    columnGap: '1rem',
    placeItems: 'center',
    [theme.fn.smallerThan(1700)]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.fn.smallerThan(1275)]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.fn.smallerThan(850)]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  responsiveGridDeveloperCard: {
    gridArea: 'auto',
    [theme.fn.smallerThan(1700)]: {
      gridArea: '2 / 2 / 3 / 3',
    },
    [theme.fn.smallerThan(850)]: {
      gridArea: ' 4 / 1 / 5 / 2',
    },
  },
  links: {
    color: 'inherit' /* blue colors for links too */,
    textDecoration: 'inherit' /* no underline */,
  },
}));

const Landing = (props: Props) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(0);
  const { loading } = useAuth();

  return (
    <>
      {!loading && (
        <div>
          {/* Hero Section */}
          <div className={classes.HeroSection}>
            <div className={classes.HeroSectionBox}>
              <div className={classes.HeroSectionBoxLeft}>
                <Title
                  className="mt-5"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                  fw={700}
                >
                  Know WhereToGive
                </Title>

                <div className="d-flex mt-2 ml-1" style={{ gap: '4px' }}>
                  <Text fw={600} c="dimmed">
                    Built for the
                  </Text>

                  <Text fw={600} c="dimmed" className="ml-3">
                    <Typewriter
                      options={{
                        strings: [
                          'Generous',
                          'Compassionate',
                          'Helpful',
                          'World Changer.',
                        ],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Text>
                </div>

                <Link className={classes.links} to={'/dashboard'}>
                  <Button
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                    className="mt-5"
                  >
                    <ChevronRight size={16} strokeWidth={2.5} />
                    Find the perfect charity for you
                    <Text td="underline" style={{ marginLeft: '3px' }}>
                      {' '}
                      for you
                    </Text>
                  </Button>
                </Link>
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
                <Compass
                  size={45}
                  strokeWidth={1.5}
                  style={{ marginLeft: '10px' }}
                ></Compass>
              </Title>

              <Stepper
                iconSize={65}
                size={'xl'}
                active={active}
                classNames={classes}
                onStepClick={setActive}
                breakpoint="md"
              >
                <Stepper.Step
                  label="Register"
                  description="Create Account"
                  icon={<UserCheck size={31} />}
                >
                  Create an account / Login to Existing account
                </Stepper.Step>
                <Stepper.Step
                  label="Browse"
                  description="Browse Charities"
                  icon={<MapSearch size={31} />}
                >
                  Complete Survey to Find NonProfits Tailored to You / Browse
                  all charities
                </Stepper.Step>
                <Stepper.Step
                  label="Full Access"
                  description="Track Donations"
                  icon={<ShieldCheck size={31} />}
                >
                  Self Report Donations to Charities / Save Favorite Charities
                  for Later
                </Stepper.Step>
              </Stepper>

              <div className={classes.infoNav}>
                <Card shadow="sm" p="lg" radius="md">
                  <Card.Section>
                    <Link
                      className={classes.links}
                      style={{ cursor: 'pointer' }}
                      to={'/dashboard'}
                    >
                      <Image src={givingClipart} height={160} alt="giving" />
                    </Link>
                  </Card.Section>

                  <Group position="center" mt="md" mb="xs">
                    <Text weight={500}>Explore NonProfits</Text>
                  </Group>

                  <Text size="sm" color="dimmed">
                    Ready to Give? Complete a quick survey and we will help find
                    nonProfits that align with your interests. You will also be
                    able to browse our selection of charities to gift.
                  </Text>

                  <Link className={classes.links} to={'/dashboard'}>
                    <Button
                      variant="gradient"
                      gradient={{ from: 'teal', to: 'violet', deg: 20 }}
                      fullWidth
                      mt="md"
                      radius="md"
                    >
                      Browse Charities
                      <ArrowRight
                        style={{ marginLeft: '4px' }}
                        size={18}
                        strokeWidth={2.5}
                      />
                    </Button>
                  </Link>
                </Card>

                <Divider orientation="vertical" />

                <Card shadow="lg" p="lg" radius="md">
                  <Card.Section>
                    <Link
                      className={classes.links}
                      style={{ cursor: 'pointer' }}
                      to={'/dashboard'}
                    >
                      <Image src={chartClipart} height={160} alt="analytics" />
                    </Link>
                  </Card.Section>

                  <Group position="center" mt="md" mb="xs">
                    <Text weight={500}>User Dashboard</Text>
                  </Group>

                  <Text size="sm" color="dimmed">
                    Made a Donation? Let us track it by using the Self-Reporting
                    feature. You will be able to monitor your giving and even
                    set up a recurring payment to any charity listed on our
                    site. Your favorite charities will also be listed here.
                  </Text>

                  <Link className={classes.links} to={'/dashboard'}>
                    <Button
                      variant="gradient"
                      gradient={{ from: 'teal', to: 'violet', deg: 20 }}
                      fullWidth
                      mt="md"
                      radius="md"
                    >
                      Track Donations
                      <ArrowRight
                        style={{ marginLeft: '4px' }}
                        size={18}
                        strokeWidth={2.5}
                      />
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </div>

          {/* Wave2 spacer */}
          <div className={cx(classes.spacer, classes.spacer2)}></div>

          {/* Footer */}
          <div className={classes.footer}>
            <Title ta="center" className={classes.footerTitle}>
              Meet The Developers{' '}
              <Bolt
                size={45}
                strokeWidth={2}
                style={{ paddingBottom: '2px' }}
              />
            </Title>

            <div className={classes.developerGrid}>
              <DeveloperCard
                name="Patrick Lapid"
                role="Frontend Developer"
                image={noProfilePicture}
                info="Developed responsive landing page, user dashboard, and navigation bar. Oversaw Front-end design choices."
                url="https://github.com/Patrick-Lapid"
              />
              <DeveloperCard
                name="Ai-Linh Nguyen"
                role="Frontend Developer"
                image={noProfilePicture}
                info=""
                url=""
              />
              <DeveloperCard
                name="Deep Patel"
                role="Backend Developer"
                image={noProfilePicture}
                info=""
                url=""
              />
              <div className={classes.responsiveGridDeveloperCard}>
                <DeveloperCard
                  name="Micaiah Kennedy"
                  role="Backend Developer"
                  image={noProfilePicture}
                  info=""
                  url=""
                />
              </div>
            </div>
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
};

export default Landing;
