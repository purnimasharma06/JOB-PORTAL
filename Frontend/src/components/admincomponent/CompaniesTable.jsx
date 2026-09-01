import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const navigate = useNavigate();

  const [filterCompany, setFilterCompany] = useState([]);

  useEffect(() => {
    if (!companies) {
      return;
    }

    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }

      return company.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  console.log("COMPANIES:", companies);

  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>

        <TableCaption>
          Your recent registered Companies
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>

            <TableHead>
              Company Name
            </TableHead>

            <TableHead>Date</TableHead>

            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {filterCompany.length === 0 ? (

            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center"
              >
                No Companies Added
              </TableCell>
            </TableRow>

          ) : (

            filterCompany.map((company) => (

              <TableRow key={company._id}>

                {/* LOGO */}
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo}
                      alt={`${company.name} logo`}
                    />
                  </Avatar>
                </TableCell>

                {/* COMPANY NAME */}
                <TableCell>
                  {company.name}
                </TableCell>

                {/* DATE */}
                <TableCell>
                  {company.createdAt
                    ? company.createdAt.split("T")[0]
                    : "N/A"}
                </TableCell>

                {/* ACTION */}
                <TableCell className="text-right">

                  <Popover>

                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">

                      <div
                        onClick={() =>
                          navigate(
                            `/admin/companies/${company._id}`
                          )
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />

                        <span>
                          Edit
                        </span>

                      </div>

                    </PopoverContent>

                  </Popover>

                </TableCell>

              </TableRow>

            ))

          )}

        </TableBody>

      </Table>
    </div>
  );
};

export default CompaniesTable;