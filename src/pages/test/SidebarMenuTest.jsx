import SidebarMenu from "../../components/ui/SidebarMenu";
import Topbar from "../../components/ui/Topbar";
import { Box } from '@mui/material';

const SidebarMenuTest = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box>
        <Topbar />
      </Box>

      <Box display="flex" flexGrow={1} height="100%">
        <SidebarMenu />
        <Box 
          sx={{ 
            flexGrow: 1, 
            backgroundColor: 'red', 
            width: '100%', 
            height: '100%' 
          }}
        >
          {/* Content for the red box */}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarMenuTest;