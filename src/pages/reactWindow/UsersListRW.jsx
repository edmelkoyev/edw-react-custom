import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { VariableSizeList as List } from "react-window";


const listHeightTotal = 650;
const BASE_CARD_HEIGHT = 180;
const GUTTER = 10; 

export default function UsersListRW({ users }) {

  const renderItemCard = ({ index, style }) => {
    const user = users[index];

    return (
      <Box 
        key={user.id}
        style={{
          ...style,
          top: index === 0 ? style.top : style.top + GUTTER / 2,
          height: index === 0 ? style.height : style.height - GUTTER / 2,
          paddingBottom: GUTTER / 2,
        }}
        role="listitem"
        aria-posinset={index + 1}
        aria-setsize={users.length}
        >
        <Card variant="outlined">
          <CardContent>
              <Typography variant="h5" gutterBottom>{user.id}</Typography>
              <Typography variant="body2" component="div">{user.firstName}</Typography>
              <Typography variant="body2" component="div">{user.lastName}</Typography>
              <Typography variant="body2" component="div">{user.age}</Typography>
              <Typography variant="body2" component="div">{user.phone}</Typography>
              <Typography variant="body2" component="div">{user.location}</Typography>
          </CardContent>
      </Card>
    </Box>
    );
  };


  const getItemCardHeight = index => {
    const item = users[index];
    const base = item.location?.length > 25
      ? BASE_CARD_HEIGHT + 20
      : BASE_CARD_HEIGHT;

    return base + GUTTER;
  };

  return (
    <Box role="list">
        <List
          height={listHeightTotal}
          itemCount={users.length}
          itemSize={getItemCardHeight}
          width={"100%"}
        >
          {renderItemCard}
        </List>
    </Box>
  );
}