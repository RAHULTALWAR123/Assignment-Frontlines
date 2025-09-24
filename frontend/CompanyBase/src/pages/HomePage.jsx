/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getCompanies } from "../api/companyApi";

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    industry: "",
    status: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    fetchCompanies();
  }, [filters]);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies(filters);
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const options = ["Software","Technology","Healthcare","Finance","Education","Manufacturing",
      "Retail","Hospitality","Transportation","Energy","Real Estate","Other"
    ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Companies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="industry"
          value={filters.industry}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Industries</option>
          {options.map((op,idx) => (
            <option value={op} key={idx}>{op}</option>
          ))}
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={filters.state}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={filters.country}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Company Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Industry</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Employees</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.length > 0 ? (
              companies.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{c.name}</td>
                  <td className="px-6 py-3">{c.industry}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        c.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {c.location?.city}, {c.location?.state},{" "}
                    {c.location?.country}
                  </td>
                  <td className="px-6 py-3">{c.size?.employees}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No companies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
