import React, { useState } from 'react';
import './SmsComponent.css';

const SmsComponent = () => {
  const [message, setMessage] = useState('');
  const [log, setLog] = useState('');

  const handleSendSms = async () => {
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const result = await response.json();
        setLog((prevLog) => `${prevLog}\n${result.message}`);
        setMessage('');
      } else {
        console.error('Failed to send SMS');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  return (
    <div id="smsDiv" style={{ width: '28%', marginLeft: '2%' }}>
      <h2>Send SMS</h2>
      <div>
        <label htmlFor="smsMessage">Message to send:</label>
        <input
          type="text"
          id="smsMessage"
          name="smsMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>
      <div>
        <label htmlFor="smsLog">Message Log:</label>
        <textarea
          id="smsLog"
          name="smsLog"
          rows="8"
          value={log}
          readOnly
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>
      <button id="sendSmsButton" onClick={handleSendSms} style={{ width: '100%' }}>
        Send SMS
      </button>
    </div>
  );
};

export default SmsComponent;
