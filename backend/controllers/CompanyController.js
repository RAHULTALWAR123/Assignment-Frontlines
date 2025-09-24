import Company from "../models/companyModel.js";

export const addCompany = async(req,res) => {
    try {
    const { name, industry, location, size, description, status } = req.body;

    const company = new Company({
      name,
      industry,
      location,
      size,
      description,
      status
    });

    const savedCompany = await company.save();

    res.status(201).json(savedCompany);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
}

export const getAllCompanies = async (req, res) => {
  try {
    const { name, industry, status, city, state, country } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (industry) {
      filter.industry = industry;
    }
    if (status) {
      filter.status = status;
    }
    if (city) {
      filter["location.city"] = { $regex: city, $options: "i" };
    }
    if (state) {
      filter["location.state"] = { $regex: state, $options: "i" };
    }
    if (country) {
      filter["location.country"] = { $regex: country, $options: "i" };
    }

    const companies = await Company.find(filter);
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateCompany = async(req,res) => {
    try {
    const { id } = req.params;
    const { name, industry, location, size, description, status } = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { name, industry, location, size, description, status },
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export const deleteCompany = async(req,res) => {
    try {
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

