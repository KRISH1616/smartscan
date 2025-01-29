// scanner.js
class EmergencyScanner {
    constructor() {
        this.html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { 
                fps: 10,
                qrbox: { width: 250, height: 250 },
                rememberLastUsedCamera: true,
                aspectRatio: 1.0
            }
        );
        this.emergencyInfoDiv = document.getElementById('emergency-info');
        this.loadingDiv = document.getElementById('loading');
        this.scanStatus = document.getElementById('scan-status');
        this.initializeScanner();
    }

    initializeScanner() {
        this.html5QrcodeScanner.render((decodedText) => {
            this.showLoading();
            this.handleScanSuccess(decodedText);
        }, (error) => {
            // Handle scan error silently
            console.warn(error);
        });
    }

    showLoading() {
        this.loadingDiv.style.display = 'block';
        this.scanStatus.style.display = 'none';
    }

    hideLoading() {
        this.loadingDiv.style.display = 'none';
        this.scanStatus.style.display = 'block';
    }

    handleScanSuccess(decodedText) {
        try {
            const data = JSON.parse(decodedText);
            this.displayEmergencyInfo(data);
            // Stop scanning after successful scan
            this.html5QrcodeScanner.clear();
            this.hideLoading();
        } catch (error) {
            this.hideLoading();
            this.showError("Invalid QR code format");
        }
    }

    displayEmergencyInfo(data) {
        this.emergencyInfoDiv.innerHTML = `
            <div class="info-card">
                <h2>Emergency Information</h2>
                <p><span class="info-label">Owner:</span>${this.sanitizeHTML(data.name)}</p>
                <p><span class="info-label">Emergency Contact:</span>${this.sanitizeHTML(data.emergencyContact)}</p>
                ${data.BloodGroup ? `<p><span class="info-label">Blood Group:</span>${this.sanitizeHTML(data.BloodGroup)}</p>` : ''}
                ${data.dob ? `<p><span class="info-label">Date of Birth:</span>${this.sanitizeHTML(data.dob)}</p>` : ''}
                ${data.contact ? `<p><span class="info-label">Primary Contact:</span>${this.sanitizeHTML(data.contact)}</p>` : ''}
                ${data.medical || data.medicalInfo ? `<p><span class="info-label">Medical Info:</span>${this.sanitizeHTML(data.medical || data.medicalInfo)}</p>` : ''}
                
                <button class="emergency-button" onclick="window.location.href='tel:${data.emergencyContact}'">
                    Call Emergency Contact
                </button>
                
                <button class="emergency-button" onclick="window.location.href='tel:911'">
                    Call Emergency Services (911)
                </button>
            </div>
        `;
        this.emergencyInfoDiv.classList.add('active');
    }

    sanitizeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        this.emergencyInfoDiv.appendChild(errorDiv);
        setTimeout(() => {
            errorDiv.style.display = 'none';
            errorDiv.remove();
        }, 3000);
    }
}

// Initialize scanner when page loads
window.addEventListener('load', () => {
    new EmergencyScanner();
});