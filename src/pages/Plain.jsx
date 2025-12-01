import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { generateUsers } from '../utils/mockData'

import UsersList from './plain/UsersList'
import UsersTable from './plain/UsersTable'


export default function Plain() {
    const theme = useTheme();
    const [users, setUsers] = React.useState([]);
    const count = 200;

    React.useEffect(() => {
        setUsers(generateUsers(count));
    }, []);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Typography variant="h4" gutterBottom>Plain Table / Plain List of {count} items</Typography>
            {!isMobile &&
                <UsersTable users={users} />
            }
            {isMobile && 
                <UsersList users={users} />
            }
        </div>
    );
}