import Header from "../component/organisms/header";
import SectionHeader from "../component/molecules/sectionHeader";

function Index() {
  return (
    <div>
      <Header/>
      <SectionHeader title={'최근 등록된 게시물'}/>
    </div>
  );
}

export default Index;