// components/CountrySelect.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountrySelect = ({ value, onChange, className, defaultText }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const sortedCountries = response.data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(sortedCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <div>
            <label htmlFor="country" className="block">Location</label>
            <select
                id="country"
                value={value}
                className={`w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none ${className}`}
                onChange={onChange}
            >
                <option value="">{defaultText}</option>
                {countries.map((country) => (
                    <option key={country.cca2} value={country.name.common}>
                        {country.name.common}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountrySelect;
