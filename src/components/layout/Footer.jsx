//푸터 컴포넌트
import styled from "styled-components";

const Copyright = styled.footer`
	display:block;
	padding:20px;
	font-size:14px;
	text-align:center;
`;

const Footer = () => {
	return (
		<Copyright>Copyright © YongZin. All rights reserved.</Copyright>
	)
}

export default Footer