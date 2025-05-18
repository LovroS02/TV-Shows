import styled from "styled-components"
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StyledRegistration = styled.div`
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 350px;
    /* background-color: blue; */
    border-radius: 10px;
    border: 1px solid black;
    margin-left: 525px;
    margin-top: 50px;
    gap: 10px;
    align-items: center;
    text-align: center;
    justify-content: center;
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

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const newLoginUser = {
            email: email,
            password: password
        }
        
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newLoginUser)
            })

            if(!response.ok) {
                const res = await response.json();
                alert(res.error);
                throw new Error("Error while logging");
            }

            const result = await response.json();
            console.log("Result: ", result);
            navigate("/shows")

        } catch (err) {
            console.log("Error: ", err);
        }
    }

    return (
       <StyledDiv>
            <StyledHeader>
                Login
            </StyledHeader>
            <form onSubmit={handleSubmit}>
                <StyledRegistration>
                    <h1>Complete the form</h1>
                    <StyledInput type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required></StyledInput>
                    <StyledInput type={visible ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required></StyledInput>
                    <p>Password needs to have at least 10 characters and 1 number!</p>
                    <button type="button" onClick={() => setVisible(!visible)}>
                        <FaRegEyeSlash/>
                    </button>
                    <StyledButton type="submit">Login</StyledButton>
                </StyledRegistration>
            </form>
            <Link to="/register" style={{margin: "600px"}}>Don't have an account? Register</Link>
        </StyledDiv>
    )
}

export default Login
