// scanner.js
class EmergencyScanner {
    constructor() {
        this.html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", 
            { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                rememberLastUsedCamera: true
            }
        );
        this.emergencyInfoDiv = document.getElementById('emergency-info');
        this.initializeScanner();
    }

    initializeScanner() {
        this.html5QrcodeScanner.render((decodedText) => {
            this.handleScanSuccess(decodedText);
        }, (error) => {
            // Handle scan error silently
            console.error(error);
        });
    }

    handleScanSuccess(decodedText) {
        try {
            const data = JSON.parse(decodedText);
            console.log(data);
            this.displayEmergencyInfo(data);
            // Optional: Stop scanning after successful scan
            this.html5QrcodeScanner.clear();
        } catch (error) {
            this.showError("Invalid QR code format");
        }
    }

    displayEmergencyInfo(data) {
        this.emergencyInfoDiv.innerHTML = `
            <div class="info-card">
                <h2>Emergency Information</h2>
                <p><span class="info-label">Owner:</span>${this.sanitizeHTML(data.name)}</p>
                <p><span class="info-label">Emergency Contact:</span>${this.sanitizeHTML(data.emergencyContact)}</p>
                <p><span class="info-label">Vehicle:</span>${this.sanitizeHTML(data.vehicle)}</p>
                <p><span class="info-label">Registration:</span>${this.sanitizeHTML(data.registration)}</p>
                ${data.medical ? `<p><span class="info-label">Medical Info:</span>${this.sanitizeHTML(data.medical)}</p>` : ''}
                
                <button class="emergency-button" onclick="window.location.href='tel:${data.emergency}'">
                    Call Emergency Contact
                </button>
            </div>
        `;
        this.emergencyInfoDiv.classList.add('active');
    }

    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.emergencyInfoDiv.appendChild(errorDiv);
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

// Initialize scanner when page loads
window.addEventListener('load', () => {
    new EmergencyScanner();
});