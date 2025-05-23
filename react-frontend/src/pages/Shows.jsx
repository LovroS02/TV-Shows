import { useState } from "react"
import styled from "styled-components"
// import MasterDetail from "../components/MasterDetail"
import Sidebar from "../components/Sidebar"

const StyledMasterDetailHeader = styled.header`
    background-color: blue;
    height: 50px;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    padding-top: 5px;
`

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
`

const MainComponent = styled.div`
    display: flex;
`

const ContentComponent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const TopComponent = styled.div`
    height: 50%;
    background-color: #f9f9f9;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`

const BottomComponent = styled.div`
    height: 50%;
    background-color: #f9f9f9;
    padding: 20px;
    box-sizing: border-box;
`

const MasterForm = styled.form`
    border: 1px solid black;
    width: 600px;
    text-align: center;
    font-size: small;
    display: flex;
    flex-direction: column;
    /* gap: 5px; */
`

const GroupForm = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
`

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
`

const StyledLabel = styled.label`
    font-size: 20px;
`

function Shows() {
    const [isShows, setIsShows] = useState(false);
    const [show, setShow] = useState();
    const [showForm, setShowForm] = useState({
        title: "",
        details: {
            author: "",
            genre: "",
            release_date: "",
            description: "",
        },
        reviews: []
    });

    function handleClick(show) {
        // console.log("Show: ", show);
        setIsShows(true);
        setShow(show);
        setShowForm({title: show.title, details: {author: show.details.author, genre: show.details.genre, 
                    release_date: show.details.release_date, description: show.details.description}})
    }

    // function handleChange(e) {
    //     setShowForm({ ...showForm, [e.target.name]: e.target.value });
    // }

    function handleChange(e) {
        const { name, value } = e.target;

        if (["author", "genre", "release_date", "description"].includes(name)) {
            setShowForm({
            ...showForm,
            details: {
                ...showForm.details,
                [name]: value,
            },
            });
        } else {
            setShowForm({ ...showForm, [name]: value });
        }
    }

    return (
        <div>
            <StyledHeader>
                MasterDetail
                {/* <StyledButton onClick={handleShows}>Shows</StyledButton> */}
            </StyledHeader>
            <MainComponent>
                <Sidebar handleClick={handleClick}></Sidebar>
                {isShows && 
                <ContentComponent>
                    <TopComponent>
                        <MasterForm>
                            <h2>Edit show: {show.title}</h2>
                            {/* <p>SHOW</p> */}
                            {/* <hr style={{ border: 'none', borderTop: '2px solid black', width: '100%'}}/> */}
                            <GroupForm>
                                <StyledLabel>Title: </StyledLabel>
                                <StyledInput type="text" name="title" value={showForm.title} onChange={handleChange}/>
                            </GroupForm>
                            <GroupForm>
                                <StyledLabel>Author: </StyledLabel>
                                <StyledInput type="text" name="author" value={showForm.details.author} onChange={handleChange}/>
                            </GroupForm>
                            <GroupForm>
                                <StyledLabel>Genre: </StyledLabel>
                                <StyledInput type="text" name="genre" value={showForm.details.genre} onChange={handleChange}/>
                            </GroupForm>
                            <GroupForm>
                                <StyledLabel>Release date: </StyledLabel>
                                <StyledInput type="text" name="release_date" value={showForm.details.release_date} onChange={handleChange}/>
                            </GroupForm>
                            <GroupForm>
                                <StyledLabel>Description: </StyledLabel>
                                <StyledInput type="text" name="description" value={showForm.details.description} onChange={handleChange}/>
                            </GroupForm>
                        </MasterForm>
                    </TopComponent>
                    <hr />
                    <BottomComponent></BottomComponent>
                </ContentComponent>
                }
            </MainComponent>
        </div>
    )
}

export default Shows;