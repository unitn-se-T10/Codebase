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
// import { ChakraNextImage } from "components/utils";
import { useRouter } from "next/router";
import { useState } from "react";
// import type { UserHook } from "lib/hooks";
// import type { User } from "lib/dbUser";

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

const UserMenu: React.FC<{ user /* : User */ }> = ({ user }) => {
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
          <p>{user.username}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem onClick={() => router.push("/page1")}>Page 1</MenuItem>
        <MenuItem onClick={() => router.push("/page2")}>Page 2</MenuItem>
        <MenuItem onClick={() => router.push("/page3")}>Page 3</MenuItem>
        <MenuItem onClick={() => router.push("/page4")}>Page 4</MenuItem>
      </MenuList>
    </Menu>
  );
};

const ShowLogin: React.FC<{ user? /* : UserHook  */ }> = ({ user }) => {
  // NOTE: This is needed otherwise next can't prender the page.
  if (!user) return null;

  const { data: userData, isLoading } = user;
  if (isLoading) return <Spinner />;

  return userData ? (
    <UserMenu user={userData} />
  ) : (
    <Link href="/login" variant="solid">
      Login
    </Link>
  );
};

const PagesList: React.FC<StackProps> = (props) => {
  const links = [
    { href: "/page1", text: "Page 1" },
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

const Navbar: React.FC<{ user? /* : UserHook  */ } & BoxProps> = ({
  user,
  ...rest
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const searchbar = useDisclosure();
  const menu = useDisclosure();

  return (
    <Box
      px={4}
      bg={useColorModeValue("yellow.300", "yellow.500")}
      shadow={useColorModeValue("xl", "xl-dark")}
      {...rest}
    >
      <Flex justify="space-between" h={16}>
        <Flex align="center" gap={2}>
          <IconButton
            {...menu.getButtonProps()}
            display={{ lg: "none" }}
            icon={menu.isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={() => {
              menu.onToggle();
              searchbar.onClose();
            }}
          />

          {/* <Link href="/"> */}
          {/*   <ChakraNextImage */}
          {/*     width="40px" */}
          {/*     height="40px" */}
          {/*     alt="duck" */}
          {/*     src="/images/duck.png" */}
          {/*   /> */}
          {/* </Link> */}

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

          <ShowLogin user={user} />
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
