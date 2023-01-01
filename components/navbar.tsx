import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Center,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  StackProps,
  Text,
  useColorMode,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Session } from "next-auth";
import Link from "components/chakraNextLink";

const Searchbar: React.FC<BoxProps> = (props) => {
  const [search, setSearch] = useState("");

  return (
    <Box {...props}>
      <InputGroup size="md">
        <Input
          pr="6.5rem"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find a user..."
          type="search"
        />
        <InputRightElement w="6.5rem">
          <Button
            h="1.75rem"
            leftIcon={<SearchIcon />}
            onClick={() => console.log(search)}
            size="sm"
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

// TODO: set user type
const UserMenu: React.FC<{ user: Session["user"] }> = ({ user }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Menu>
      <MenuButton as={Button} minW={0} rounded="full" variant="link">
        {session?.user?.isGestore ? (
          <Avatar
            size="sm"
            src="https://avatars.dicebear.com/api/male/beard/white/surprised03/username.svg"
          />
        ) : (
          <Avatar
            size="sm"
            src="https://avatars.dicebear.com/api/male/username.svg"
          />
        )}
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <VStack>
            {session?.user?.isGestore ? (
              <Text fontSize={20} fontWeight="bold" textAlign="center">
                Gestore
              </Text>
            ) : (
              <Text fontSize={20} fontWeight="bold" textAlign="center">
                Cliente
              </Text>
            )}

            {session?.user?.isGestore ? (
              <Avatar
                size="2xl"
                src="https://avatars.dicebear.com/api/male/beard/white/surprised03/username.svg"
              />
            ) : (
              <Avatar
                size="2xl"
                src="https://avatars.dicebear.com/api/male/username.svg"
              />
            )}
          </VStack>
        </Center>
        <br />
        <Center>
          <p>{user.name}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem onClick={() => router.push("/utente")}>
          Il mio profilo
        </MenuItem>
        {session?.user?.isGestore ? (
          <MenuItem onClick={() => router.push("/utente/ristoranti")}>
            I miei ristoranti
          </MenuItem>
        ) : (
          <MenuItem onClick={() => router.push("/utente/preferiti")}>
            I miei preferiti
          </MenuItem>
        )}
        {session?.user?.isGestore ? (
          <MenuItem onClick={() => router.push("/utente/ordini")}>
            I miei ordini
          </MenuItem>
        ) : (
          <MenuItem onClick={() => router.push("/carrello")}>Carrello</MenuItem>
        )}
        <MenuItem
          onClick={
            () => {
              signOut();
              router.push("/");
            } // FIXME: redirect to homepage
          }
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const ShowLogin: React.FC = () => {
  const { data: session } = useSession();

  if (session === undefined) return <Spinner />;

  return session ? (
    <UserMenu user={session.user} />
  ) : (
    <Button onClick={() => signIn()}>Sign in</Button>
  );
};

const PagesList: React.FC<StackProps> = (props) => {
  const links = [
    // { href: "/ristoranti", text: "Ristoranti" },
    { href: "/api-doc", text: "API Doc" },
    // { href: "/page3", text: "Page 3" },
    // { href: "/page4", text: "Page 4" },
  ];

  return (
    <Stack {...props}>
      {links.map(({ href, text }) => (
        <Link href={href} variant="ghostText" key={href} color="white">
          {text}
        </Link>
      ))}
    </Stack>
  );
};

const Navbar: React.FC<BoxProps> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const searchbar = useDisclosure();
  const menu = useDisclosure();

  return (
    <Box
      px={4}
      bg={useColorModeValue("#be0b0b", "#640000")}
      shadow={useColorModeValue("xl", "xl-dark")}
      {...props}
    >
      <Flex justify="space-between" h={16}>
        <Flex align="center" gap={2}>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={75} height={75} />
          </Link>

          <Box display={{ base: "none", lg: "flex" }} px={3}>
            <PagesList direction="row" spacing={6} />
          </Box>
        </Flex>
        <HStack spacing={3}>
          <IconButton
            aria-label="toggleColorMode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            isRound
            onClick={toggleColorMode}
            variant="ghost"
          />
          <ShowLogin />
        </HStack>
      </Flex>
      <Collapse animateOpacity in={searchbar.isOpen}>
        <Box display={{ md: "none" }} pb={4}>
          <Searchbar />
        </Box>
      </Collapse>

      <Collapse animateOpacity in={menu.isOpen}>
        <Box display={{ lg: "none" }} pb={4}>
          <PagesList direction="column" spacing={3} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;
