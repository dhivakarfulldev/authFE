import Navbar from "./Navbar";


const Home = ({isLoading , setisLoading}) => {
  return (
   <>
   <Navbar isLoading={isLoading} setisLoading={setisLoading}/>
   </>
  );
};

export default Home;
