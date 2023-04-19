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
import React from 'react';
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

const data = [
  {
    ID: 27,
    Name: 'Asian Pacific Community Fund',
    DescriptionShort:
      'Cultivate philanthropists to invest in organizations that empower underserved Asian and Pacific Islanders (API).',
    DescriptionLong:
      'APCF was founded in 1990 by API community leaders in response to the need for alternative funding for Los Angeles-based nonprofit organizations serving API communities. Prior to its incorporation, less than 0.3% of all local foundation funds went to API agencies, according to a 1988 study by AAPI Equality Alliance (formerly known as A3PCON - Asian Pacific Policy \u0026 Planning Council). In 1986, the United Way of Greater Los Angeles funded only five organizations serving APIs. To raise funds for community organizations serving API communities, APCF initiated employee giving campaigns at various workplaces, including private companies, federal agencies, state agencies, county agencies, city agencies, and nonprofit organizations.\n\nIn the past decade, APCF has diversified its fundraising efforts by developing other avenues for giving. With the growth of donor-advised funds, giving circles, grant making, scholarship funds, and capacity building initiatives, APCF has been able to cultivate philanthropy among APIs while providing multiple vehicles for donors to support the community.\n\nAs the only community-based fund serving API communities in Southern California since 1990, APCF is dedicated to increasing philanthropy amongst Asian Americans in order to build healthier communities, create a stronger unified voice, and develop leaders. Annually APCF and our 74 Network Agencies serve over 4.9 million people, over 82% of whom live at or below poverty income levels, in 47 API languages in addition to English and Spanish.',
    Location: 'Los Angeles, California, 90017 United States',
    WebsiteURL: 'http://www.apcf.org',
    LogoURL:
      'https://res.cloudinary.com/everydotorg/image/upload/c_lfill,w_24,h_24,dpr_2/c_crop,ar_24:24/q_auto,f_auto,fl_progressive/faja_profile/agfchg6gnodtibcji1cx',
    Tags: [
      'food-security',
      'adoption',
      'culture',
      'health',
      'women-led',
      'aapi-led',
      'racial-justice',
    ],
    EIN: '954257997',
  },
  {
    ID: 24,
    Name: 'Identity Mission',
    DescriptionShort:
      'Identity Mission supports vulnerable children in Honduras by providing family-based care solutions alongside the local church. ',
    DescriptionLong:
      "80% of children in an orphanage have a living parent or relative.  We work to keep children in families by two main approaches.\n\nFAMILY PRESERVATION\nIn effort to prevent children from ever experiencing separation from their families, at-risk families are identified, and IM comes alongside the family to provide the support needed to prevent separation.  Our family preservation Director evaluates the family's situation and meets their immediate needs, preventing deep trauma to the child and family.  Once the crisis is averted, IM then walks alongside the family to discover the best means for sustainability\n\nFOSTER CARE\nAs God has equipped us, we now have an operating foster family program in three regions of Honduras. Our foster families are supported by IDENTITY MISSION caseworkers, regular training, assistance with resources, a LOCAL PARTNER church that grasps the vision of family-based care and who is committed to serving the families who care for orphans, and family support events.\n\n",
    Location: 'Lowville, NY, USA',
    WebsiteURL: 'https://www.identitymission.org/',
    LogoURL:
      'https://res.cloudinary.com/everydotorg/image/upload/c_lfill,w_24,h_24,dpr_2/c_crop,ar_24:24/q_auto,f_auto,fl_progressive/profile_pics/yiv0lw0rqzjmvqxdjvew',
    Tags: ['youth', 'poverty', 'religion', 'adoption', 'christianity'],
    EIN: '473061155',
  },
  {
    ID: 26,
    Name: 'Kids In Crisis International, Inc',
    DescriptionShort:
      'Kids In Crisis International is a nonprofit organization focused on international issues. It is based in Hazelwood, NC. It received its nonprofit status in 2001.',
    DescriptionLong:
      'Kids In Crisis International, Inc. is a faith-based 501(c)(3) non-profit charitable organization established in the year 2000. We are dedicated to changing the lives of impoverished children around the world with the love of Jesus Christ. We consider it a joy and a privilege to demonstrate the love of God by helping children and their families to break out of illiteracy, poverty, hunger, and hopelessness.\n\nThe name Kids In Crisis originated as a result of what the founders witnessed in the late 1990s in Gypsy communities in northwest Romania. They witnessed children truly in crisis. Children are so impoverished it was not unusual to see them walking barefoot in the snow. All were illiterate and hopelessness was everywhere you looked.\n\nThis endeavor is close to the Father’s heart. Luke 18:16 reads, “But Jesus called the children to Him and said, ‘Let the little children come to me, and do not hinder them, for the kingdom of God belongs to such as these.’ Bring the little children unto me.’” This is our call and commission to bring the Love of Jesus to children in need.',
    Location: 'Asheville, NC, USA',
    WebsiteURL: 'https://www.kidsincrisis.com',
    LogoURL:
      'https://res.cloudinary.com/everydotorg/image/upload/c_lfill,w_24,h_24,dpr_2/c_crop,ar_24:24/q_auto,f_auto,fl_progressive/profile_pics/iecamtpfbwgcmq3dxf4d',
    Tags: [
      'poverty',
      'food-security',
      'housing',
      'water',
      'youth',
      'adoption',
      'indigenous-peoples',
      'humans',
    ],
    EIN: '650998013',
  },
  {
    ID: 28,
    Name: 'A Family for Every Orphan',
    DescriptionShort:
      'Helping orphans find loving families in their home countries.',
    DescriptionLong:
      'A Family for Every Orphan is a Christian organization that helps orphans find loving families in their home countries. Our vision is a world without orphans!',
    Location: 'SEATTLE, WA',
    WebsiteURL: 'http://www.afamilyforeveryorphan.org',
    LogoURL:
      'https://res.cloudinary.com/everydotorg/image/upload/c_lfill,w_24,h_24,dpr_2/c_crop,ar_24:24/q_auto,f_auto,fl_progressive/faja_profile/n0ys7x6abzqfuwzf7fas',
    Tags: ['youth', 'refugees', 'ukraine', 'adoption', 'humans'],
    EIN: '264015124',
  },
];

const UserCharities = (props: Props) => {

    const {tagColors} = useAuth();

  function handleViewRatingClick(EIN: string) {
    window.location.replace(`https://www.charitynavigator.org/ein/${EIN}`);
  }

  function handleMoreClick(websiteURL: string) {
    window.location.replace(`${websiteURL}`);
  }

  return (
    <div className="d-flex" style={{ width: '95%', margin: '1rem auto 0' }}>
      {data.map((charity, index) => {
        return (
          <div key={index} className="col-3 p-1">
            <Paper
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
                {charity.Tags.map((tag, index) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default UserCharities;
