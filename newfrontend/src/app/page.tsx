'use client'
import styled from "styled-components";
import Link from "next/link";
import { Box, Button } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { blue } from "@mui/material/colors";
import {useNavigate} from "react-router-dom"

const StyledHeader = styled.header`
  background-color: blue;
  text-align: center;
  font-size: 45px;
  height: 70px;
`;

export default function Home() {

  return (
    <div style={{backgroundColor: "white", height: "100vh", width: "100vw", color: "black"}}>
        <StyledHeader>
          <h1>TV SHOWS</h1>
          <Link href="/register">
            <Button colorPalette="blue" color="black">Register</Button>
          </Link>
          <Link href="/login">
            <Button colorPalette="blue" color="black">Login</Button>
          </Link>
        </StyledHeader>
    </div> 
  );
}
