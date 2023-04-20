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
import { Search, ShoppingCart, Star, StarOff } from 'tabler-icons-react';
import { useAuth } from '../../ts/authenticate';
import { notifications } from '@mantine/notifications';

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

    const {tagColors, getFavoriteCharities, toggleCharityFavorite, favoriteCharityCards} = useAuth();
    const [data, setData] = useState(null);

    async function handleCharityToggle(ID : number) {
        const response = await toggleCharityFavorite(ID); // returns 'added' or 'removed'
        await getFavoriteCharities(); // repulls all user favorites

        notifications.show({
            title: 'Updated!',
            message: `Your Charity was  ${response.status === "removed" ? "Unfavorited" : "Favorited"}`,
            color: response.status === "removed" ? "gray" : "yellow",
            icon: <Star color="white" />,
        });
        
    }

    useEffect(() => {
        getFavoriteCharities();
        console.log("COMPONENT CARDS", favoriteCharityCards);
    }, []);

    useEffect(() => {
        console.log("HIT");
        setData(favoriteCharityCards);
    }, [favoriteCharityCards]);

    const slides = data
    ? data.map((charity : any) => (
        <Paper
              key={charity.ID}
              radius="md"
              withBorder
              shadow="lg"
              p="lg"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <ActionIcon variant="light" color="yellow" onClick={() => {handleCharityToggle(charity.ID);}}>
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
    : [];

    function handleViewRatingClick(EIN: string) {
        window.open(`https://www.charitynavigator.org/ein/${EIN}`);
      }
      
      function handleMoreClick(websiteURL: string) {
        window.open(`${websiteURL}`);
      }

  return (
    <>
        <div style={{ width: '95%', margin: '1rem auto 0', display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(2, 0.85fr)", gridColumnGap: "20px", gridRowGap: "20px",
        }}>
        {slides.length > 0 && slides }
        </div>
        {slides.length == 0 &&
        <div className='d-flex flex-column '>
            <Text className='mt-3' c="dimmed" ta={"center"}>Navigate to Charity Dashboard or Charity Search to Favorite Charities</Text> 
            <Group className='mx-auto mt-3'>
                <Button
                size="sm"
                className='mr-4'
                onClick={() => {
                    window.location.replace('/dashboard');
                }}
                >
                    <ShoppingCart size={16} className='mr-1' />
                    Browse Charities
                </Button>
                <Button
                size="sm"
                onClick={() => {
                    window.location.replace('/charitysearch');
                }}
                >
                        <Search size={16} className='mr-1' />
                        <span>
                            Search Charities
                        </span>
                        
                </Button>
            </Group>
            
        </div>
            

        }
        
    </>
        
  );
};

export default UserCharities;
