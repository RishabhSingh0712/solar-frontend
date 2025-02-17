import React, { createContext, useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, CircularProgress,Fade } from '@mui/material';
import Lottie from 'react-lottie';
import successAnimation from '../../asset/success.json'; // Update with the correct path to success.json
// Context
const DialogContext = createContext();
// Transition Component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={props.open} timeout={300} ref={ref} {...props} />; // Set timeout for smooth transition
});
// // Provider Component
// export const DialogProvider = ({ children }) => {
//   const [dialogConfig, setDialogConfig] = useState({
//     open: false,
//     type: '', // 'loading' or 'message'
//     title: '',
//     message: '',
//     actions: null,
//   });

//   const showDialog = ({ type, title, message, actions }) => {
//     setDialogConfig({ open: true, type, title, message, actions });
//     console.log('showDialog called with params:', { type, title, message, actions });
//   };

//   const hideDialog = () => {
//     setDialogConfig({ ...dialogConfig, open: false });
//   };

//   return (
//     <DialogContext.Provider value={{ showDialog, hideDialog }}>
//       {children}
//       <Dialog
//         open={dialogConfig.open}
//         onClose={hideDialog}
//         maxWidth={dialogConfig.type === 'loading' ? 'xs' : false}
       
//   sx={{
//     '.MuiDialog-paper': {
//       backgroundColor: '#000000' , // Black for loading
//       minHeight: dialogConfig.type === 'loading' ? 'unset' : '50px',
//       minWidth: dialogConfig.type === 'loading' ? 'unset' :'250px',
//       color: '#ffffff', // White text color for contrast
//     },
//   }}
//         aria-labelledby="dialog-title"
       
//       >
//         {dialogConfig.type === 'loading' ? (
//           <Box display="flex" flexDirection="column" alignItems="center" p={3}
//           sx={{
//             textAlign: 'center',
           
//           }}
//           >
//             <CircularProgress />
//             <p className="text-xs text-gray-400">{dialogConfig.message}</p>
//           </Box>
//         ) : (
//           <>
//           <DialogTitle id="dialog-title" sx={{ paddingBottom: '8px' }}>
//     {dialogConfig.title}
//   </DialogTitle>
//   <DialogContent sx={{ paddingBottom: '8px', paddingTop: '8px' }}>
//     <p className="text-xs text-gray-400">{dialogConfig.message}</p>
//   </DialogContent>
//   {dialogConfig.actions && (
//     <DialogActions
//       sx={{
//         paddingTop: '4px', // Gap reduce between content and actions
//         paddingBottom: '8px',
      
//       }}
//     >
//       {dialogConfig.actions.map((action, idx) => (
//         <Button
//           key={idx}
//           onClick={action.onClick}
//           color={action.color || 'primary'}
//           sx={{
//             padding: '4px 8px', // Reduce padding inside button
//             minHeight: '30px', // Reduce button height
//             fontSize: '12px', // Smaller font size
//           }}
//         >
//           {action.label}
//         </Button>
//       ))}
//     </DialogActions>
//   )}
//           </>
//         )}
//       </Dialog>
//     </DialogContext.Provider>
//   );
// };

// // Custom Hook
// export const useDialog = () => useContext(DialogContext);


export const DialogProvider = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    type: '', // 'loading', 'message', or 'success'
    title: '',
    message: '',
    actions: null,
  });

  const showDialog = ({ type, title, message, actions }) => {
    setDialogConfig({ open: true, type, title, message, actions });
    console.log('showDialog called with params:', { type, title, message, actions });
  };

  const hideDialog = () => {
    setDialogConfig({ ...dialogConfig, open: false });
  };


  const renderDialogContent = () => {
    switch (dialogConfig.type) {
      case 'loading':
        return (
          <Box display="flex" flexDirection="column" alignItems="center" p={3} textAlign="center">
            <CircularProgress />
            <p className="text-xs text-gray-400">{dialogConfig.message}</p>
          </Box>
        );
      case 'success':
        return (
          <Box display="flex" flexDirection="row" alignItems="center" p={3} textAlign="center">
            <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData: successAnimation,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={50}
              width={50}
            />
            <p className="text-sm text-gray-400">{dialogConfig.message || 'Success'}</p>
          </Box>
        );
      default:
        return (
          <>
            <DialogTitle id="dialog-title" sx={{ paddingBottom: '8px' }}>
              {dialogConfig.title}
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: '8px', paddingTop: '8px' }}>
              <p className="text-xs text-gray-400">{dialogConfig.message}</p>
            </DialogContent>
            {dialogConfig.actions && (
              <DialogActions
                sx={{
                  paddingTop: '4px',
                  paddingBottom: '8px',
                }}
              >
                {dialogConfig.actions.map((action, idx) => (
                  <Button
                    key={idx}
                    onClick={action.onClick}
                    color={action.color || 'primary'}
                    sx={{
                      padding: '4px 8px',
                      minHeight: '30px',
                      fontSize: '12px',
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </DialogActions>
            )}
          </>
        );
    }
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      <Dialog
        open={dialogConfig.open}
        onClose={hideDialog}
        TransitionComponent={Transition} // Add transition for smooth open/close
        maxWidth={dialogConfig.type === 'loading' || dialogConfig.type === 'success' ? 'xs' : false}
        sx={{
          '.MuiDialog-paper': {
            backgroundColor: '#000000', // Black background for all types
            minHeight: dialogConfig.type === 'loading' || dialogConfig.type === 'success' ? 'unset' : '50px',
            minWidth: dialogConfig.type === 'loading' || dialogConfig.type === 'success' ? 'unset' : '250px',
            color: '#ffffff', // White text color for contrast
            opacity: dialogConfig.open ? 1 : 0, // Ensure opacity transitions smoothly
            visibility: dialogConfig.open ? 'visible' : 'hidden', // Ensure visibility transitions smoothly
          },
        }}
        aria-labelledby="dialog-title"
      >
        {renderDialogContent()}
      </Dialog>
    </DialogContext.Provider>
  );
};

// Custom Hook
export const useDialog = () => useContext(DialogContext);