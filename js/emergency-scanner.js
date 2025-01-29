class EmergencyScanner {
    constructor() {
        this.currentLocation = null;
        this.scanning = false;
        this.setupScanner();
    }

    setupScanner() {
        this.initializeCamera();
        this.setupLocationTracking();
    }

    async initializeCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.getElementById('scanner-view');
            if (videoElement) {
                videoElement.srcObject = stream;
            }
        } catch (error) {
            console.error('Camera access error:', error);
            this.showError('Camera access denied. Please enable camera permissions.');
        }
    }

    setupLocationTracking() {
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition(
                position => {
                    this.currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                },
                error => {
                    console.error('Location error:', error);
                    this.showError('Location services unavailable.');
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        }
    }

    async scanQRCode() {
        if (this.scanning) return;
        
        this.scanning = true;
        try {
            const result = await this.processQRCode();
            if (result) {
                this.handleEmergencyData(result);
            }
        } catch (error) {
            console.error('Scanning error:', error);
            this.showError('QR code scanning failed. Please try again.');
        } finally {
            this.scanning = false;
        }
    }

    async processQRCode() {
        // Implement actual QR code processing logic here
        // This is a placeholder for QR code scanning implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: "John Doe",
                    emergency_contact: "+1234567890",
                    medical_info: "No known allergies",
                    vehicle: "16/04/2004"
                });
            }, 1000);
        });
    }

    handleEmergencyData(data) {
        const emergencyPanel = document.getElementById('emergency-panel');
        if (!emergencyPanel) return;

        emergencyPanel.innerHTML = `
            <div class="emergency-info">
                <h2>Emergency Information</h2>
                <div class="info-section">
                    <h3>Vehicle Owner</h3>
                    <p>${data.name}</p>
                </div>
                <div class="info-section">
                    <h3>Emergency Contact</h3>
                    <p>${data.emergency_contact}</p>
                    <button onclick="emergencyScanner.callEmergencyContact('${data.emergency_contact}')">
                        Call Emergency Contact
                    </button>
                </div>
                <div class="info-section">
                    <h3>Medical Information</h3>
                    <p>${data.medical_info}</p>
                </div>
                <div class="info-section">
                    <h3>dob</h3>
                    <p>${data.dob}</p>
                </div>
                <button onclick="emergencyScanner.callEmergencyServices()">
                    Call Emergency Services (911)
                </button>
            </div>
        `;
    }

    async callEmergencyContact(phone) {
        try {
            window.location.href = `tel:${phone}`;
        } catch (error) {
            this.showError('Could not initiate call. Please dial manually.');
        }
    }

    async callEmergencyServices() {
        try {
            window.location.href = 'tel:911';
        } catch (error) {
            this.showError('Could not initiate emergency call. Please dial 911 manually.');
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }
}

// Initialize Emergency Scanner
const emergencyScanner = new EmergencyScanner();