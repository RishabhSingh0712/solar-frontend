import React from 'react';
import {Blocks} from 'react-loader-spinner';
import { Dialog,  Box, CircularProgress } from '@mui/material';
const Loader = ({open=true}) => {
    
    return (
        <Dialog
        open={open}
        maxWidth="xs"
        sx={{
            '.MuiDialog-paper': {
              backgroundColor: '#000000' , // Black for loadinng
             
            },
          }}
      
      >
        <Box display="flex" flexDirection="column" alignItems="center" p={3}   sx={{
            textAlign: 'center',
           
          }}>
      
          <CircularProgress />
          <p className="text-xs text-gray-400 mt-2">Loading...</p>
        </Box>
      </Dialog>
    );
};

export default Loader;