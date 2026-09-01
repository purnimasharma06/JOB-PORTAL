import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  const { loading, error } = useGetAllJobs();

  const jobs = useSelector(
    (state) => state.jobs.allJobs
  );

  console.log("Jobs in Component:", {
    loading,
    error,
    jobs,
  });

  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      <LatestJobs
        jobs={jobs}
        loading={loading}
      />
      <Footer />
    </div>
  );
};

export default Home;