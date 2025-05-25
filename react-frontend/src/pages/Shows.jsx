import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledHeader = styled.header`
    background-color: #e5e6e5;
    height: 50px;
    font-size: 40px;
    color: black;
    font-weight: bold;
    text-align: center;
    /* padding-top: 5px; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
`;

const StyledShowsDiv = styled.div`
    height: 92vh;
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 4 cards per row */
    grid-template-rows: repeat(2, auto); /* 2 rows */
`;

const StyledShowCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid black; */

`;

const StyledTitle = styled.p`
    text-align: center;
`;

const StyledImage = styled.img`
    height: 200px;
    width: 150px;
`;

const StyledButton = styled.button`
    background-color: green;
    text-align: center;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    height: 30px;
    width: 150px;
    font-size: large;
    font-weight: bold;

    &:hover {
        background-color: #016901;
    }
`;

function Shows() {
	const [shows, setShows] = useState([]);
	const [isShows, setIsShows] = useState(false);
	const navigate = useNavigate();

    function handleClick(show) {
        navigate(`/masterDetail/${show.idShow}`, {state: {show}})
    }

	async function getShows() {
		const response = await fetch('http://localhost:8080/shows', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const res = await response.json();
			alert(res.error);
			throw new Error('Error while getting shows');
		}

		const result = await response.json();
		setShows(result.data);
		console.log(result.data);
		setIsShows(true);
	}

	useEffect(() => {
		getShows();
	}, []);

    return (
        <div>
            <StyledHeader>
                Shows
                {/* <StyledButton onClick={handleShows}>Shows</StyledButton> */}
            </StyledHeader>
            {isShows ? 
            <StyledShowsDiv>
                {shows.map(s => 
                <StyledShowCard onClick={() => handleClick(s)} key={s.title}>
                    <StyledTitle>{s.title}</StyledTitle>
                    <StyledImage key={s.title} src={s.details.image}></StyledImage>
                </StyledShowCard>)}
            </StyledShowsDiv>
             : <div>Loading shows...</div>}
        </div>
    )
}

export default Shows;
