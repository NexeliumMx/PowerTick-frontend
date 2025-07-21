import { Box, Button, Typography, Link } from "@mui/material";
import BluuCard from "../../components/test/BluuCard";
import { useTheme } from "@mui/material/styles";
import Header from "../../layout/Header";

export default function MUIComponentsTest() {
  const theme = useTheme();

  return (
    <>
      <Box m="20px">
      <Header title="TEST PAGE" subtitle="Bla bla bla" />
        <Typography variant="body1">
          <br />
          • Purpose: A Container is primarily used to create consistent
          horizontal padding on the sides of your content. It ensures that the
          content doesn’t span the entire width of the screen on larger
          viewports.
          <br />
          • Responsive behavior: It automatically adjusts its width based on the
          screen size (e.g., smaller width on mobile, wider on desktop) to
          provide a more readable experience.
          <br />• Common use case: Wrapping the main content of a page to center
          it and give it proper margins/padding.
        </Typography>
        <Typography variant="body1">
          Learn more about the{" "}
          <Link
            href="https://mui.com/material-ui/react-container/"
            target="_blank"
            rel="noopener"
          >
            Container
          </Link>{" "}
          component.
        </Typography>
        <Box>
          <Typography variant="h2" color="primary">
            Box
          </Typography>
          <Button>Button</Button>
          {/* Assuming ToggleColorMode is a custom component */}
        </Box>

        <BluuCard />

        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography variant="h6" color="textPrimary">
            This box uses the default background color!
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: theme.palette.background.paper, // Using your background paper color
            border: "1px solid black", // Adding a black border for identification
            padding: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" color="textPrimary">
            This box uses the background paper color!
          </Typography>
        </Box>
      </Box>
    </>
  );
}
