import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  // Fetch all companies
  useGetAllCompanies();

  // Update search text in Redux
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 px-4 md:px-0">

        <div className="flex flex-col sm:flex-row items-center justify-between my-5 gap-4">

          <Input
            className="w-full sm:w-fit"
            placeholder="Filter by Name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            className="w-full sm:w-auto"
            onClick={() =>
              navigate("/admin/companies/create")
            }
          >
            Add Company
          </Button>

        </div>

        <div className="overflow-x-auto">
          <CompaniesTable />
        </div>

      </div>
    </div>
  );
};

export default Companies;