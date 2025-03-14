"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types/advocate";
import SolaceIcon from "./icons/SolaceIcon";
import Button from "./components/Button";

const tableHeaders = [
  "First Name",
  "Last Name",
  "City",
  "Degree",
  "Specialties",
  "Years of Experience",
  "Phone Number",
];

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse: { data: Advocate[] }) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.join(",").toLowerCase().includes(searchTerm) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });
    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <SolaceIcon className="w-40 h-20" />
      <br />

      <h1>Solace Advocates</h1>
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <div className="flex gap-2">
          <input
            className="rounded-md border border-black pl-2"
            onChange={onChange}
          />
          <Button onClick={onClick}>Reset Search</Button>
        </div>
      </div>
      <br />
      <br />
      <table className="min-w-full">
        <thead className="border-b border-gray-300">
          {tableHeaders.map((header, i) => (
            <th className={`px-3 py-3.5 whitespace-nowrap `} key={i}>
              {header}
            </th>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td className="px-3 py-3.5">{advocate.firstName}</td>
                <td className="px-3 py-3.5">{advocate.lastName}</td>
                <td className="px-3 py-3.5">{advocate.city}</td>
                <td className="px-3 py-3.5">{advocate.degree}</td>
                <td className="px-3 py-3.5 ">
                  <ul className="list-disc flex flex-col gap-2 pl-8">
                    {advocate.specialties.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-3 py-3.5">{advocate.yearsOfExperience}</td>
                <td className="px-3 py-3.5">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
