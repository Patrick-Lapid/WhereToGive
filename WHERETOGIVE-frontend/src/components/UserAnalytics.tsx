import { Avatar, Badge, Button, Center, createStyles, Group, HoverCard, NumberInput, Paper, ScrollArea, Select, Table, Text } from '@mantine/core';
import React, { forwardRef, useEffect, useState } from 'react';
import { BorderRadius, CaretDown } from 'tabler-icons-react';
import { useAuth } from '../../ts/authenticate';
import humans from "../../public/humans.png";
import seniors from "../../public/seniors.png";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

type Props = {}

const useStyles = createStyles(() => ({
    mainContainer : {
        width : "95%",
        margin: '1rem auto 0',

        // [theme.fn.smallerThan('lg')] : {
        //     width: '90%',
        // },
        // [theme.fn.smallerThan('md')] : {
        //     width: '100%',
        //     height : '45rem'
        // }
    }, 
    
}));

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    LogoURL: string;
    value : string;
    label : string;
    Name: string;
    ID: number;
}  

interface searchResultType {
    ID : number
    LogoURL : string
    Name : string
    Tags : string[]
}


const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ LogoURL, Name, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={LogoURL} />
          <div>
            <Text>{Name}</Text>
          </div>
        </Group>
      </div>
    )
);

