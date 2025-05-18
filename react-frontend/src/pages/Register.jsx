import styled from "styled-components"
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const StyledRegistration = styled.div`
    display: flex;
    flex-direction: column;
    height: 450px;
    width: 350px;
    /* background-color: blue; */
    border-radius: 10px;
    border: 1px solid black;
    margin-left: 525px;
    margin-top: 50px;
    gap: 10px;
    align-items: center;
    text-align: center;
`;

const StyledDiv = styled.div`

`

const StyledHeader = styled.header`
    background-color: blue;
    height: 50px;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    padding-top: 5px;
`

const StyledInput = styled.input`
    height: 50px;
    width: 250px;
    font-size: 20px;
`;

const StyledButton = styled.button`
    background-color: blue;
    color: black;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    height: 40px;
    width: 100px;
    transition: background-color 0.5s ease;
    cursor: pointer;
    margin-bottom: 5px;

    &:hover {
        background-color: #368ae4;
    }
`;

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [token, setToken] = useState("");
    let accessToken = ""

    async function handleSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: name,
            surname: surname,
            email: email,
            password: password
        }

        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            })

            if(!response.ok) {
                const res = await response.json();
                alert(res.error)
                throw new Error("Error while registering")
            }

            const result = await response.json();
            console.log("Result: ", result);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }

        // try {
        //     const response = await fetch("http://localhost:8080/get-token", {
        //         method: "GET",
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
            
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
            
        //     const result = await response.json();
        //     accessToken = result.access_token
        //     setToken(result.access_token);
        // } catch (error) {
        //     console.log("Error while fetching token!!!");
        // }

        // try {
        //     const response2 = await fetch("http://localhost:8080/register", {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${accessToken}`
        //         },
        //         body: JSON.stringify(newUser)
        //     });

        //     if (!response2.ok) {
        //         const res = await response2.json();
        //         alert(res.error);
        //         throw new Error(`HTTP error! status: ${response2.status}`);
        //     };

        //     const result2 = await response2.json();
        //     console.log("result: " + result2);
        // } catch (err) {
        //     console.log("Error: ", err);
        // }
    }

    return (
        <StyledDiv>
            <StyledHeader>
                Registration
            </StyledHeader>
            <form onSubmit={handleSubmit}>
                <StyledRegistration>
                    <h1>Complete the form</h1>
                    <StyledInput type="text" placeholder="First name" value={name} onChange={e => setName(e.target.value)} required></StyledInput>
                    <StyledInput type="text" placeholder="Last name" value={surname} onChange={e => setSurname(e.target.value)} required></StyledInput>
                    <StyledInput type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required></StyledInput>
                    <StyledInput type={visible ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required></StyledInput>
                    <p>Password needs to have at least 10 characters and 1 number!</p>
                    <button type="button" onClick={() => setVisible(!visible)}>
                        <FaRegEyeSlash/>
                    </button>
                    <StyledButton type="submit">Register</StyledButton>
                </StyledRegistration>
            </form>
            <Link to="/login" style={{margin: "600px"}}>Already have an account? Login</Link>
        </StyledDiv>
    )
}

export default Register
