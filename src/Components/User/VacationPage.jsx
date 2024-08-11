import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const VacationPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/Vacation/GetVacationsEmployees");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "codEmployee",
        header: "Employee Code",
        size: 150,
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        size: 150,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(), // format date
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        size: 150,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(), // format date
      },
      {
        accessorKey: "daysVacation",
        header: "Days of Vacation",
        size: 150,
      },
      {
        accessorKey: "vacationDaysLeft",
        header: "Vacation Days Left",
        size: 150,
      },
      {
        accessorKey: "typeVacation",
        header: "Type of Vacation",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, // data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default VacationPage;
