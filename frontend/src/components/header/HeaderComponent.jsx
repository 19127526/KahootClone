import React from "react";
import {Box, Flex, Text, Button, Stack} from "@chakra-ui/react";

import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Dropdown, message} from "antd";
import {logoutAccount} from "../../pages/login/LoginPages.actions";
import Notification from "../notification/Notification";
import * as constraintNotification from "../notification/Notification.constraints"
const NavBar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const data = useSelector(state => state.loginPage);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    return (
        <NavBarContainer {...props}>
            <img className="image-header" onClick={() => navigate("/home")}/>
            <MenuToggle toggle={toggle} isOpen={isOpen}/>
            <MenuLinks isOpen={isOpen} data={data}/>
        </NavBarContainer>
    );
};

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
            fill="white"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);


const MenuIcon = () => (
    <svg
        width="24px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
    >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
    </svg>
);

const MenuToggle = ({toggle, isOpen}) => {
    ;
    return (
        <Box display={{base: "block", md: "none"}} onClick={toggle}>
            {isOpen ? <CloseIcon/> : <MenuIcon/>}
        </Box>
    );
};

const MenuItem = ({children, isLast, to = "/", ...rest}) => {

    return (
        <Link to={to}>
            <Text display="block" {...rest}>
                {children}
            </Text>
        </Link>
    );
};

const items = [
    {
        label: <Button block style={{background:"transparent"}}>
            Log out
        </Button>,
        key: '0',
    }
]






const MenuLinks = ({data, isOpen}) => {
    const dispatch=useDispatch();
    const handleMenuClick = (e) => {
        if(e.key==0){
            dispatch(logoutAccount());
            Notification("Thông báo đăng xuất", "Đăng xuất thành công",constraintNotification.NOTIFICATION_SUCCESS)
        }
        // console.log('click', e);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <Box
            display={{base: isOpen ? "block" : "none", md: "block"}}
            flexBasis={{base: "100%", md: "auto"}}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <MenuItem to="/">Home</MenuItem>
                <MenuItem to="/group">Group</MenuItem>
                <MenuItem to="/profile">Profile</MenuItem>
                {data.isLogin &&localStorage.getItem("accessToken") ? <div>
                        <Dropdown menu={menuProps}>
                            {data.profile["imageUrl"] != null ?
                                <Avatar src={data.profile["imageUrl"]} size={"large"}/> :
                                <Avatar size={"large"} style={{backgroundColor: '#87d068'}}>
                                    {data.profile.picture}
                                </Avatar>}
                        </Dropdown>

                </div> : <div>
                    {/*<MenuItem to="/register" isLast >*/}
                    {/*  <Button*/}
                    {/*      size="sm"*/}
                    {/*      rounded="md"*/}
                    {/*      color={["primary.1000", "primary.1000", "white", "white"]}*/}
                    {/*      bg={["primary.1001", "primary.1001", "primary.1000", "primary.1000"]}*/}
                    {/*      _hover={{*/}
                    {/*        bg: ["primary.100", "primary.100", "primary.600", "primary.600"]*/}
                    {/*      }}*/}
                    {/*  >*/}
                    {/*    Create Account*/}
                    {/*  </Button>*/}
                    {/*</MenuItem>*/}
                    <MenuItem to="/login" isLast>
                        <Button
                            size="sm"
                            rounded="md"
                            color={["primary.1000", "primary.1000", "white", "white"]}
                            bg={["primary.1001", "primary.1001", "primary.1000", "primary.1000"]}
                            _hover={{
                                bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                            }}
                            ps={8}
                            pe={8}

                        >
                            Sign in
                        </Button>
                    </MenuItem>
                </div>}

            </Stack>
        </Box>
    );
};

const NavBarContainer = ({children, ...props}) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            pt={3}
            pb={2}
            ps={4}
            pe={4}
            bg={["primary.1000", "primary.1000", "white", "white"]}
            color={["white", "white", "primary.1000", "primary.1000"]}
            {...props}
        >
            {children}
        </Flex>
    );
};

export default NavBar;
