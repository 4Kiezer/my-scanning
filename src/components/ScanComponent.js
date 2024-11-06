// src/components/ScanComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScanComponent({ userId }) {
    const [barcode, setBarcode] = useState('');
    const [scanDetails, setScanDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let wakeLock = null;

    useEffect(() => {
        // Request wake lock on component mount
        const requestWakeLock = async () => {
            try {
                if ('wakeLock' in navigator) {
                    wakeLock = await navigator.wakeLock.request('screen');
                    console.log('Wake Lock acquired');
                }
            } catch (err) {
                console.error('Wake Lock request failed:', err);
            }
        };

        requestWakeLock();

        // Release wake lock on component unmount
        return () => {
            if (wakeLock) {
                wakeLock.release().then(() => console.log('Wake Lock released'));
            }
        };
    }, []);

    const handleScan = async () => {
        if (!barcode) return;
        setLoading(true);
        setError(null);

        const payload = { userId, barcode };

        try {
            const response = await axios.post('https://api.example.com/scan', payload);
            setScanDetails(response.data.details);
        } catch (error) {
            console.error('Error sending barcode data:', error);
            setError('Failed to retrieve scan details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Scan ID</h3>
            <input
                type="text"
                placeholder="Enter Barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
            />
            <button onClick={handleScan}>Scan</button>

            <div>
                <h3>Scan Details</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <ul>
                        {scanDetails.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ScanComponent;