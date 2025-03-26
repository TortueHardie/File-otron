import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Stack,
  LinearProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const { ipcRenderer } = window.require('electron');

interface OrganizeResults {
  total: number;
  processed: number;
  skipped: number;
  categories: Record<string, number>;
}

const App: React.FC = () => {
  const [sourceDir, setSourceDir] = useState<string>('');
  const [targetDir, setTargetDir] = useState<string>('');
  const [isOrganizing, setIsOrganizing] = useState<boolean>(false);
  const [results, setResults] = useState<OrganizeResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectSourceDir = async () => {
    try {
      const dir = await ipcRenderer.invoke('select-source-directory');
      if (dir) {
        setSourceDir(dir);
        setError(null);
      }
    } catch (err) {
      setError('Failed to select source directory');
      console.error(err);
    }
  };

  const handleSelectTargetDir = async () => {
    try {
      const dir = await ipcRenderer.invoke('select-target-directory');
      if (dir) {
        setTargetDir(dir);
        setError(null);
      }
    } catch (err) {
      setError('Failed to select target directory');
      console.error(err);
    }
  };

  const handleOrganizeFiles = async () => {
    if (!sourceDir || !targetDir) {
      setError('Please select both source and target directories');
      return;
    }

    if (sourceDir === targetDir) {
      setError('Source and target directories must be different');
      return;
    }

    try {
      setIsOrganizing(true);
      setError(null);
      setResults(null);
      
      const results = await ipcRenderer.invoke('organize-files', sourceDir, targetDir);
      setResults(results);
    } catch (err: any) {
      setError(`Error organizing files: ${err.message || err}`);
      console.error(err);
    } finally {
      setIsOrganizing(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          File-otron
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          Organize your files into categorized folders
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" gutterBottom>
                1. Select Source Directory
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button 
                  variant="contained" 
                  onClick={handleSelectSourceDir}
                  disabled={isOrganizing}
                >
                  Browse
                </Button>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    flexGrow: 1, 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    fontStyle: sourceDir ? 'normal' : 'italic',
                    color: sourceDir ? 'text.primary' : 'text.secondary'
                  }}
                >
                  {sourceDir || 'No directory selected'}
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                2. Select Target Directory
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button 
                  variant="contained" 
                  onClick={handleSelectTargetDir}
                  disabled={isOrganizing}
                >
                  Browse
                </Button>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    flexGrow: 1, 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    fontStyle: targetDir ? 'normal' : 'italic',
                    color: targetDir ? 'text.primary' : 'text.secondary'
                  }}
                >
                  {targetDir || 'No directory selected'}
                </Typography>
              </Stack>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                onClick={handleOrganizeFiles}
                disabled={isOrganizing || !sourceDir || !targetDir}
              >
                {isOrganizing ? 'Organizing...' : 'Organize Files'}
              </Button>
            </Box>

            {isOrganizing && (
              <Box sx={{ width: '100%', mt: 2 }}>
                <LinearProgress />
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {results && (
              <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Organization Complete
                </Typography>
                <Typography>
                  Total files found: {results.total}
                </Typography>
                <Typography>
                  Files processed: {results.processed}
                </Typography>
                <Typography>
                  Directories skipped: {results.skipped}
                </Typography>

                {Object.keys(results.categories).length > 0 && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Files Organized by Category:
                    </Typography>
                    <List dense>
                      {Object.entries(results.categories)
                        .sort(([, countA], [, countB]) => countB - countA)
                        .map(([category, count]) => (
                          <ListItem key={category}>
                            <ListItemText 
                              primary={`${category}: ${count} file${count !== 1 ? 's' : ''}`} 
                            />
                          </ListItem>
                        ))
                      }
                    </List>
                  </>
                )}
              </Paper>
            )}
          </Stack>
        </Box>
      </Paper>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
        File-otron v1.0.0
      </Typography>
    </Container>
  );
};

export default App; 