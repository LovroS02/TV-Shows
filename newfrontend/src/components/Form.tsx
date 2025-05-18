'use client'

// import { Button, Card, Field, Input, Stack } from "@chakra-ui/react"

// export const Form = ({handleSubmit}: {handleSubmit: any}) => (
//   <Card.Root maxW="sm">
//     <form onSubmit={handleSubmit}>
//         <Card.Header>
//         <Card.Title>Register</Card.Title>
//         <Card.Description>
//             Fill in the form below to create an account
//         </Card.Description>
//         </Card.Header>
//         <Card.Body>
//         <Stack gap="4" w="full">
//             <Field.Root>
//             <Field.Label>First Name</Field.Label>
//             <Input name="firstname"/>
//             </Field.Root>
//             <Field.Root>
//             <Field.Label>Last Name</Field.Label>
//             <Input name="lastname"/>
//             </Field.Root>
//             <Field.Root>
//             <Field.Label>Email</Field.Label>
//             <Input name="email"/>
//             </Field.Root>
//             <Field.Root>
//             <Field.Label>Password</Field.Label>
//             <Input name="password"/>
//             </Field.Root>
//         </Stack>
//         </Card.Body>
//         <Card.Footer justifyContent="flex-end">
//         <Button variant="outline" type="submit">Cancel</Button>
//         <Button variant="solid" type="submit">Register</Button>
//         </Card.Footer>
//     </form>
//   </Card.Root>
// )

import styled from "styled-components"

const StyledForm = styled.form`
    background-color: grey;
    border: 1px solid black;
    width: 80rem;
    overflow: hidden;
    border-radius: 7px;
`;

export default StyledForm;
