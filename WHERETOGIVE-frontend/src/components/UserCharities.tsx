import {
  Card,
  Image,
  Group,
  Text,
  Button,
  Badge,
  Paper,
  Avatar,
  ActionIcon,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Star, StarOff } from 'tabler-icons-react';
import { useAuth } from '../../ts/authenticate';

type Props = {};

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

const UserCharities = (props: Props) => {

    const {tagColors, getFavoriteCharities, toggleCharityFavorite} = useAuth();
    const [data, setData] = useState(null);

    async function getFavorites() {
        const favorites = await getFavoriteCharities();

        if(favorites && favorites.length > 0){
            setData(favorites);
        } else {
            setData(null);
        }

    }

    useEffect(() => {
    
        getFavorites();
        
    });

    const slides = data
    ? data.map((charity : any) => (
        <Paper
              key={charity.ID}
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
              <ActionIcon variant="light" color="yellow" onClick={async () => {await toggleCharityFavorite(charity.ID); await getFavorites();}}>
                <Star color="gold" size="1.125rem" />
              </ActionIcon>
              <Avatar
                src={`${charity.LogoURL}`}
                size={50}
                radius={50}
                mx="auto"
              />
              <Text color="black" align="center" size="lg" weight={500} mt="md">
                {charity.Name}
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
                  {charity.DescriptionShort}
                </Text>
              </div>

              <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  overflowY: 'auto',
                  gap: "5px"
                }}>
                {charity.Tags.map((tag : any, index : number) => {
                    if(index <= 5)
                        return(<Badge color={tagColors[tag]}>{tag}</Badge>);
                })}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  data-cy="rating-info-button"
                  onClick={() => handleViewRatingClick(charity.EIN)}
                  variant="default"
                  fullWidth
                  className='mt-2'
                >
                  View Rating Information
                </Button>
                <Button
                  onClick={() => handleMoreClick(charity.WebsiteURL)}
                  variant="default"
                  fullWidth
                  className='mt-1'
                >
                  Visit Website
                </Button>
              </div>
        </Paper>
      ))
    : null;

    function handleViewRatingClick(EIN: string) {
        window.open(`https://www.charitynavigator.org/ein/${EIN}`);
      }
      
      function handleMoreClick(websiteURL: string) {
        window.open(`${websiteURL}`);
      }

  return (
    <div className="d-flex" style={{ width: '95%', margin: '1rem auto 0' }}>
      {slides ? slides : <Text className='mt-3' c="dimmed" ta={"center"}>Navigate to Charity Dashboard or Charity Search to Favorite Charities</Text> }
    </div>
  );
};

export default UserCharities;
