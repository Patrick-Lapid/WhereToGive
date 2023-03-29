import { Avatar, Button, Center, createStyles, Group, HoverCard, NumberInput, Paper, Select, Table, Text } from '@mantine/core';
import React, { forwardRef, useState } from 'react';
import { BorderRadius, CaretDown } from 'tabler-icons-react';

type Props = {}

const useStyles = createStyles(() => ({
    mainContainer : {
        width : "95%",
        margin: '4rem auto',

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
    image: string;
    name: string;
    description: string;
}  

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />
  
          <div>
            <Text>{description}</Text>
          </div>
        </Group>
      </div>
    )
);

const data = [
    {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
      label: 'Charity 1',
      value: "1",
      description: 'Charity 1',
    },
  
    {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
      label: 'Charity 2',
      value: "2",
      description: 'Charity 2',
    },
    {
      image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
      label: 'Charity 3',
      value: "3",
      description: 'Charity 3',
    },
    {
      image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
      label: 'Charity 4',
      value: "4",
      description: 'Charity 4',
    },
];
  
  

export default function UserAnalytics ({}: Props) {

    const {classes, cx}  = useStyles();
    const [selectedCharity, setCharity] = useState<number>(null);

    return (
        <div className={classes.mainContainer}>
            <div className="d-flex flex-column">
                <div className="d-flex">
                    <div className="col-8 p-1">
                        <Paper
                            radius="md"
                            withBorder
                            p="lg"
                            style={{
                                height: '400px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            chart
                        </Paper>
                    </div>
                    
                    <div className="col-4 p-1">
                    <Paper
                        radius="md"
                        withBorder
                        p="lg"
                        style={{
                            height: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        
                        <div>
                            <Text>
                                Self-Report Donations
                            </Text>
                            <Avatar src={``} size={50} radius={50} mx="auto" />
                            <HoverCard width={450} shadow="md">
                                <HoverCard.Target>
                                    <Text color="black" align="center" size="lg" weight={500} mt="md" style={{cursor : "pointer"}}>
                                        {!selectedCharity && "Choose Charity"}
                                        {selectedCharity && data[selectedCharity - 1].label}
                                        <CaretDown size={25} strokeWidth={1} className="p-1" />
                                    </Text>
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                    <Select
                                    label="Search Charities"
                                    placeholder="Pick one"
                                    itemComponent={SelectItem}
                                    onChange={(event) => setCharity(parseInt(event))}
                                    data={data}
                                    searchable
                                    maxDropdownHeight={400}
                                    nothingFound="Charity Not Found"
                                    filter={(value, item) =>
                                        item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                                        item.description.toLowerCase().includes(value.toLowerCase().trim())
                                    }
                                    />

                                </HoverCard.Dropdown>
                            </HoverCard>
                            
                        </div>
                        
                        
                        
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {selectedCharity && 
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
                            variant="default"
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
                        p="lg"
                        style={{
                            height: '400px',
                            
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
                        p="lg"
                        style={{
                            height: '400px',
                        }}
                    >
                        <Table highlightOnHover>
                            <tr>
                                <th>Charity Name</th>
                                <th>Posted Date</th>
                                <th>Donation</th>
                                <th></th>
                            </tr>

                        </Table>
                    </Paper>
                    </div>
                </div>
                
            </div>
        </div>
        
    );
}