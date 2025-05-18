import styled from "styled-components"
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.header`
    text-align: center;
    height: 3rem;
    border-bottom: 1px solid #f3f4f6;
    font-size: 40px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 1rem;
    background-color: blue;
`;

const StyledTitle = styled.div`
    flex: 1;
    text-align: center;
    margin-left: 10rem;
`;

const StyledButtonDiv = styled.div`
    margin-left: auto;
    margin-bottom: 13px;
`;

const StyledButton = styled.button`
    border-radius: 10px;
    height: 30px;
    color: black;
    font-weight: bold;
    font-size: 15px;
    background-color: white;
    cursor: pointer;
    border: none;
    width: 100px;
    transition: background-color 0.5s ease;

    &:hover {
        background-color: gray;
        transform: scale(1.1);
    }
`

function Home() {
    const navigate = useNavigate()

    function handleRegister() {
        navigate("/register");
    }

    function handleLogin() {
        navigate("/login")
    }

    return (
        <StyledHeader>
            <StyledTitle>TV SHOWS</StyledTitle>
            <StyledButtonDiv>
                <StyledButton onClick={handleRegister}>Register</StyledButton>
                <StyledButton onClick={handleLogin}>Login</StyledButton>
            </StyledButtonDiv>
        </StyledHeader>
    )
}

export default Home;