export const options = {
    responsive: true,
    tension : 0.4,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales : {
        y: {
            grid: {
                display : false
            }
        },
        x: {
            grid: {
                display : false
            }
        }
    }
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const chartData = {
    labels,
    datasets: [
      {
        label: 'Donations',
        data: [400, 500, 600, 534, 234, 933, 333, 643, 400, 323],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      
    ],
  };
  

export default function UserAnalytics ({}: Props) {

    const {classes, cx}  = useStyles();
    const [selectedCharityID, setCharityID] = useState<number>(null);
    const [selectedCharityName, setSelectedCharityName] = useState<string>(null);
    const [searchResults, updateSearchResults] = useState<ItemProps[]>([]);
    const {currentUser} = useAuth();

    useEffect(() => {
        // pull in user donation data
    }, []);

    const getCharityName = async (charityID : number) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/charities/${charityID}`
            );
            const jsonData = await response.json();
            console.log(jsonData);
    
            setSelectedCharityName(jsonData.Name);
            
        } catch (error) {
        
            console.log("simple search error")
        
        }
    }

    const handleSearchChange = async (searchParam : string) => {

        if(searchParam.length > 2){
            try {
                const response = await fetch(
                    `http://localhost:8000/api/charities/search/?terms=${searchParam}`
                );
                const jsonData : searchResultType[] = await response.json();
                console.log(jsonData);
        
                const cleanedArray : ItemProps[] = [];
        
                jsonData.forEach(val=>{cleanedArray.push({
                    LogoURL: val.LogoURL,
                    value : val.ID.toString(),
                    Name: val.Name,
                    label : val.Name,
                    ID: val.ID,
                })});

                console.log(cleanedArray);
        
                updateSearchResults(cleanedArray);
                
            } catch (error) {
            
                console.log("simple search error")
            
            }
        }
        
    }

    const onDonate = () => {
        // send json to endpoint
        /**
         * {
         *      userID
         *      amount
         *      charityID
         *      trans_date
         * 
         * }
         */
        // repull trx data
    }

    return (
        <div className={classes.mainContainer}>
            <div className="d-flex flex-column">
                <div className="d-flex">
                    <div className="col-8 p-1">
                        <Paper
                            radius="md"
                            withBorder
                            shadow="sm"
                            p="lg"
                            style={{
                                height: '350px',
                                width : "100%",
                                padding : "35px"
                            }}
                        >
                            <Line style={{width: "100%"}} options={options} data={chartData} />
                        </Paper>
                    </div>
                    
                    <div className="col-4 p-1">
                    <Paper
                        radius="md"
                        withBorder
                        shadow="sm"
                        p="lg"
                        style={{
                            height: '350px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        
                        <div>
                            <Text fw={700}>
                                Self-Report Donations
                            </Text>
                            <Avatar src={``} size={50} radius={50} mx="auto" />
                            <HoverCard width={450} shadow="md">
                                <HoverCard.Target>
                                    <Text color="black" align="center" size="lg" weight={500} mt="md" style={{cursor : "pointer"}}>
                                        {!selectedCharityName && "Choose Charity"}
                                        {selectedCharityName && selectedCharityName}
                                        <CaretDown size={25} strokeWidth={1} className="p-1" />
                                    </Text>
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                    <Select
                                    id="simpleSearch"
                                    label="Search Charities"
                                    placeholder="Pick one"
                                    itemComponent={SelectItem}
                                    onChange={(event) => {getCharityName(parseInt(event)); setCharityID(parseInt(event));}}
                                    onSearchChange={(searchTerm)=>{handleSearchChange(searchTerm)}}
                                    data={searchResults && searchResults.length > 0 ? searchResults : []}
                                    searchable
                                    maxDropdownHeight={400}
                                    nothingFound="Charity Not Found"
                                    />

                                </HoverCard.Dropdown>
                            </HoverCard>
                            
                        </div>
                        
                        
                        
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {selectedCharityID && 
                                <NumberInput
                                label="Donation Amount"
                                defaultValue={50}
                                precision={2}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                formatter={(value) =>
                                !Number.isNaN(parseFloat(value))
                                    ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                    : '$ '
                                }
                                stepHoldDelay={500}
                                stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                            />
                            }
                            <Button
                            // onClick={() => handleMoreClick(WebsiteURL)}
                            variant="gradient"
                            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                            fullWidth
                            mt="md"
                            >
                            Donate
                            </Button>
                        </div>
                    </Paper>
                        
                    </div>
                </div>
                
                <div className="d-flex">
                    <div className="col-5 p-1">
                    <Paper
                        radius="md"
                        withBorder
                        shadow="sm"
                        p="lg"
                        style={{
                            height: '325px',
                            
                        }}
                    >
                        <Center h={350}>
                            You have no recurring payments setup
                        </Center>
                    </Paper>
                    </div>
                    <div className="col-7 p-1">
                    <Paper
                        radius="md"
                        withBorder
                        shadow="sm"
                        p="lg"
                        style={{
                            height: '325px',
                        }}
                    >
                        <ScrollArea>
                        <Table highlightOnHover verticalSpacing="sm" >
                            <thead>
                                <tr>
                                    <th>Charity Name</th>
                                    
                                    <th>Posted Date</th>
                                    <th>Donation</th>
                                    <th>Type</th>
                                    <th></th>
                                </tr>
                            </thead>
                            
                            <tbody>
                            <tr>
                                <td>
                                    <Group spacing="sm">
                                <Avatar size={30} src={humans} radius={30} />
                                <Text fz="sm" fw={500}>
                                    American Red Cross
                                </Text>
                                </Group>
                                </td>
                                
                                <td>January</td>
                                <td>$36.81</td>
                                <td>
                                    <Badge
                                    variant="gradient"
                                    gradient={{ from: 'teal', to: 'violet', deg: 60 }}
                                    >
                                    Recurring
                                    </Badge>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><Group spacing="sm">
                                <Avatar size={30} src={seniors} radius={30} />
                                <Text fz="sm" fw={500}>
                                    Feeding America
                                </Text>
                                </Group>
                                </td>
                                
                                <td>February</td>
                                <td>$73.81</td>
                                <td>
                                    <Badge
                                    variant='outline'
                                    
                                    >
                                    One Time
                                    </Badge>
                                </td>
                                <td></td>
                            </tr>
                            </tbody>
                            

                            

                        </Table>
                        </ScrollArea>
                        
                    </Paper>
                    </div>
                </div>
                
            </div>
        </div>
        
    );
}