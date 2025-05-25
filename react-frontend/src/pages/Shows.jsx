import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

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
    align-items: center;
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

const StyledDeleteButton = styled.button`
    background-color: red;
    text-align: center;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    height: 30px;
    width: 150px;
    font-size: large;
    font-weight: bold;

    &:hover {
        background-color: #b80000;
    }
`;

const MasterForm = styled.form`
    /* border: 1px solid black; */
    width: 600px;
    text-align: center;
    font-size: small;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const GroupForm = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: center;
    align-items: center;
`;

const StyledInput = styled.input`
    width: 300px;
    height: 20px;
    font-size: 15px;
    padding: 5px 10px;
    border-radius: 5px;

    &:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
`;

const StyledLabel = styled.label`
    font-size: 20px;
`;

const ButtonComponent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: 50px;
    text-align: center;
    justify-content: center;
`;

const StyledButtonSave = styled.button`
    border-radius: 5px;
    border: none;
    cursor: pointer;
    height: 30px;
    width: 100px;
    font-size: large;
    font-weight: bold;
    background-color: green;

    &:hover {
        background-color: #016901;
    }
`;

function Shows() {
	const [shows, setShows] = useState([]);
	const [isShows, setIsShows] = useState(false);
    const [isAddingShow, setIsAddingShow] = useState(false);
	const navigate = useNavigate();
    const dialogRef = useRef(null);

    const openDialog = () => {
        if (dialogRef.current) dialogRef.current.showModal();
    };
    const closeDialog = () => {
        if (dialogRef.current) dialogRef.current.close();
    };

    const [newShow, setNewShow] = useState({
        title: "",
        details: {
            author: "",
            genre: "",
            release_date: "",
            description: "",
            image: "https://fakeimg.pl/200x300"
        },
    });

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

    function handleClickAddShow() {
        setIsAddingShow(!isAddingShow);
    }

    async function handleSubmit(e) {
        // e.preventDefault();
        const response = fetch(`http://localhost:8080/shows`, {
            method: "POST",
            headers: {
				'Content-Type': 'application/json',
			},
            body: JSON.stringify(newShow)
        });

        if(!response.ok) {
            const res = await response.json();
            throw new Error("Error while adding show");
        }

        const result = await response.json();

        closeDialog();
    }

    function handleChange(e) {
        const { name, value } = e.target;

        if (["author", "genre", "release_date", "description"].includes(name)) {
            setNewShow({
            ...newShow,
            details: {
                ...newShow.details,
                [name]: value,
            },
            });
        } else {
            setNewShow({ ...newShow, [name]: value });
        }
    }

    return (
        <div>
            <StyledHeader>
                Shows
                <StyledButton onClick={openDialog}>Add show</StyledButton>
            </StyledHeader>
            <dialog ref={dialogRef}>
                <button onClick={closeDialog} style={{ position: 'absolute', top: 8, right: 8 }}>X</button>
                <MasterForm onSubmit={handleSubmit}>
                    <h2>Add show: </h2>
                    <GroupForm>
                        <StyledLabel>Title: </StyledLabel>
                        <StyledInput type="text" name="title" value={newShow.title} onChange={handleChange} required/>
                    </GroupForm>
                    <GroupForm>
                        <StyledLabel>Author: </StyledLabel>
                        <StyledInput type="text" name="author" value={newShow.details.author} onChange={handleChange} required/>
                    </GroupForm>
                    <GroupForm>
                        <StyledLabel>Genre: </StyledLabel>
                        <StyledInput type="text" name="genre" value={newShow.details.genre} onChange={handleChange} required/>
                    </GroupForm>
                    <GroupForm>
                        <StyledLabel>Release date: </StyledLabel>
                        <StyledInput type="text" name="release_date" value={newShow.details.release_date} onChange={handleChange} required/>
                    </GroupForm>
                    <GroupForm>
                        <StyledLabel>Description: </StyledLabel>
                        <StyledInput type="text" name="description" value={newShow.details.description} onChange={handleChange} required/>
                    </GroupForm>
                    <ButtonComponent>
                        <StyledButtonSave type="submit">Add show</StyledButtonSave>
                        {/* <StyledButtonDelete>Delete</StyledButtonDelete> */}
                    </ButtonComponent>
                </MasterForm>
            </dialog>
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
