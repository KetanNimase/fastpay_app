import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Paper
} from '@mui/material';
import claimsApi from '../../services/claimsApi';
import { toast } from 'react-toastify';

const ClaimNotes = ({ claimId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (claimId) {
      fetchNotes();
    }
  }, [claimId]);

  const fetchNotes = async () => {
    try {
      const response = await claimsApi.getClaimNotes(claimId);
      setNotes(response.data);
    } catch (error) {
      toast.error('Failed to fetch notes');
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      await claimsApi.addClaimNote(claimId, { content: newNote });
      setNewNote('');
      fetchNotes();
      toast.success('Note added successfully');
    } catch (error) {
      toast.error('Failed to add note');
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Add a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddNote}
          sx={{ mt: 1 }}
          disabled={!newNote.trim()}
        >
          Add Note
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ maxHeight: 400, overflow: 'auto' }}>
        <List>
          {notes.map((note, index) => (
            <React.Fragment key={note.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="subtitle2">
                      {new Date(note.created_at).toLocaleString()}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {note.content}
                      </Typography>
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        By: {note.created_by}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < notes.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {notes.length === 0 && (
            <ListItem>
              <ListItemText
                primary={
                  <Typography color="text.secondary" align="center">
                    No notes available
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default ClaimNotes;