import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function UsersListTSScroll({ users }) {
  return (
    <Box
      display="grid"
      gridGap={12}
      role="list">
        {users.map((user) => (
        <Card key={user.id} variant="outlined" role="listitem">
            <CardContent>
                <Typography variant="h5" gutterBottom>{user.id}</Typography>
                <Typography variant="body2" component="div">{user.firstName}</Typography>
                <Typography variant="body2" component="div">{user.lastName}</Typography>
                <Typography variant="body2" component="div">{user.age}</Typography>
                <Typography variant="body2" component="div">{user.phone}</Typography>
                <Typography variant="body2" component="div">{user.location}</Typography>
            </CardContent>
        </Card>
        ))}
    </Box>
  );
}