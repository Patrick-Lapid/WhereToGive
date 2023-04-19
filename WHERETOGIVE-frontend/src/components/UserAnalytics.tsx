import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Center,
  createStyles,
  Flex,
  Group,
  HoverCard,
  Loader,
  NumberInput,
  Paper,
  ScrollArea,
  Select,
  Switch,
  Table,
  Text,
  Title,
} from '@mantine/core';
import React, { forwardRef, useEffect, useState } from 'react';
import { CaretDown, Check, PlayerRecord, Trash, X } from 'tabler-icons-react';
import { useAuth } from '../../ts/authenticate';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Doughnut, Line } from 'react-chartjs-2';
import { notifications } from '@mantine/notifications';
import { DateInput } from '@mantine/dates';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const useStyles = createStyles(() => ({
  mainContainer: {
    width: '95%',
    margin: '1rem auto 0',

    // [theme.fn.smallerThan('lg')] : {
    //     width: '90%',
    // },
    // [theme.fn.smallerThan('md')] : {
    //     width: '100%',
    //     height : '45rem'
    // }
  },
  disabledDonation : {

  }
}));

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  LogoURL: string;
  value: string;
  label: string;
  Name: string;
  ID: number;
}

interface searchResultType {
  ID: number;
  LogoURL: string;
  Name: string;
  Tags: string[];
}

