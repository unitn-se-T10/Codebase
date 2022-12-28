import {
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "@chakra-ui/icons";
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
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "components/chakraNextLink";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

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
const UserMenu: React.FC<{ user }> = ({ user }) => {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton as={Button} minW={0} rounded="full" variant="link">
        <Avatar
          size="sm"
          src="https://avatars.dicebear.com/api/male/username.svg"
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar
            size="2xl"
            src="https://avatars.dicebear.com/api/male/username.svg"
          />
        </Center>
        <br />
        <Center>
          <p>{user.name}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem onClick={() => router.push("http://localhost:3000/utente/1")}>
          Il mio profilo
        </MenuItem>
        {/*<MenuItem onClick={() => router.push("/page2")}>Page 2</MenuItem>
        <MenuItem onClick={() => router.push("/page3")}>Page 3</MenuItem>
        */}
        <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
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
    { href: "/ristoranti", text: "Ristoranti" },
    { href: "/page2", text: "Page 2" },
    { href: "/page3", text: "Page 3" },
    { href: "/page4", text: "Page 4" },
  ];

  return (
    <Stack {...props}>
      {links.map(({ href, text }) => (
        <Link href={href} variant="ghostText" key={href}>
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
          {/*
          <IconButton
            {...menu.getButtonProps()}
            display={{ lg: "none" }}
            icon={menu.isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={() => {
              menu.onToggle();
              searchbar.onClose();
            }}
          />
          */}
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={75} height={75} />
          </Link>
          {/*
          <Box display={{ base: "none", lg: "flex" }} px={3}>
            <PagesList direction="row" spacing={6} />
          </Box>
          */}
        </Flex>
        <HStack spacing={3}>
          {/*
        
          <IconButton
            aria-label="toggleColorMode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            isRound
            onClick={toggleColorMode}
            variant="ghost"
          />

          <IconButton
            {...searchbar.getButtonProps()}
            display={{ md: "none" }}
            icon={searchbar.isOpen ? <CloseIcon /> : <SearchIcon />}
            onClick={() => {
              searchbar.onToggle();
              menu.onClose();
            }}
          />

          <Box display={{ base: "none", md: "flex" }}>
            <Searchbar />
          </Box>
        */}
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
