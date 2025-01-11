class Dashboard {
    constructor() {
        this.data = {
            users: 0,
            scans: 0,
            emergencyCalls: 0
        };
        this.charts = {};
        this.initializeDashboard();
    }

    initializeDashboard() {
        // Mock data updates
        this.updateStats();
        this.initializeCharts();
        
        // Update stats every 30 seconds
        setInterval(() => this.updateStats(), 30000);
    }

    updateStats() {
        // Simulate real-time data updates
        this.data.users += Math.floor(Math.random() * 5);
        this.data.scans += Math.floor(Math.random() * 10);
        this.data.emergencyCalls += Math.floor(Math.random() * 2);

        this.updateCharts();
    }

    initializeCharts() {
        // Initialize charts if they exist in the DOM
        const usageCtx = document.getElementById('usageChart')?.getContext('2d');
        
        if (usageCtx) {
            this.charts.usage = new Chart(usageCtx, {
                type: 'line',
                data: {
                    labels: Array(24).fill().map((_, i) => `${i}:00`),
                    datasets: [{
                        label: 'System Usage',
                        data: Array(24).fill().map(() => Math.random() * 100),
                        borderColor: '#007bff',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    updateCharts() {
        if (this.charts.usage) {
            const newData = this.charts.usage.data.datasets[0].data;
            newData.shift();
            newData.push(Math.random() * 100);
            this.charts.usage.update();
        }
    }

    // Data validation methods
    validatePhoneNumber(phone) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(phone);
    }

    validateVehicleInfo(info) {
        return info.length >= 5;
    }

    // Emergency contact management
    addEmergencyContact(contact) {
        const contacts = this.getStoredContacts();
        contacts.push(contact);
        localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
        this.updateContactsList();
    }

    getStoredContacts() {
        return JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
    }

    updateContactsList() {
        const contactsList = document.querySelector('.emergency-contacts-list');
        if (!contactsList) return;

        const contacts = this.getStoredContacts();
        contactsList.innerHTML = contacts.map(contact => `
            <div class="contact-item">
                <span>${contact.name}: ${contact.phone}</span>
                <button class="delete-contact" data-phone="${contact.phone}">Delete</button>
            </div>
        `).join('');
    }
}

// Initialize Dashboard
const dashboard = new Dashboard();