interface charity {
  name: string;
  photoURL: string;
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

const lineOptions = {
  responsive: true,
  tension: 0.4,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function UserAnalytics() {
  const { classes } = useStyles();
  const [loading, setloading] = useState<boolean>(true);
  const [selectedCharityID, setCharityID] = useState<number | null>(null);
  const [selectedCharity, setSelectedCharity] = useState<charity | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [donationAmt, setDonationAmt] = useState<number | ''>(50);
  const [userTotal, setUserTotal] = useState<number>(0);
  const [reoccurring, setReoccurring] = useState<boolean>(false);
  const [hasReoccurringPayment, toggleHasReoccurringPayment] = useState<boolean>(false);
  const [donationList, updateUserDonationList] = useState([]);
  const [lineChartData, setLineChartData] = useState<any>(null);
  const [doughnutChartData, setDoughnutChartData] = useState<any>(null);
  const [searchResults, updateSearchResults] = useState<ItemProps[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    // pull in user donation data
    try {
      getUserDonations();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if(reoccurring){
        setDate(new Date());
    }
  }, [reoccurring])

  const deleteDonation = (donationID: number) => {
    try {
      fetch(`http://localhost:8000/api/donations/delete/${donationID}`, {
        method: 'DELETE',
      }).then(() => {
        getUserDonations();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReocurringDonation = (donationID: number) => {
    try {
      fetch(`http://localhost:8000/api/reccuringdonations/delete/${donationID}`, {
        method: 'DELETE',
      }).then(() => {
        getUserDonations();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateReocurringDonation = (donation: any) => {
    try {
      fetch(`http://localhost:8000/api/reccuringdonations/update`, {
        method: 'PUT',
        body: JSON.stringify({
            Id : donation.ID,
            Active : donation.status,
            }),
      }).then(() => {
        getUserDonations();
        notifications.show({
            autoClose: 5000,
            title: 'Updated!',
            message: `Your recurring donation was set to ${donation.status ? "active" : "inactive"}!`,
            color: 'green',
            icon: <Check color="white" />,
            className: 'my-notification-class',
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDonations = async () => {
    toggleHasReoccurringPayment(false);
    try {
      const response = await fetch(
        `http://localhost:8000/api/donations/getdonations/${currentUser.uid}`
      );
      const userTotalResponse = await fetch(
        `http://localhost:8000/api/donations/getamount/${currentUser.uid}`
      );
      const userReoccurringResponse = await fetch(
        `http://localhost:8000/api/recurringdonations/getdonations/${currentUser.uid}`
      );
      const userTotalPayload = await userTotalResponse.json();
      setUserTotal(userTotalPayload.TotalAmount);
      const jsonData = await response.json();
      const reoccurringJsonData = await userReoccurringResponse.json();


      const tableRow: JSX.Element[] = [];

      if (!jsonData) {
        setDoughnutChartData(null);
        setLineChartData(null);
        updateUserDonationList([]);
        if(reoccurringJsonData && !jsonData){
            toggleHasReoccurringPayment(true);
            reoccurringJsonData.forEach((donation : any, index : number) => {
                tableRow.push(
                    <tr key={donation.ID}>
                        <td>
                        <Group spacing="sm">
                            <Avatar size={30} src={donation.LogoURL} radius={30} />
                            <Text fz="sm" fw={500}>
                            {donation.Name.length > 40
                                ? `${donation.Name.substring(0, 40)}...`
                                : donation.Name}
                            </Text>
                        </Group>
                        </td>
    
                        <td>{`${donation.Date.substring(
                        5,
                        7
                        )}/${donation.Date.substring(
                        8,
                        10
                        )}/${donation.Date.substring(2, 4)}`}</td>
                        <td>{`$ ${donation.Amount}`}</td>
                        <td>
                        <Badge
                            variant="gradient"
                            gradient={{ from: 'teal', to: 'violet', deg: 60 }}
                        >
                            Monthly
                        </Badge>
                        </td>
                        
                        <td>
                            <Group>
                                <ActionIcon onClick={() => deleteReocurringDonation(donation.Id)}>
                                    <Trash color="red" size="1.125rem" />
                                </ActionIcon>
                                <ActionIcon onClick={() => updateReocurringDonation({
                                    ID: donation.Id,
                                    status: !donation.Active
                                })}>
                                    <PlayerRecord color={`${donation.Active ? "green" : "red"}`} size="1.125rem" />
                                </ActionIcon>
                            </Group>
                        </td>
                    </tr>
                );
            });
          }
          updateUserDonationList(tableRow);
        setloading(false);
        return;
      } else {
        const donationMap = new Map<string, number>();
        const charityMap = new Map<string, number>();
        let lineLabels: string[] = [];
        let donationData: number[] = [];
        const charityLabels: string[] = [];
        const charityData: number[] = [];
        

        // generate donation map from user donations
        jsonData.forEach((donation: any, index: number) => {
            if (donationMap.has(donation.TransDate.substring(0, 10))) {
            donationMap.set(
                donation.TransDate.substring(0, 10),
                donationMap.get(donation.TransDate.substring(0, 10)) +
                donation.Amount
            );
            } else {
            donationMap.set(donation.TransDate.substring(0, 10), donation.Amount);
            }

            if (charityMap.has(donation.Name)) {
            charityMap.set(
                donation.Name,
                charityMap.get(donation.Name) + donation.Amount
            );
            } else {
            charityMap.set(donation.Name, donation.Amount);
            }

            tableRow.push(
            <tr key={donation.ID}>
                <td>
                <Group spacing="sm">
                    <Avatar size={30} src={donation.LogoURL} radius={30} />
                    <Text fz="sm" fw={500}>
                    {donation.Name.length > 40
                        ? `${donation.Name.substring(0, 40)}...`
                        : donation.Name}
                    </Text>
                </Group>
                </td>

                <td>{`${donation.TransDate.substring(
                5,
                7
                )}/${donation.TransDate.substring(
                8,
                10
                )}/${donation.TransDate.substring(2, 4)}`}</td>
                <td>{`$ ${donation.Amount}`}</td>
                <td>
                <Badge>
                    One-Time
                </Badge>
                </td>
                <td>
                <ActionIcon onClick={() => deleteDonation(donation.ID)}>
                    <Trash color="red" size="1.125rem" />
                </ActionIcon>
                </td>
            </tr>
            );
        });
        
        if(reoccurringJsonData){
            toggleHasReoccurringPayment(true);
            reoccurringJsonData.forEach((donation : any, index : number) => {
                tableRow.unshift(
                    <tr key={donation.ID}>
                        <td>
                        <Group spacing="sm">
                            <Avatar size={30} src={donation.LogoURL} radius={30} />
                            <Text fz="sm" fw={500}>
                            {donation.Name.length > 40
                                ? `${donation.Name.substring(0, 40)}...`
                                : donation.Name}
                            </Text>
                        </Group>
                        </td>
    
                        <td>{`${donation.Date.substring(
                        5,
                        7
                        )}/${donation.Date.substring(
                        8,
                        10
                        )}/${donation.Date.substring(2, 4)}`}</td>
                        <td>{`$ ${donation.Amount}`}</td>
                        <td>
                        <Badge
                            variant="gradient"
                            gradient={{ from: 'teal', to: 'violet', deg: 60 }}
                        >
                            Monthly
                        </Badge>
                        </td>
                        <td>
                            <Group>
                                <ActionIcon onClick={() => deleteReocurringDonation(donation.Id)}>
                                    <Trash color="red" size="1.125rem" />
                                </ActionIcon>
                                <ActionIcon onClick={() => updateReocurringDonation({
                                    ID: donation.Id,
                                    status: !donation.Active
                                })}>
                                    <PlayerRecord color={`${donation.Active ? "green" : "red"}`} size="1.125rem" />
                                </ActionIcon>
                            </Group>
                            
                        </td>
                    </tr>
                );
            });
        }

        // generates map array for line chart
        donationMap.forEach((donation, label) => {
            lineLabels.push(
            `${label.substring(5, 7)}/${label.substring(8, 10)}/${label.substring(
                2,
                4
            )}`
            );
            donationData.push(donation);
        });

        // generates map array for doughnut chart
        charityMap.forEach((donation, label) => {
            charityLabels.push(label);
            charityData.push(donation);
        });

        // reverses arrays
        lineLabels = lineLabels.map(
            (val, index, array) => array[array.length - 1 - index]
        );
        donationData = donationData.map(
            (val, index, array) => array[array.length - 1 - index]
        );

        // sets doughnut chartData
        setDoughnutChartData({
            labels: charityLabels,
            datasets: [
            {
                label: 'Donations ($)',
                data: charityData,
                backgroundColor: [
                'rgb(32, 133, 236)',
                'rgb(114, 180, 235)',
                'rgb(10, 65, 122)',
                'rgb(132, 100, 160)',
                'rgb(206, 169, 188)',
                'rgb(252, 189, 156)',
                'rgb(170, 87, 159)',
                'rgb(142, 165, 204)	',
                'rgb(76, 50, 92)',
                ],
                hoverOffset: 4,
            },
            ],
        });

        // sets line chartData
        setLineChartData({
            labels: lineLabels,
            datasets: [
            {
                label: 'Donations ($)',
                data: donationData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            ],
        });

      }

      updateUserDonationList(tableRow);

      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCharityName = async (charityID: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/charities/${charityID}`
      );
      const jsonData = await response.json();
      setSelectedCharity({ name: jsonData.Name, photoURL: jsonData.LogoURL });
    } catch (error) {
      console.log('simple search error');
    }
  };

  const handleSearchChange = async (searchParam: string) => {
    if (searchParam.length > 2) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/charities/search/?terms=${searchParam}`
        );
        const jsonData: searchResultType[] = await response.json();
        const cleanedArray: ItemProps[] = [];

        jsonData.forEach((val) => {
          cleanedArray.push({
            LogoURL: val.LogoURL,
            value: val.ID.toString(),
            Name: val.Name,
            label: val.Name,
            ID: val.ID,
          });
        });

        updateSearchResults(cleanedArray);
      } catch (error) {
        console.log('simple search error');
      }
    }
  };

  const onDonate = async () => {
    // send json to endpoint
    if (selectedCharityID) {
      
      if(!reoccurring){
        fetch(`http://localhost:8000/api/donations/add`, {
            method: 'POST',
            body: JSON.stringify({
            Userid: currentUser.uid,
            Charityid: selectedCharityID,
            Amount: donationAmt,
            TransDate: date,
            }),
        }).then(() => {
            setSelectedCharity(null);
            setCharityID(null);
            setReoccurring(false);
            updateSearchResults([]);
            notifications.show({
            autoClose: 5000,
            title: 'Success!',
            message: 'Your donation was processed :)',
            color: 'green',
            icon: <Check color="white" />,
            className: 'my-notification-class',
            });

            // repull trx data
            getUserDonations();
        });
      } else {
        fetch(`http://localhost:8000/api/recurringdonations/add`, {
            method: 'POST',
            body: JSON.stringify({
            Userid: currentUser.uid,
            Charityid: selectedCharityID,
            Amount: donationAmt,
            Date: date,
            Active: true
            }),
        }).then(() => {
            setSelectedCharity(null);
            setReoccurring(false);
            setCharityID(null);
            updateSearchResults([]);
            notifications.show({
            autoClose: 5000,
            title: 'Success!',
            message: 'Your reocurring donation was processed and set to Active',
            color: 'green',
            icon: <Check color="white" />,
            className: 'my-notification-class',
            });

            // repull trx data
            getUserDonations();
        });
      }
      

    } else {
      notifications.show({
        autoClose: 5000,
        title: 'No charity selected',
        message: 'Please select a charity',
        color: 'red',
        icon: <X color="white" />,
        className: 'my-notification-class',
      });
    }
  };

  return (
    <div className={classes.mainContainer}>
      {loading && (
        <div style={{ backgroundColor: 'white', height: '50rem' }}>
          <Center h={500}>
            <div>
              <Loader size="xl" color="teal" variant="dots" />
            </div>
          </Center>
        </div>
      )}

      {!loading && (
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="col-8 p-1">
              <Paper
                radius="md"
                withBorder
                shadow="sm"
                p="lg"
                style={{
                  height: '385px',
                  width: '100%',
                  padding: '35px',
                }}
              >
                {lineChartData && (
                  <Line
                    style={{ width: '100%' }}
                    options={lineOptions}
                    data={lineChartData}
                  />
                )}
                {!lineChartData && <Center h={250}>No Donation Data</Center>}
              </Paper>
            </div>

            <div className="col-4 p-1">
              <Paper
                radius="md"
                withBorder
                shadow="sm"
                p="lg"
                style={{
                  height: '385px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Text fw={700}>Self-Report Donations</Text>
                  <Avatar
                    src={selectedCharity && selectedCharity.photoURL}
                    size={50}
                    radius={50}
                    mx="auto"
                  />
                  <HoverCard width={450} shadow="md">
                    <HoverCard.Target>
                      <Text
                        color="black"
                        align="center"
                        size="lg"
                        weight={500}
                        mt="md"
                        style={{ cursor: 'pointer' }}
                      >
                        {!selectedCharity && 'Choose Charity'}
                        {selectedCharity && selectedCharity.name}
                        <CaretDown size={25} strokeWidth={1} className="p-1" />
                      </Text>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Select
                        id="simpleSearch"
                        label="Search Charities"
                        placeholder="Pick one"
                        itemComponent={SelectItem}
                        onChange={(event) => {
                          getCharityName(parseInt(event));
                          setCharityID(parseInt(event));
                        }}
                        onSearchChange={(searchTerm) => {
                          handleSearchChange(searchTerm);
                        }}
                        data={
                          searchResults && searchResults.length > 0
                            ? searchResults
                            : []
                        }
                        searchable
                        maxDropdownHeight={400}
                        nothingFound="Charity Not Found"
                      />
                    </HoverCard.Dropdown>
                  </HoverCard>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {selectedCharityID && (
                    <>
                      
                      <DateInput
                        value={date}
                        onChange={setDate}
                        label="Donation Date"
                        placeholder="Date input"
                        minDate={reoccurring ? new Date() : null}
                        mt="md"
                      />
                      <Switch label={"Reoccurring (Monthly)"} className='mt-3 pb-0' checked={reoccurring} onChange={(event) => setReoccurring(event.currentTarget.checked)} />
                      <NumberInput
                        label="Donation Amount"
                        value={donationAmt}
                        onChange={setDonationAmt}
                        mt="sm"
                        precision={2}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        formatter={(value) =>
                          !Number.isNaN(parseFloat(value))
                            ? `$ ${value}`.replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ','
                              )
                            : '$ '
                        }
                        stepHoldDelay={500}
                        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                      />
                      
                    </>
                  )}
                  <Button
                    onClick={onDonate}
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                    fullWidth
                    mt="sm"
                    mb="sm"
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
                {doughnutChartData && (
                  <Flex mih={260} align="center" justify="center" gap="xl">
                    <Text
                      fz="xl"
                      fw={600}
                      variant="gradient"
                      gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    >
                      Total Donations: ${userTotal}
                    </Text>
                    <div>
                      <Doughnut
                        width={190}
                        options={doughnutOptions}
                        data={doughnutChartData}
                      />
                    </div>
                  </Flex>
                )}
                {!doughnutChartData && (
                  <Center h={250}>
                    <Text
                      fz="xl"
                      fw={600}
                      variant="gradient"
                      gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    >
                      Total Donations: ${userTotal}
                    </Text>
                  </Center>
                )}
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
                <ScrollArea h={290}>
                  <Table highlightOnHover verticalSpacing="sm">
                    <thead>
                      <tr>
                        <th>Charity Name</th>
                        <th>Posted Date</th>
                        <th>Donation</th>
                        <th>Type</th>
                        <th>Update</th>
                      </tr>
                    </thead>

                    <tbody>{donationList && donationList.map((x) => x)}</tbody>
                  </Table>
                </ScrollArea>
              </Paper>
            </div>
          </div>

          <div className="d-flex">
            <div className="col-5"></div>
            <div className="col-7 p-1">
                {hasReoccurringPayment &&
                    <Text fz="xs" c="dimmed" ta={"center"}>* Recurring Payments execute on the Posted Date and create a one-time donation at 11:59pm if active.
                    Once the one-time donation has been posted, the Posted Date is moved forward to the next month.</Text>
                }
                
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
