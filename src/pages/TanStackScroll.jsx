import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { generateUsers } from '../utils/mockData'

import UsersListTSScroll from './tanStackScroll/UsersListTSScroll'
import UsersTableTSScroll from './tanStackScroll/UsersTableTSScroll'


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
            <Typography variant="h4" gutterBottom>TS02: TanStack Table with Window Scroll of {count} items</Typography>
            {!isMobile &&
                <UsersTableTSScroll rows={users} />
            }
            {isMobile && 
                <UsersListTSScroll users={users} />
            }
        </div>
    );
}