import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { generateUsers } from '../utils/mockData'

import UsersListRW from './reactWindow/UsersListRW'
import UsersTableRW from './reactWindow/UsersTableRW'


export default function ReactWindow() {
    const theme = useTheme();
    const [users, setUsers] = React.useState([]);
    const count = 2000;

    React.useEffect(() => {
        setUsers(generateUsers(count));
    }, []);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Typography variant="h4" gutterBottom>react-window Table / List of {count} items</Typography>
            {!isMobile &&
                <UsersTableRW rows={users} />
            }
            {isMobile && 
                <UsersListRW users={users} />
            }
        </div>
    );
}