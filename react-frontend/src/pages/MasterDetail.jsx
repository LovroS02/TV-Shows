import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import MasterDetail from "../components/MasterDetail"
// import Sidebar from "../components/Sidebar"
import { useParams, useNavigate } from 'react-router-dom';

// const StyledMasterDetailHeader = styled.header`
//     background-color: blue;
//     height: 50px;
//     font-size: 40px;
//     font-weight: bold;
//     text-align: center;
//     padding-top: 5px;
// `

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

const MainComponent = styled.div`
    display: flex;
`;

const ContentComponent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const TopComponent = styled.div`
    height: 50%;
    background-color: #f9f9f9;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`;

const BottomComponent = styled.div`
    height: 50%;
    background-color: #f9f9f9;
    padding: 20px;
    box-sizing: border-box;
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
    width: 70px;
    font-size: large;
    font-weight: bold;
    background-color: green;

    &:hover {
        background-color: #016901;
    }
`;

const ReviewsDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const DetailForm = styled.form`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const StyledButtonEdit = styled.button`
    text-align: center;
    background-color: yellow;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    height: 30px;
    width: 70px;
    font-size: large;
    font-weight: bold;

    &:hover {
        background-color: #c6c600;
    }
`;

const StyledButtonDelete = styled.button`
    text-align: center;
    background-color: red;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    height: 30px;
    width: 70px;
    font-size: large;
    font-weight: bold;

    &:hover {
        background-color: #bc0101;
    }
`;

const StyledReviewHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;
    /* justify-content: center; */
    align-items: center;
`;

const StyledButtonAddReview = styled.button`
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

const StyledAddReviewForm = styled.form`
    width: 500px;
    height: 350px;
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const GoBackButton = styled.button`
    background-color: blue;
    text-align: center;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    height: 30px;
    width: 150px;
    font-size: large;
    font-weight: bold;

    &:hover {
        background-color: #5555fa;
    }
`;

