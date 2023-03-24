import { createStyles } from '@mantine/core';
import React from 'react';

type Props = {}

const useStyles = createStyles(() => ({
    chartPanel : {
        
        // margin: '4rem auto',
        // [theme.fn.smallerThan('lg')] : {
        //     width: '90%',
        // },
        // [theme.fn.smallerThan('md')] : {
        //     width: '100%',
        //     height : '45rem'
        // }
    }, 
}));

export default function UserAnalytics ({}: Props) {

    const {classes, cx}  = useStyles();

    return (
        <div className="d-flex flex-column">
            <div className="d-flex">
                <div>
                    chart
                </div>
                <div>
                    donate page
                </div>
            </div>
            <div>
                test
            </div>
        </div>
    );
}