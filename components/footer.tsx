import { ButtonGroup, Container, Stack, Text } from "@chakra-ui/react";
// import { SocialLink } from "components/utils";

const Footer: React.FC = () => {
  return (
    <Container as="footer" role="contentinfo" variant="footer">
      <Stack
        alignItems={{ base: "center", md: "center" }}
        justify={{ base: "center", md: "space-around" }}
        direction={{ base: "column", md: "row" }}
        py={4}
      >
        <Text>&copy; {new Date().getFullYear()} Hungry Everywhere</Text>
        <ButtonGroup variant="ghost">
          {/* <SocialLink */}
          {/*   social="instagram" */}
          {/*   href="" */}
          {/* /> */}
        </ButtonGroup>
      </Stack>
    </Container>
  );
};

export default Footer;