function MasterDetail() {
	const navigate = useNavigate();
	const [isShows, setIsShows] = useState(false);

	const [reviews, setReviews] = useState();

	const { idShow } = useParams();

	const [isAddReviewForm, setIsAddReviewForm] = useState(false);

	const [editingReviewId, setEditingReviewId] = useState(null);
	const [editingReviewData, setEditingReviewData] = useState({ comment: '', grade: '' });

    const [showForm, setShowForm] = useState({
        idShow: "",
        title: "",
        details: {
            author: "",
            genre: "",
            release_date: "",
            description: "",
            image: "https://fakeimg.pl/200x300"
        },
        reviews: []
    });

	const [newReview, setNewReview] = useState({
		idReview: '',
		comment: '',
		grade: '',
	});

	useEffect(() => {
		async function getShow() {
			const tempIdShow = parseInt(idShow);
			const response = await fetch(`http://localhost:8080/shows/${tempIdShow}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const res = await response.json();
				// alert(res.error)
				throw new Error('Error while getting show');
			}

			const result = await response.json();
			const show = result.data;

            setShowForm({
                idShow: show.idShow,
                title: show.title,
                details: {
                    author: show.details.author,
                    genre: show.details.genre,
                    release_date: show.details.release_date,
                    description: show.details.description,
                    image: show.details.image
                },
                reviews: show.reviews
            });
        }
        getShow();
        setIsShows(true);
    }, [idShow]);

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

	function handleReviewChange(e) {
		const { name, value } = e.target;

		setNewReview(prev => ({ ...prev, [name]: value }));
	}

    async function handleDelete(idToDelete) {
        

		const response = await fetch(`http://localhost:8080/shows/${showForm.idShow}/reviews/${idToDelete}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const res = await response.json();
			throw new Error('Error while deleting a review!');
		}

        const result = await response.json();
        // setReviews(prevReviews => prevReviews.filter(r => r.idReview !== idToDelete))
        setShowForm({...showForm, 
            reviews: showForm.reviews.filter(review => review.idReview !== idToDelete)
        });
    }

    async function handleSubmit(e) {
        const { image, ...detailsClean } = showForm.details;
            const withoutImage = { 
            ...showForm, 
            details: detailsClean 
        };
        e.preventDefault();

        const response = await fetch(`http://localhost:8080/shows/${showForm.idShow}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(withoutImage)
        });

		if (response.status === 500) {
			throw new Error('Error');
		}

		const result = await response.json();
		console.log('Saving changes for show: ', result);
	}

	function handleAddReview() {
		setIsAddReviewForm(!isAddReviewForm);
	}

    async function handleSaveReview(e) {
        
        e.preventDefault();
        let idReview = (showForm.reviews.length) + 1;
        // setNewReview(prev => ({
        //     ...prev, idReview: idReview
        // }))
        const reviewToAdd = {...newReview, idReview};

		const response = await fetch(`http://localhost:8080/shows/${showForm.idShow}/reviews`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ review: reviewToAdd }),
		});

		if (!response.ok) {
			throw new Error('Error while putting new review!');
		}

        const result = await response.json();
        // setReviews(prev => [...prev, reviewToAdd]);
        setShowForm({
            ...showForm,
            reviews: result.data
        });

		setIsAddReviewForm(false);
	}

	function handleGoBack() {
		navigate('/shows');
	}

	function handleEditReview(review) {
		setEditingReviewId(review.idReview);
		setEditingReviewData({ comment: review.comment, grade: review.grade });
	}

	function handleEditReviewChange(e) {
		const { name, value } = e.target;
		setEditingReviewData(prev => ({ ...prev, [name]: value }));
	}

    async function handleEditReviewSave(e, idReview) {
        
        e.preventDefault();

		const response = await fetch(`http://localhost:8080/shows/${showForm.idShow}/reviews/${idReview}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ review: { idReview, ...editingReviewData } }),
		});

		if (!response.ok) {
			throw new Error('Error while editing review!');
		}

		const result = await response.json();

        setShowForm({
            ...showForm,
            reviews: result.data
        });

		setEditingReviewId(null);
		setEditingReviewData({ comment: '', grade: '' });
	}

    async function handleDeleteShow(e) {
        e.preventDefault()
        const response = await fetch(`http://localhost:8080/shows/${showForm.idShow}`, {
            method: "DELETE",
            headers: {
				'Content-Type': 'application/json',
			},
        })

        if(!response.ok) {
            const res = await response.json();
            throw new Error("Error while adding show");
        }

        const result = await response.json();

        navigate("/shows");
    }

    return (
        <div>
            <StyledHeader>
                MasterDetail
                {/* <StyledButton onClick={handleShows}>Shows</StyledButton> */}
            </StyledHeader>
            {isShows && 
            <ContentComponent>
                <TopComponent>
                    <MasterForm onSubmit={handleSubmit}>
                        <h2>Edit show: {showForm.title}</h2>
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
                        <ButtonComponent>
                            <StyledButtonSave type="submit" >Save</StyledButtonSave>
                            <StyledButtonDelete onClick={handleDeleteShow}>Delete</StyledButtonDelete>
                        </ButtonComponent>
                    </MasterForm>
                    
                        <img src={showForm.details.image} alt="https://fakeimg.pl/200x300" style={{height: "300px", width: "200px", objectFit: "cover", borderRadius: "5px"}}></img>
                    
                </TopComponent>
                <hr />
                <BottomComponent>
                    {!isAddReviewForm ? 
                    <ReviewsDiv>
                        <StyledReviewHeader>
                            <h2>Reviews</h2>
                            <StyledButtonAddReview onClick={handleAddReview}>Add review</StyledButtonAddReview>
                        </StyledReviewHeader>
                        <GroupForm style={{justifyContent: "flex-start", gap: "160px", backgroundColor: "#e5e6e5"}}>
                            <StyledLabel>ID</StyledLabel>
                            <StyledLabel>Comment</StyledLabel>
                            <StyledLabel>Rating</StyledLabel>
                        </GroupForm>
                        {showForm.reviews.map(r => (
                            <GroupForm key={r.idReview} style={{ gap: "190px", justifyContent: "flex-start" }}>
                                {editingReviewId === r.idReview ? (
                                    <form onSubmit={(e) => handleEditReviewSave(e, r.idReview)} style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                                        <StyledLabel>{r.idReview}</StyledLabel>
                                        <StyledInput
                                            type="text"
                                            name="comment"
                                            value={editingReviewData.comment}
                                            onChange={handleEditReviewChange}
                                            required
                                        />
                                        <select
                                            name="grade"
                                            value={editingReviewData.grade}
                                            onChange={handleEditReviewChange}
                                            required
                                        >
                                            <option value="">Select grade</option>
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                        <StyledButtonSave type="submit">Save</StyledButtonSave>
                                        <StyledButtonDelete type="button" onClick={() => setEditingReviewId(null)}>Cancel</StyledButtonDelete>
                                    </form>
                                ) : (
                                    <>
                                        <StyledLabel>{r.idReview}</StyledLabel>
                                        <StyledLabel>{r.comment}</StyledLabel>
                                        <StyledLabel>{r.grade}</StyledLabel>
                                        <StyledButtonEdit onClick={() => handleEditReview(r)}>Edit</StyledButtonEdit>
                                        <StyledButtonDelete onClick={() => handleDelete(r.idReview)}>Delete</StyledButtonDelete>
                                    </>
                                )}
                            </GroupForm>
                        ))}
                    </ReviewsDiv>
                     : 
                    <StyledAddReviewForm onSubmit={handleSaveReview}>
                        <h1>Add review</h1>
                        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                            <StyledLabel>Comment: </StyledLabel>
                            <StyledInput type="text" name="comment" placeholder="Write a comment" onChange={handleReviewChange} required/>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", gap: "10px", textAlign: "center", alignItems: "center"}}>
                            <StyledLabel>Grade: </StyledLabel>
                            <select id="grade" name="grade" onChange={handleReviewChange} required>
                                <option value="">Select grade</option>
                                {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>
                        <button style={{border: "none", borderRadius: "5px", cursor: "pointer", height: "30px", width: "70px",
                            backgroundColor: "green", marginLeft: "200px", fontSize: "large"
                        }} type="submit">Save</button>
                    </StyledAddReviewForm>
                }
                </BottomComponent>
            </ContentComponent>
            }
            {/* </MainComponent> */}
            <GoBackButton style={{marginTop: "50px"}} onClick={handleGoBack}>Back to shows</GoBackButton>
        </div>
    )
}

export default MasterDetail;