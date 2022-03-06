import HeroSwiper from '../components/homepage/HeroSwiper';
import Hero from '../components/shared/Hero';
import ImageUploaderRaw from '../components/shared/ImageUploaderRaw';
function Home() {
  return (
    <>
      <Hero>
        <HeroSwiper />
      </Hero>
      <ImageUploaderRaw />
    </>
  );
}

export default Home;
