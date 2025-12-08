import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { generateUsers } from '../utils/mockData'

import UsersListTSSafari from './tanStackSafari/UsersListTSSafari'
import UsersTableTSSafari from './tanStackSafari/UsersTableTSSafari'


export default function TanStackSafari() {
    const theme = useTheme();
    const [users, setUsers] = React.useState([]);
    const count = 5000;

    React.useEffect(() => {
        setUsers(generateUsers(count));
    }, []);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Typography variant="h4" gutterBottom>TS03: TanStack Table for SAFARI with Window Scroll of {count} items</Typography>
            {!isMobile &&
                <UsersTableTSSafari users={users} />
            }
            {isMobile && 
                <UsersListTSSafari users={users} />
            }
        </div>
    );
}