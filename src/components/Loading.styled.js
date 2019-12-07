import styled from 'styled-components'

export let Loading = styled.div`

    
    display: ${props => props.loading==="true" ? "inline-block" : "none"};
    position: absolute;
    background-color: white;
    width: 100%;
    height: 100%;
    top: 0;

    &:after {
        top: 42%;
        left: 46%;
        position: absolute;
        transform:translate(-50%,-50%);
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #3f51b5;
        border-color: #3f51b5 transparent #3f51b5 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
        transform-origin:50%;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

`;