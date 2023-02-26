import React from "react";
import { useEffect } from "react";
import { Text, Center, Button } from "@mantine/core";

export default function CharityTile() { 
    // pass in props that will populate the tile
    // dynamically render the tiles on the dashboard
    // the icons on the tile can correlate to the tag

    const { classes } = useStyles();

    return (
        <>
            <Text fw={700} fz="xl" ta="center" c="blue" className='mb-5'>Dashboard</Text>
            <Center className={classes.inner}>
            </Center>
        </>
        );
}

function useStyles(): { classes: any; } {
    throw new Error("Function not implemented.");
}
