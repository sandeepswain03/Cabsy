import Container from "@/components/Container/Container";
import Coupon from "@/components/Coupon/Coupon";
import CouponRequest from "@/components/CouponRequest/CouponRequest";
import Navbar from "@/components/Navbar/Navbar";
import ServiceRequest from "@/components/ServiceRequest/ServiceRequest";
import Status from "@/components/Status/Status";
import Story from "@/components/Story/Story";

const Home = () => {
  return (
    <div>
      <Container>
        <Navbar />
      </Container>
      <Container>
        <Status />
      </Container>
      <Coupon />

      <CouponRequest />
      <ServiceRequest />
      <Story />
    </div>
  );
};

export default Home;
