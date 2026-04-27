import React from 'react';
import './App.css'; // Reusing your existing styles

const PrivacyPolicy = () => {
  return (
    <div className="educational-content" style={{ marginTop: '40px', paddingBottom: '40px' }}>
      <div className="content-card">
        <h1 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px' }}>Privacy Policy for DailyQi</h1>
        <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>

        <h3>1. Introduction</h3>
        <p>
          Welcome to DailyQi ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data in compliance with the Singapore Personal Data Protection Act (PDPA). This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
        </p>

        <h3>2. Information We Collect</h3>
        <p>
          We do not currently require users to create an account to use our calendar tools. However, when you visit our site, we automatically collect certain standard log data, including your IP address, browser type, operating system, and the pages you interact with.
        </p>

        <h3>3. Google AdSense and Cookies</h3>
        <p>
          We use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site.
        </p>
        <ul style={{ color: '#475569', lineHeight: '1.6', marginBottom: '16px', paddingLeft: '20px' }}>
          <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites.</li>
          <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.</li>
          <li>You may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" style={{ color: '#3b82f6' }}>Google Ads Settings</a>.</li>
        </ul>

        <h3>4. Use of Information</h3>
        <p>
          The information collected is used to maintain and improve the functionality of our application, analyze user trends, and ensure the security of our platform.
        </p>

        <h3>5. Third-Party Links</h3>
        <p>
          Our website may contain links to third-party sites. We are not responsible for the privacy practices or the content of those external websites.
        </p>

        <h3>6. Your Rights (PDPA)</h3>
        <p>
          Under the PDPA, you have the right to request access to or correction of your personal data held by us. If you have any questions regarding your data, please contact our Data Protection Officer (DPO).
        </p>

        <h3>7. Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at: <strong>hello@dailyqii.app</strong>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;