import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { generateUsers } from '../utils/mockData'

import UsersListTS from './tanStack/UsersListTS'
import UsersTableTS from './tanStack/UsersTableTS'


export default function TanStack() {
    const theme = useTheme();
    const [users, setUsers] = React.useState([]);
    const count = 5000;

    React.useEffect(() => {
        setUsers(generateUsers(count));
    }, []);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Typography variant="h4" gutterBottom>TS01 TanStack Table / List of {count} items</Typography>
            {!isMobile &&
                <UsersTableTS rows={users} />
            }
            {isMobile && 
                <UsersListTS users={users} />
            }
        </div>
    );
}