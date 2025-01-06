import { useContext } from "react";
import ScrollContainer from "../components/layout/ScrollContainer.jsx";
import { SectionContext } from "../components/context/SectionContext.jsx";
import Loading from "../components/Loading.jsx";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

const Home = () => {
	const { hideLoading } = useContext(SectionContext);

	return (
		<>
			{!hideLoading && <Loading />}
			<Header />
			<ScrollContainer />
			<Footer />
		</>
	)
}

export default Home