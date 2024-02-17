import ContainerBox from "@/components/ContainerBox";
import MainSlide from "@/components/Main/MainSlide";
import MainVisual from "@/components/Main/MainVisual";

export default function Home() {
  return (
    <main>
      <MainVisual />

      <ContainerBox>
        <MainSlide
          path="wild-market1"
          title="산채품 장터"
          subTitle="현재 판매 중인 산채품"
        />
        {/* <MainSlide
          path="natural-herb"
          title="자연산 약초"
          subTitle="깊은 맛, 자연 그대로를 느낄 수 있는"
          variant="center"
          slidesPerView={5}
          speed={2000}
        /> */}
      </ContainerBox>
    </main>
  );
}
