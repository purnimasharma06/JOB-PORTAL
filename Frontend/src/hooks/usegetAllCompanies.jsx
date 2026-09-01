import { setCompanies } from "@/redux/companyslice";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchCompanies = async () => {

      try {

        console.log("Fetching companies...");

        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get`,
          {
            withCredentials: true,
          }
        );

        console.log("Companies API Response:", res.data);

        if (res.data.success) {

          dispatch(
            setCompanies(res.data.companies)
          );

          console.log(
            "Companies successfully added to Redux"
          );

        }

      } catch (error) {

        console.log(
          "Error fetching companies:",
          error
        );

      }

    };

    fetchCompanies();

  }, [dispatch]);

};

export default useGetAllCompanies;