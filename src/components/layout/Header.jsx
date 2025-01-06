//헤더 컴포넌트
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "/assets/images/logo/logo.svg";
import { useScrollToTop } from "../hooks/useSection";
import { SectionContext } from "../context/SectionContext";

const Wrap = styled.header`
	width:100%;
	display:flex;
	padding:15px 30px;
	background-color:transparent;
	backdrop-filter:blur(3px);
	transition:0.3s;
	transform:translateY(0);
	position:fixed;
	top:0;
	left:0;
	z-index:100;
	&.up{
		transform:translateY(0);
	}
	&.down{
		transform:translateY(-100%);
	}
	@media ${props => props.theme.tablet} {
		padding:15px 20px;
  }
	@media ${props => props.theme.mobile} {
		padding:15px 10px;
	}
	
`;
const StyledLink = styled(Link)`
	width:102px;
	height:34px;
	display:inline-block;
	font-size:0;
	background:url(${logo}) no-repeat;
	background-size:cover;
	@media ${props => props.theme.mobile_xs} {
		width:85px;
		height:28px;
  }
`;

const Header = () => {
	const handleClick = useScrollToTop();
	const { scrollDirection } = useContext(SectionContext);
	
	return (
		<Wrap className={scrollDirection}>
			<StyledLink to="/" onClick={handleClick}>
				<h1>FREITAG</h1>
			</StyledLink>
		</Wrap>
	)
}

export default Header;