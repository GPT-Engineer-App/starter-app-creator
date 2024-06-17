import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} py={2}>
      <Flex align="center">
        <Heading as="h1" size="lg" color="white">
          Notes App
        </Heading>
        <Spacer />
        <Button as={Link} to="/" colorScheme="teal" variant="outline">
          Home
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;