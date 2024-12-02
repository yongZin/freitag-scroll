import { createGlobalStyle } from "styled-components";
import NanumSquareOTF_acL from "../assets/fonts/NanumSquareOTF_acL.woff";
import NanumSquareOTF_acR from "../assets/fonts/NanumSquareOTF_acR.woff";
import NanumSquareOTF_acB from "../assets/fonts/NanumSquareOTF_acB.woff";
import NanumSquareOTF_acEB from "../assets/fonts/NanumSquareOTF_acEB.woff";

const GlobalStyle = createGlobalStyle`
  :root{
    /* 폰트 변수 */
    --f-light:"NanumSquareOTF_acL";
    --f-reular:"NanumSquareOTF_acR";
    --f-bold:"NanumSquareOTF_acB";
    --f-ebold:"NanumSquareOTF_acEB";
    /* //폰트 변수 */
  }

	*{
    margin:0;
    padding:0;
    outline:none;
    list-style:none;
    box-sizing:border-box;
  }

  body{
    margin:0;
    padding:0;
    line-height:normal;
    font-family:var(--f-bold);
    border:0;
    overflow-x:hidden;
  }

	img{
    width:100%;
  }

  button{
    font-family:var(--f-bold);
    border:0;
    background-color:transparent;
    cursor:pointer;
  }

  @font-face {
    font-family:"NanumSquareOTF_acL";
    src:url(${NanumSquareOTF_acL}) format("woff");
    font-weight:normal;
    font-style:normal;
  }

  @font-face {
    font-family:"NanumSquareOTF_acR";
    src:url(${NanumSquareOTF_acR}) format("woff");
    font-weight:normal;
    font-style:normal;
  }

  @font-face {
    font-family:"NanumSquareOTF_acB";
    src:url(${NanumSquareOTF_acB}) format("woff");
    font-weight:normal;
    font-style:normal;
  }

  @font-face {
    font-family:"NanumSquareOTF_acEB";
    src:url(${NanumSquareOTF_acEB}) format("woff");
    font-weight:normal;
    font-style:normal;
  }
`;

export default GlobalStyle;