class QRGenerator {
    constructor() {
        this.qrcode = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const form = document.getElementById('userDataForm');
        const downloadBtn = document.getElementById('downloadQR');

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateQRCode();
        });

        downloadBtn?.addEventListener('click', () => {
            this.downloadQRCode();
        });
    }

    generateQRCode() {
        const data = this.collectFormData();
        const qrContainer = document.getElementById('qrcode');
        
        // Clear previous QR code
        qrContainer.innerHTML = '';

        // Generate new QR code
        this.qrcode = new QRCode(qrContainer, {
            text: JSON.stringify(data),
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

// In qr-generator.js, update the collectFormData function
collectFormData() {
    return {
        name: document.getElementById('fullName').value,
        contact: document.getElementById('contact').value,
        emergencyContact: document.getElementById('emergencyContact').value,
        medicalInfo: document.getElementById('medicalInfo').value || '',
        BloodGroup: document.getElementById('Blood Group').value || '',
        dob: document.getElementById('dob').value,
        timestamp: new Date().toISOString()
    };
}
    downloadQRCode() {
        if (!this.qrcode) return;

        const canvas = document.querySelector('#qrcode canvas');
        const image = canvas.toDataURL("png");
        const link = document.createElement('a');
        
        link.href = image;
        link.download = 'emergency-qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    createHTMLFromJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            // Format timestamp to be more readable
            const timestamp = new Date(data.timestamp).toLocaleString();
            
            const html = `
                <div class="emergency-info">
                    <h2>Emergency Information</h2>
                    <div class="info-section">
                        <h3>Personal Details</h3>
                        <p><strong>Name:</strong> ${this.escapeHTML(data.name)}</p>
                        <p><strong>Contact:</strong> ${this.escapeHTML(data.contact)}</p>
                    </div>
                    
                    <div class="info-section">
                        <h3>Emergency Contact</h3>
                        <p>${this.escapeHTML(data.emergencyContact)}</p>
                    </div>
                    
                    <div class="info-section">
                        <h3>Medical Information</h3>
                        <p>${this.escapeHTML(data.medicalInfo)}</p>
                    </div>
                    
                    <div class="info-section">
                        <h3>Blood Group Details</h3>
                        <p>${this.escapeHTML(data.BloodGroup)}</p>
                    </div>
                    
                    <div class="info-section">
                        <h3>dob</h3>
                        <p>${this.escapeHTML(data.dob)}</p>
                    </div>
                    
                    <div class="info-footer">
                        <p><small>Generated: ${this.escapeHTML(timestamp)}</small></p>
                    </div>
                </div>`;
                
            return html;
        } catch (error) {
            return `<div class="error">Error parsing JSON data: ${error.message}</div>`;
        }
    }

    // Helper method to escape HTML special characters to prevent XSS
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// Initialize QR Generator
const qrGenerator = new QRGenerator();