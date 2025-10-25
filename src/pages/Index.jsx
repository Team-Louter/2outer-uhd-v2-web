import Header from "../component/organisms/header";
import SectionHeader from "../component/molecules/sectionHeader";
import SearchSection from "../component/organisms/searchSection";

function Index() {
  return (
    <div>
      <Header/>
      <SearchSection/>
      <SectionHeader title={'최근 등록된 게시물'}/>
    </div>
  );
}

export default Index;