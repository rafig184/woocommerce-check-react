
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function WithLoading(props: { isLoading: boolean, children: any }) {
  return (
    props.isLoading ?
      <Box sx={{ display: 'flex', paddingBottom: "9%" }}>
        <CircularProgress />
      </Box> : props.children
  );
}