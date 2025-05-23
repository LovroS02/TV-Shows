import styled from "styled-components";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`

function MasterDetail() {
    return (
        <StyledDiv>
            <h1>Master</h1>
            <h1>Detail</h1>
        </StyledDiv>
    )
}

export default MasterDetail;
