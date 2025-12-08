import React, { useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

export default function UsersListTSScroll({ users, cardHeight = 200 }) {
  const wrapperRef = useRef(null);

  // Window-based virtualizer
  const virtualizer = useWindowVirtualizer({
    count: users.length,
    estimateSize: () => cardHeight,
    overscan: 6
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return (
    <Box ref={wrapperRef} position="relative">
      {/* This creates the full scroll height */}
      <Box
        role="list"
        style={{
          height: totalSize,
          position: "relative"
        }}
      >
        {virtualItems.map((vi) => {
          const user = users[vi.index];

          return (
            <Box
              key={vi.key}
              role="listitem"
              aria-posinset={vi.index + 1}
              aria-setsize={users.length}
              style={{
                position: "absolute",
                top: vi.start,
                left: 0,
                right: 0,
                height: cardHeight,
                boxSizing: "border-box"
              }}
            >
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {user.id}
                  </Typography>

                  <Typography variant="body2"><strong>First Name:</strong> {user.firstName}</Typography>
                  <Typography variant="body2"><strong>Last Name:</strong> {user.lastName}</Typography>
                  <Typography variant="body2"><strong>Age:</strong> {user.age}</Typography>
                  <Typography variant="body2"><strong>Phone:</strong> {user.phone}</Typography>
                  <Typography variant="body2"><strong>Location:</strong> {user.location}</Typography>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
