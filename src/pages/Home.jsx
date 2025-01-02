import { useContext } from "react";
import Loading from "../components/Loading.jsx";
import ScrollContainer from "../components/layout/ScrollContainer.jsx";
import { SectionContext } from "../components/context/SectionContext.jsx";

const Home = () => {
	const { hideLoading } = useContext(SectionContext);

	return (
		<>
			{!hideLoading && <Loading />}
			<ScrollContainer />
		</>
	)
}

export default Home