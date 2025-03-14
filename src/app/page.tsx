"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types/advocate";
import SolaceIcon from "./icons/SolaceIcon";
import Button from "./components/Button";
import LoadingSpinner from "./icons/LoadingSpinner";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAdvocates() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/advocates");
        if (!res.ok) throw new Error(res.statusText);
        const jsonResponse: { data: Advocate[] } = await res.json();
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    }
    fetchAdvocates();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
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
          {isLoading && <LoadingSpinner className="animate-spin h-8 w-8" />}
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
