import styled from "styled-components"
import { useEffect, useState } from "react"

const StyledButton = styled.button`
    width: 195px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    height: 25px;
    background-color: #e5e6e5;
    transition: all 0.5s ease;

    &:hover {
        background-color: #b4b4b4;
        transform: translateY(4px);
    }
`

const StyledAddButton = styled.button`
    background-color: lightblue;
    text-align: center;
    width: 195px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    height: 35px;

    &:hover {
        background-color: #7db5c7;
    }
`

function Sidebar({handleClick}) {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        async function getShows() {
            const response = await fetch("http://localhost:8080/shows", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if(!response.ok) {
                const res = await response.json();
                alert(res.error)
                throw new Error("Error while getting shows")
		    }

            const result = await response.json();
            setShows(result);
        }

        getShows();
    }, [])

    return (
        <div
        style={{
          width: '200px',
          height: '90vh',
          backgroundColor: '#e5e6e5',
          color: 'black',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ marginTop: 0 }}>Shows</h2>
        <ul style={{ listStyle: 'none', padding: 0, gap: '100px'}}>
          {/* <li style={{ margin: '10px 0' }}></li>
          <li style={{ margin: '10px 0' }}></li>
          <li style={{ margin: '10px 0' }}></li> */}
          {shows.map(s => <StyledButton onClick={() => handleClick(s)} key={s.title}>{s.title}</StyledButton>)}
        </ul>
        <StyledAddButton>+ Add shows</StyledAddButton>
      </div>
    )
}

export default Sidebar
