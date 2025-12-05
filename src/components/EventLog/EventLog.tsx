import React from 'react';
import { Drawer, Box, Typography, Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useEventLog } from '../../hooks/useEventLog';

interface EventLogProps {
  open: boolean;
  onClose: () => void;
}

export const EventLog: React.FC<EventLogProps> = ({ open, onClose }) => {
  const { events, clearEvents } = useEventLog();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Лог событий
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={clearEvents}
          fullWidth
          sx={{ mb: 2 }}
          disabled={events.length === 0}
        >
          Очистить лог
        </Button>
        <Paper sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
          <List>
            {events.length === 0 ? (
              <ListItem>
                <ListItemText primary="Событий пока нет" />
              </ListItem>
            ) : (
              events.map((event, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={event}
                    primaryTypographyProps={{ fontSize: '0.875rem' }}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </Box>
    </Drawer>
  );
};


