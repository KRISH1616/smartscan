// auth.js
class Auth {
    constructor() {
        this.isLoggedIn = false;
        this.setupLoginModal();
        this.setupLearnMoreModal();
        this.initializeEventListeners();
    }

    setupLoginModal() {
        // Create login modal HTML
        const loginModal = document.createElement('div');
        loginModal.id = 'loginModal';
        loginModal.className = 'modal';
        loginModal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" class="btn primary-btn">Login</button>
                </form>
            </div>
        `;
        document.body.appendChild(loginModal);
    }

    setupLearnMoreModal() {
        // Create learn more modal HTML
        const learnMoreModal = document.createElement('div');
        learnMoreModal.id = 'learnMoreModal';
        learnMoreModal.className = 'modal';
        learnMoreModal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>About RES-Q-SCAN</h2>
                <div class="learn-more-content">
                    <section>
                        <h3>What is RES-Q-SCAN?</h3>
                        <p>RES-Q-SCAN is an innovative emergency response system that uses QR code technology to provide immediate access to critical information during emergencies.</p>
                    </section>
                    
                    <section>
                        <h3>Key Features</h3>
                        <ul>
                            <li>Quick access to emergency contacts</li>
                            <li>Important medical information</li>
                            <li>Vehicle details for first responders</li>
                            <li>Blood group information</li>
                            <li>Secure data storage</li>
                        </ul>
                    </section>
                    
                    <section>
                        <h3>How It Works</h3>
                        <p>1. Generate your unique QR code with your emergency information</p>
                        <p>2. Place the QR code in your vehicle</p>
                        <p>3. In case of emergency, first responders can scan the code</p>
                        <p>4. Instant access to vital information that could save lives</p>
                    </section>
                </div>
            </div>
        `;
        document.body.appendChild(learnMoreModal);
    }

    initializeEventListeners() {
        // Login button click handler
        const loginBtn = document.querySelector('.login-btn');
        loginBtn?.addEventListener('click', () => this.showLoginModal());

        // Learn more button click handler
        const learnMoreBtn = document.querySelector('.secondary-btn');
        learnMoreBtn?.addEventListener('click', () => this.showLearnMoreModal());

        // Close button handlers
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal);
            });
        });

        // Login form submission
        const loginForm = document.getElementById('loginForm');
        loginForm?.addEventListener('submit', (e) => this.handleLogin(e));

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target);
            }
        });
    }

    showLoginModal() {
        const modal = document.getElementById('loginModal');
        modal.style.display = 'block';
    }

    showLearnMoreModal() {
        const modal = document.getElementById('learnMoreModal');
        modal.style.display = 'block';
    }

    hideModal(modal) {
        modal.style.display = 'none';
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Here you would typically make an API call to your backend
            // This is a mock implementation
            await this.mockLoginAPI(email, password);
            
            this.isLoggedIn = true;
            this.updateUIForLoggedInUser(email);
            this.hideModal(document.getElementById('loginModal'));
        } catch (error) {
            alert(error.message);
        }
    }

    mockLoginAPI(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    }

    updateUIForLoggedInUser(email) {
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.textContent = 'Logout';
            loginBtn.addEventListener('click', () => this.handleLogout());
        }
        
        // Show dashboard
        const dashboard = document.getElementById('dashboard');
        if (dashboard) {
            dashboard.classList.remove('hidden');
        }
    }

    handleLogout() {
        this.isLoggedIn = false;
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.textContent = 'Login';
        }
        window.location.reload();
    }
}