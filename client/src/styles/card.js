import styled from 'styled-components';

export const Card = styled.div `
background-image:url('../oval-bg.png');
  background-size:contain;
  background-repeat: no-repeat;
  padding:2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width:40rem;
 height: 20rem

`;

export const CardTitle = styled.h2 `
 color: #638165;
 text-align: left;
 font-size: 1.6rem;
`;

export const Button = styled.a `
	background: #C1DFC4;
	display:inline-block;
	cursor:pointer;
	color:#444;
	font-family:Verdana;
	font-size:.8rem;
	padding:.4rem 1rem;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;
    margin-top: 1rem;
    width: 100%
`

export const Form= styled.form `
display: flex;
flex-direction: column;
color: #444;
font-size:.6rem;
`;
