import { Box, Button, Container, Typography, Link, Grid2, Paper } from "@mui/material";
import { styled } from '@mui/system'; // Import styled from MUI System
import BluuCard from "../components/BluuCard";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export default function MUIComponentsTest() {
  return (
    <>
      <Container>
      <Typography variant="h1">Container</Typography>
      <Typography variant="body1">
        Container 
        <br />
        • Purpose: A Container is primarily used to create consistent horizontal padding on the sides of your content. It ensures that the content doesn’t span the entire width of the screen on larger viewports.
        <br />
        • Responsive behavior: It automatically adjusts its width based on the screen size (e.g., smaller width on mobile, wider on desktop) to provide a more readable experience.
        <br />
        • Common use case: Wrapping the main content of a page to center it and give it proper margins/padding.
      </Typography>
      <Typography variant="body1">
        Learn more about the <Link href="https://mui.com/material-ui/react-container/" target="_blank" rel="noopener">Container</Link> component.
      </Typography>
      <Box>
        <Typography variant="h2" color="secondary">Box</Typography>
        <Button>Button</Button>
        {/* Assuming ToggleColorMode is a custom component */}
      </Box>


      <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={3}>
        <Grid2 size="grow">
          <Item>size=grow</Item>
        </Grid2>
        <Grid2 size={6}>
          <Item>size=6</Item>
        </Grid2>
        <Grid2 size="grow">
          <Item>size=grow</Item>
        </Grid2>
      </Grid2>
    </Box>

    <BluuCard />
    </Container>
    </>
  );
}