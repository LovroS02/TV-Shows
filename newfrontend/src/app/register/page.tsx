'use client'
// import { Form } from "@/components/Form";
import { Flex } from "@chakra-ui/react";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";
import React from "react";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    height: 100vh;
    width: 100vw;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled.input`
    margin-bottom: 15px; 
    padding: 15px; 
    border: 1px solid #ccc; 
    border-radius: 4px; 
    font-size: 16px; 
`;

const StyledButton = styled.button`
    color: white;
    /* background-color: #312e81; */
    background-color: blue;
    font-size: 20px;
    padding: 1rem 1.5rem;
    border-radius: 10%;
    border: none;
    text-align: center;
`;

export default function Register() {
     function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        console.log("Form submitted:", form);
        const formData = Object.fromEntries(form.entries());
        console.log(formData);
    }    

    return (
        <StyledDiv>
            <h1 style={{color: "black", fontSize: "30px"}}>Complete the form</h1>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput type="text" name="firstname" placeholder="First name" required/>
                <StyledInput type="text" name="lastname" placeholder="Last name" required/>
                <StyledInput type="text" name="email" placeholder="Email" required/>
                <StyledInput type="text" name="password" placeholder="Password" required/>
                <StyledButton type="submit">Register</StyledButton>
                
            </StyledForm>
        </StyledDiv>
    );
}