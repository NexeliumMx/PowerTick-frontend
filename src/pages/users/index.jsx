import { Box } from "@mui/material";
import UsersTable from "./components/UsersTable";
import Header from "../../components/ui/Header";

const Users = () => {
  return (
    <Box m="20px">
      <Header title="MANAGE USERS" subtitle="Managing the Users and Roles" />
      <UsersTable />
    </Box>
  );
};

export default Users;
