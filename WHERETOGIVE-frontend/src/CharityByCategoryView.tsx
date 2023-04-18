import { Carousel } from '@mantine/carousel';
import {
  Avatar,
  Button,
  Text,
  Paper,
  useMantineTheme,
  Title,
  ActionIcon,
  Badge,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { useNavigateContext } from '../ts/navigate';
import { Star } from 'tabler-icons-react';
import { useAuth } from '../ts/authenticate';

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
            {Tags.map((tag, index) => {
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

export default function CharityByCategory() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get('param');
  const [data, setData] = useState<CharityCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { updateLink } = useNavigateContext();

  useEffect(() => {
    updateLink(null);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/charities/?tag=${paramValue}`
        );
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

  const slides = data
    ? data.map((item: CharityCardProps) => (
        <Carousel.Slide key={item.ID}>
          <CharityTile key={item.ID} {...item} />
        </Carousel.Slide>
      ))
    : null;

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className="container pt-4">
        {isLoading && <div>Loading...</div>}
        {data.length > 0 && (
          <>
            <div className="mb-2">
              <Title
                className="d-inline"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                tt="capitalize"
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                fw={700}
              >
                {paramValue}
              </Title>
              <Title
                className="d-inline"
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                fw={700}
              >
                {' '}
                Charities
              </Title>
            </div>

            <Carousel
              slideSize="33.33%"
              breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 1 }]}
              slideGap="xl"
              align="start"
              slidesToScroll={mobile ? 1 : 2}
            >
              {slides}
            </Carousel>
          </>
        )}
      </div>
    </div>
  );
}
