import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditSpotForm = () => {
  const { spotId } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch the spot details and prefill the form
    const fetchSpotDetails = async () => {
      try {
        const response = await fetch(`/api/spots/${spotId}`);
        if (response.ok) {
          const spot = await response.json();
          setName(spot.name);
          setDescription(spot.description);
          setPrice(spot.price);
          setAddress(spot.address);
          setCity(spot.city);
          setState(spot.state);
          setCountry(spot.country);
        } else {
          const errorData = await response.json();
          setErrorMessage(`Failed to fetch spot: ${errorData.message}`);
        }
      } catch (error) {
        setErrorMessage(`An error occurred: ${error.message}`);
      }
    };

    fetchSpotDetails();
  }, [spotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const spot = { name, description, price, address, city, state, country };

    try {
      const response = await fetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
      });

      if (response.ok) {
        setSuccessMessage('Spot updated successfully!');
        history.push(`/spots/${spotId}`);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Failed to update spot: ${errorData.message}`);
      }
    } catch (error) {
      setErrorMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Edit Spot</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required />
        <button type="submit">Update Spot</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default EditSpotForm;
