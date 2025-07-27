/**
 * ==========================================================================
 * WebMotion Dashboard Application
 * ==========================================================================
 * Author: Development Team
 * Description: Modern dashboard interface with tab navigation and dynamic content
 * Last Updated: 2024
 * 
 * Features:
 * - Tab-based navigation with keyboard support
 * - Dynamic content generation from configuration
 * - Responsive design with mobile-first approach
 * - Accessibility compliant (WCAG 2.1)
 * - Error handling and logging
 * ==========================================================================
 */

/**
 * Main Dashboard Application Class
 * Handles all dashboard functionality including tab management and content generation
 */
class WebMotionDashboard {
    /**
     * Initialize the dashboard with configuration data
     */
    constructor() {
        this.config = {
            // Tab configuration data
            tabs: [
                { 
                    id: 1, 
                    title: 'Lorem Ipsum', 
                    country: { code: 'gb', name: 'United Kingdom' }, 
                    addressType: 'Residential' 
                },
                { 
                    id: 2, 
                    title: 'Tab 2 Content', 
                    country: { code: 'us', name: 'United States' }, 
                    addressType: 'Commercial' 
                },
                { 
                    id: 3, 
                    title: 'Tab 3 Content', 
                    country: { code: 'ca', name: 'Canada' }, 
                    addressType: 'Industrial' 
                },
                { 
                    id: 4, 
                    title: 'Tab 4 Content', 
                    country: { code: 'au', name: 'Australia' }, 
                    addressType: 'Mixed' 
                },
                { 
                    id: 5, 
                    title: 'Tab 5 Content', 
                    country: { code: 'de', name: 'Germany' }, 
                    addressType: 'Rural' 
                },
                { 
                    id: 6, 
                    title: 'Tab 6 Content', 
                    country: { code: 'fr', name: 'France' }, 
                    addressType: 'Urban' 
                }
            ],
            
            // Content row configuration - first 5 main rows
            contentRows: [
                // Rows 1-3: Two columns only (third column empty)
                [
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Dummy text', value: '-' }
                ],
                [
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' }
                ],
                [
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' }
                ],
                // Row 4: Three columns including country flag
                [
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Country', value: '', isCountry: true }
                ],
                // Row 5: Three columns
                [
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' }
                ]
            ],
            
            // Section rows after main content (appears after section heading)
            sectionRows: [
                [
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Address Type', value: '', isAddressType: true },
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' }
                ],
                [
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' }
                ],
                [
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' },
                    { heading: 'Lorem Ipsum', value: 'Simply dummy text' }
                ]
            ]
        };
        
        // Initialize the application
        this.init();
    }
    
    /**
     * Initialize the dashboard application
     * Sets up event listeners and generates initial content
     */
    init() {
        try {
            this.generateTabContent();
            this.bindEvents();
            this.activateTab(1); // Ensure first tab is active
            
            console.log('WebMotion Dashboard initialized successfully');
            
            // Dispatch initialization event
            this.dispatchCustomEvent('dashboardInitialized', { 
                tabCount: this.config.tabs.length 
            });
            
        } catch (error) {
            console.error('Failed to initialize WebMotion Dashboard:', error);
            this.handleError(error, 'initialization');
        }
    }
    
    /**
     * Generate tab content dynamically from configuration
     * Creates tab panels and populates them with data
     */
    generateTabContent() {
        const container = document.querySelector('.tab-content-container');
        if (!container) {
            throw new Error('Tab content container not found');
        }
        
        // Clear existing content except first tab
        const existingTabs = container.querySelectorAll('.tab-content:not(#tab-panel-1)');
        existingTabs.forEach(tab => tab.remove());
        
        // Generate content for all tabs
        this.config.tabs.forEach((tab, index) => {
            if (index === 0) {
                // First tab already exists in HTML, just populate it
                const firstTab = document.getElementById('tab-panel-1');
                if (firstTab) {
                    this.populateTabContent(firstTab, tab);
                }
            } else {
                // Create new tab panels for tabs 2-6
                const tabPanel = this.createTabPanel(tab);
                container.appendChild(tabPanel);
            }
        });
        
        console.log(`Generated content for ${this.config.tabs.length} tabs`);
    }
    
    /**
     * Create a new tab panel element
     * @param {Object} tabConfig - Configuration object for the tab
     * @returns {HTMLElement} - The created tab panel element
     */
    createTabPanel(tabConfig) {
        const panel = document.createElement('div');
        panel.className = 'tab-content';
        panel.id = `tab-panel-${tabConfig.id}`;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', `tab-${tabConfig.id}`);
        
        this.populateTabContent(panel, tabConfig);
        
        return panel;
    }
    
    /**
     * Populate tab content with data from configuration
     * @param {HTMLElement} panel - The tab panel element to populate
     * @param {Object} tabConfig - Configuration object for the tab
     */
    populateTabContent(panel, tabConfig) {
        const prefix = tabConfig.id === 1 ? '' : `Tab ${tabConfig.id} - `;
        
        panel.innerHTML = `
            <h2 class="tab-content__heading">${tabConfig.title}</h2>
            <div class="tab-content__rows">
                ${this.generateContentRows(tabConfig, prefix)}
                
                <!-- Section Heading -->
                <div class="tab-content__section-heading">
                    <h3 class="tab-content__section-title">${prefix}Lorem Ipsum</h3>
                </div>
                
                ${this.generateSectionRows(tabConfig, prefix)}
            </div>
        `;
    }
    
    /**
     * Generate HTML for main content rows
     * @param {Object} tabConfig - Tab configuration object
     * @param {string} prefix - Text prefix for tab-specific content
     * @returns {string} - Generated HTML string
     */
    generateContentRows(tabConfig, prefix) {
        return this.config.contentRows.map(row => {
            const columns = row.map(item => {
                let value = item.value;
                let heading = prefix + item.heading;
                
                // Handle special country column
                if (item.isCountry) {
                    value = `
                        <img src="https://flagcdn.com/w20/${tabConfig.country.code}.png" 
                             alt="${tabConfig.country.name} Flag" 
                             class="tab-content__country-flag"
                             loading="lazy">
                        ${tabConfig.country.name}
                    `;
                    heading = prefix + 'Country';
                }
                
                return `
                    <div class="tab-content__item">
                        <div class="tab-content__item-heading">${heading}</div>
                        <div class="tab-content__item-value">${value}</div>
                    </div>
                `;
            }).join('');
            
            // Add empty columns if row has less than 3 items
            const emptyColumns = Math.max(0, 3 - row.length);
            const emptyColumnHTML = '<div class="tab-content__item"></div>';
            
            return `
                <div class="tab-content__row">
                    ${columns}
                    ${emptyColumnHTML.repeat(emptyColumns)}
                </div>
            `;
        }).join('');
    }
    
    /**
     * Generate HTML for section rows (after section heading)
     * @param {Object} tabConfig - Tab configuration object
     * @param {string} prefix - Text prefix for tab-specific content
     * @returns {string} - Generated HTML string
     */
    generateSectionRows(tabConfig, prefix) {
        return this.config.sectionRows.map(row => {
            const columns = row.map(item => {
                let value = item.value;
                let heading = prefix + item.heading;
                
                // Handle special address type column
                if (item.isAddressType) {
                    value = tabConfig.addressType;
                    heading = prefix + 'Address Type';
                }
                
                return `
                    <div class="tab-content__item">
                        <div class="tab-content__item-heading">${heading}</div>
                        <div class="tab-content__item-value">${value}</div>
                    </div>
                `;
            }).join('');
            
            return `
                <div class="tab-content__row">
                    ${columns}
                </div>
            `;
        }).join('');
    }
    
    /**
     * Bind event listeners for user interactions
     * Sets up click and keyboard event handlers for tabs
     */
    bindEvents() {
        const tabButtons = document.querySelectorAll('.tab-navigation__button');
        
        if (tabButtons.length === 0) {
            throw new Error('No tab buttons found');
        }
        
        tabButtons.forEach(button => {
            // Click event for tab activation
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const tabId = this.extractTabId(button.id);
                if (tabId) {
                    this.activateTab(tabId);
                }
            });
            
            // Keyboard navigation support
            button.addEventListener('keydown', (e) => {
                this.handleTabKeyNavigation(e, button);
            });
        });
        
        // Bind Start Timer button functionality
        this.bindStartTimerButton();
        
        // Bind auto-save button functionality
        this.bindAutoSaveButton();
        
        // Bind email modal functionality
        this.bindEmailModal();
        
        // Bind user dropdown functionality
        this.bindUserDropdown();
        
        // Bind notification modal functionality
        this.bindNotificationModal();
        
        console.log(`Bound events to ${tabButtons.length} tab buttons`);
    }
    
    /**
     * Bind event listener for the Start Timer button
     * Starts a running timer when clicked
     */
    bindStartTimerButton() {
        const startTimerButton = document.querySelector('.btn.btn--primary');
        
        if (startTimerButton) {
            let timerInterval = null;
            let startTime = null;
            let isRunning = false;
            
            startTimerButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (!isRunning) {
                    // Start the timer
                    startTime = new Date();
                    isRunning = true;
                    
                    // Add visual feedback
                    startTimerButton.classList.add('btn--active');
                    
                    // Start the timer interval
                    timerInterval = setInterval(() => {
                        const now = new Date();
                        const elapsed = now - startTime;
                        const seconds = Math.floor(elapsed / 1000);
                        const minutes = Math.floor(seconds / 60);
                        const hours = Math.floor(minutes / 60);
                        
                        // Format time as HH:MM:SS
                        const formattedTime = [
                            hours.toString().padStart(2, '0'),
                            (minutes % 60).toString().padStart(2, '0'),
                            (seconds % 60).toString().padStart(2, '0')
                        ].join(':');
                        
                        // Update button text with running timer
                        startTimerButton.textContent = formattedTime;
                    }, 1000);
                    
                    // Dispatch custom event
                    this.dispatchCustomEvent('timerStarted', {
                        startTime: startTime.toISOString(),
                        timestamp: new Date().toISOString()
                    });
                    
                    console.log('Timer started');
                    
                } else {
                    // Stop the timer
                    if (timerInterval) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                    }
                    
                    isRunning = false;
                    startTimerButton.classList.remove('btn--active');
                    startTimerButton.textContent = 'Start Timer';
                    
                    // Dispatch custom event
                    this.dispatchCustomEvent('timerStopped', {
                        startTime: startTime?.toISOString(),
                        stopTime: new Date().toISOString()
                    });
                    
                    console.log('Timer stopped');
                }
            });
            
            console.log('Start Timer button event bound successfully');
        } else {
            console.warn('Start Timer button not found');
        }
    }
    

    
    /**
     * Bind event listener for the auto-save notifications button
     * Refreshes the entire page with animation
     */
    bindAutoSaveButton() {
        const autoSaveButton = document.querySelector('.header-icon-btn[aria-label="Auto-save notifications"]');
        
        if (autoSaveButton) {
            autoSaveButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add refreshing class for animation
                autoSaveButton.classList.add('refreshing');
                
                // Dispatch custom event
                this.dispatchCustomEvent('autoSaveRefreshStarted', {
                    timestamp: new Date().toISOString()
                });
                
                console.log('Auto-save refresh initiated');
                
                // Wait for animation to complete then refresh
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // Wait 1 second for the spin animation
                
            });
            
            console.log('Auto-save button event bound successfully');
        } else {
            console.warn('Auto-save button not found');
        }
    }
    
    /**
     * Bind event listeners for the email modal
     * Handles opening, closing, and form interactions
     */
    bindEmailModal() {
        const emailButton = document.getElementById('email-notifications-btn');
        const emailModal = document.getElementById('email-modal');
        const modalOverlay = document.getElementById('email-modal-overlay');
        const closeButton = document.getElementById('email-modal-close');
        const cancelButton = document.getElementById('email-modal-cancel');
        const saveButton = document.getElementById('email-modal-save');
        
        if (!emailButton || !emailModal) {
            console.warn('Email modal elements not found');
            return;
        }
        
        // Open modal
        emailButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.openEmailModal();
        });
        
        // Close modal handlers
        const closeModal = () => {
            this.closeEmailModal();
        };
        
        if (closeButton) closeButton.addEventListener('click', closeModal);
        if (cancelButton) cancelButton.addEventListener('click', closeModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
        
        // Save changes
        if (saveButton) {
            saveButton.addEventListener('click', () => {
                this.saveEmailSettings();
            });
        }
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (emailModal.classList.contains('email-modal--active') && e.key === 'Escape') {
                closeModal();
            }
        });
        
        console.log('Email modal events bound successfully');
    }
    
    /**
     * Open the email modal with animation
     */
    openEmailModal() {
        const emailModal = document.getElementById('email-modal');
        if (!emailModal) return;
        
        // Show modal
        emailModal.classList.add('email-modal--active');
        emailModal.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const closeButton = document.getElementById('email-modal-close');
        if (closeButton) {
            setTimeout(() => closeButton.focus(), 100);
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Dispatch event
        this.dispatchCustomEvent('emailModalOpened', {
            timestamp: new Date().toISOString()
        });
        
        console.log('Email modal opened');
    }
    
    /**
     * Close the email modal with animation
     */
    closeEmailModal() {
        const emailModal = document.getElementById('email-modal');
        if (!emailModal) return;
        
        // Hide modal
        emailModal.classList.remove('email-modal--active');
        emailModal.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to trigger button
        const emailButton = document.getElementById('email-notifications-btn');
        if (emailButton) {
            emailButton.focus();
        }
        
        // Dispatch event
        this.dispatchCustomEvent('emailModalClosed', {
            timestamp: new Date().toISOString()
        });
        
        console.log('Email modal closed');
    }
    
    /**
     * Save email settings and close modal
     */
    saveEmailSettings() {
        // Get form values
        const checkboxes = document.querySelectorAll('.email-modal__checkbox');
        const frequency = document.getElementById('email-frequency');
        const time = document.getElementById('email-time');
        
        const settings = {
            notifications: {
                dailyDigest: checkboxes[0]?.checked || false,
                importantUpdates: checkboxes[1]?.checked || false,
                marketing: checkboxes[2]?.checked || false,
                systemNotifications: checkboxes[3]?.checked || false
            },
            preferences: {
                frequency: frequency?.value || 'weekly',
                time: time?.value || 'afternoon'
            }
        };
        
        // Dispatch save event
        this.dispatchCustomEvent('emailSettingsSaved', {
            settings: settings,
            timestamp: new Date().toISOString()
        });
        
        console.log('Email settings saved:', settings);
        
        // Close modal
        this.closeEmailModal();
        
        // Show success feedback (you could add a toast notification here)
        this.showSuccessMessage('Email settings saved successfully!');
    }
    
    /**
     * Show success message (placeholder for future toast implementation)
     * @param {string} message - Success message to display
     */
    showSuccessMessage(message) {
        // This could be replaced with a proper toast notification system
        console.log('Success:', message);
        
        // For now, just log the message
        // In a real implementation, you might show a toast notification
    }
    
    /**
     * Bind event listeners for the notification modal
     */
    bindNotificationModal() {
        const notificationBtn = document.getElementById('notification-btn');
        const notificationModal = document.getElementById('notification-modal');
        const notificationCloseBtn = document.getElementById('notification-close-btn');
        
        if (!notificationBtn || !notificationModal || !notificationCloseBtn) {
            console.warn('Notification modal elements not found');
            return;
        }
        
        // Toggle notification modal
        notificationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleNotificationModal();
        });
        
        // Close modal when clicking close button
        notificationCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeNotificationModal();
        });
        
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            // Only close if notification modal is active and click is outside
            if (notificationModal.classList.contains('notification-modal--active') && 
                !notificationModal.contains(e.target) && 
                !notificationBtn.contains(e.target)) {
                this.closeNotificationModal();
            }
        });
        
        // Keyboard support
        notificationBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleNotificationModal();
            }
        });
        
        console.log('Notification modal events bound successfully');
    }
    
    /**
     * Toggle the notification modal
     */
    toggleNotificationModal() {
        const notificationModal = document.getElementById('notification-modal');
        const isActive = notificationModal.classList.contains('notification-modal--active');
        
        if (isActive) {
            this.closeNotificationModal();
        } else {
            this.openNotificationModal();
        }
    }
    
    /**
     * Open the notification modal
     */
    openNotificationModal() {
        const notificationModal = document.getElementById('notification-modal');
        
        if (!notificationModal) return;
        
        // Add active class
        notificationModal.classList.add('notification-modal--active');
        notificationModal.setAttribute('aria-hidden', 'false');
        
        // Dispatch event
        this.dispatchCustomEvent('notificationModalOpened', {
            timestamp: new Date().toISOString()
        });
        
        console.log('Notification modal opened');
    }
    
    /**
     * Close the notification modal
     */
    closeNotificationModal() {
        const notificationModal = document.getElementById('notification-modal');
        
        if (!notificationModal) return;
        
        // Remove active class
        notificationModal.classList.remove('notification-modal--active');
        notificationModal.setAttribute('aria-hidden', 'true');
        
        // Return focus to trigger
        const notificationBtn = document.getElementById('notification-btn');
        if (notificationBtn) {
            notificationBtn.focus();
        }
        
        // Dispatch event
        this.dispatchCustomEvent('notificationModalClosed', {
            timestamp: new Date().toISOString()
        });
        
        console.log('Notification modal closed');
    }
    
    /**
     * Bind event listeners for the user dropdown
     * Handles opening, closing, and menu interactions
     */
    bindUserDropdown() {
        const dropdownTrigger = document.getElementById('user-dropdown-trigger');
        const dropdownMenu = document.getElementById('user-dropdown-menu');
        const userDropdown = document.querySelector('.user-dropdown');
        const profileSettingsBtn = document.getElementById('profile-settings-btn');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (!dropdownTrigger || !dropdownMenu || !userDropdown) {
            console.warn('User dropdown elements not found');
            return;
        }
        
        // Toggle dropdown
        dropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleUserDropdown();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            // Only close if user dropdown is active and click is outside
            if (userDropdown.classList.contains('user-dropdown--active') && !userDropdown.contains(e.target)) {
                this.closeUserDropdown();
            }
        });
        
        // Profile settings
        if (profileSettingsBtn) {
            profileSettingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleProfileSettings();
            });
        }
        
        // Logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
        
        // Keyboard support
        dropdownTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleUserDropdown();
            }
        });
        
        console.log('User dropdown events bound successfully');
    }
    
    /**
     * Toggle the user dropdown menu
     */
    toggleUserDropdown() {
        const userDropdown = document.querySelector('.user-dropdown');
        const isActive = userDropdown.classList.contains('user-dropdown--active');
        
        if (isActive) {
            this.closeUserDropdown();
        } else {
            this.openUserDropdown();
        }
    }
    
    /**
     * Open the user dropdown menu
     */
    openUserDropdown() {
        const userDropdown = document.querySelector('.user-dropdown');
        const dropdownMenu = document.getElementById('user-dropdown-menu');
        
        if (!userDropdown || !dropdownMenu) return;
        
        // Add active class
        userDropdown.classList.add('user-dropdown--active');
        dropdownMenu.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const firstMenuItem = dropdownMenu.querySelector('.user-dropdown__item');
        if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 100);
        }
        
        // Dispatch event
        this.dispatchCustomEvent('userDropdownOpened', {
            timestamp: new Date().toISOString()
        });
        
        console.log('User dropdown opened');
    }
    
    /**
     * Close the user dropdown menu
     */
    closeUserDropdown() {
        const userDropdown = document.querySelector('.user-dropdown');
        const dropdownMenu = document.getElementById('user-dropdown-menu');
        
        if (!userDropdown || !dropdownMenu) return;
        
        // Remove active class
        userDropdown.classList.remove('user-dropdown--active');
        dropdownMenu.setAttribute('aria-hidden', 'true');
        
        // Return focus to trigger
        const dropdownTrigger = document.getElementById('user-dropdown-trigger');
        if (dropdownTrigger) {
            dropdownTrigger.focus();
        }
        
        // Dispatch event
        this.dispatchCustomEvent('userDropdownClosed', {
            timestamp: new Date().toISOString()
        });
        
        console.log('User dropdown closed');
    }
    
    /**
     * Handle profile settings button click
     */
    handleProfileSettings() {
        // Close dropdown
        this.closeUserDropdown();
        
        // Dispatch event
        this.dispatchCustomEvent('profileSettingsClicked', {
            timestamp: new Date().toISOString()
        });
        
        console.log('Profile settings clicked');
        
        // You could open a profile settings modal here
        // this.openProfileSettingsModal();
    }
    
    /**
     * Handle logout button click
     */
    handleLogout() {
        // Close dropdown
        this.closeUserDropdown();
        
        // Dispatch event
        this.dispatchCustomEvent('logoutClicked', {
            timestamp: new Date().toISOString()
        });
        
        console.log('Logout clicked');
        
        // Show confirmation dialog
        if (confirm('Are you sure you want to logout?')) {
            // Perform logout action
            this.performLogout();
        }
    }
    
    /**
     * Perform the actual logout action
     */
    performLogout() {
        // Dispatch logout event
        this.dispatchCustomEvent('logoutConfirmed', {
            timestamp: new Date().toISOString()
        });
        
        console.log('Logout confirmed - redirecting to login page');
        
        // In a real application, you would:
        // 1. Clear authentication tokens
        // 2. Clear user session
        // 3. Redirect to login page
        
        // For demo purposes, just reload the page
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    
    /**
     * Handle keyboard navigation for tabs (arrow keys, home, end)
     * @param {KeyboardEvent} e - The keyboard event
     * @param {HTMLElement} currentButton - Currently focused tab button
     */
    handleTabKeyNavigation(e, currentButton) {
        const tabButtons = Array.from(document.querySelectorAll('.tab-navigation__button'));
        const currentIndex = tabButtons.indexOf(currentButton);
        let targetIndex;
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                targetIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
                tabButtons[targetIndex].focus();
                break;
                
            case 'ArrowRight':
                e.preventDefault();
                targetIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
                tabButtons[targetIndex].focus();
                break;
                
            case 'Home':
                e.preventDefault();
                tabButtons[0].focus();
                break;
                
            case 'End':
                e.preventDefault();
                tabButtons[tabButtons.length - 1].focus();
                break;
                
            case 'Enter':
            case ' ':
                e.preventDefault();
                const tabId = this.extractTabId(currentButton.id);
                if (tabId) {
                    this.activateTab(tabId);
                }
                break;
        }
    }
    
    /**
     * Activate a specific tab and update UI states
     * @param {number} tabId - ID of the tab to activate
     */
    activateTab(tabId) {
        try {
            const tabButtons = document.querySelectorAll('.tab-navigation__button');
            const tabContents = document.querySelectorAll('.tab-content');
            
            // Remove active states from all tabs
            tabButtons.forEach(btn => {
                btn.classList.remove('tab-navigation__button--active');
                btn.setAttribute('aria-selected', 'false');
            });
            
            tabContents.forEach(content => {
                content.classList.remove('tab-content--active');
            });
            
            // Add active states to target tab
            const activeButton = document.getElementById(`tab-${tabId}`);
            const activeContent = document.getElementById(`tab-panel-${tabId}`);
            
            if (activeButton && activeContent) {
                activeButton.classList.add('tab-navigation__button--active');
                activeButton.setAttribute('aria-selected', 'true');
                activeContent.classList.add('tab-content--active');
                
                console.log(`Activated tab ${tabId}`);
                
                // Dispatch tab change event
                this.dispatchCustomEvent('tabChanged', { 
                    tabId: tabId,
                    tabTitle: this.config.tabs.find(tab => tab.id === tabId)?.title
                });
                
            } else {
                throw new Error(`Tab elements not found for ID: ${tabId}`);
            }
            
        } catch (error) {
            console.error('Error activating tab:', error);
            this.handleError(error, 'tab-activation');
        }
    }
    
    /**
     * Get the currently active tab ID
     * @returns {number|null} - Active tab ID or null if none found
     */
    getActiveTabId() {
        const activeButton = document.querySelector('.tab-navigation__button--active');
        if (activeButton) {
            return this.extractTabId(activeButton.id);
        }
        return null;
    }
    
    /**
     * Extract tab ID from element ID string
     * @param {string} elementId - Element ID (e.g., 'tab-1', 'tab-panel-2')
     * @returns {number|null} - Extracted tab ID or null if invalid
     */
    extractTabId(elementId) {
        const match = elementId.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : null;
    }
    
    /**
     * Update tab content dynamically
     * @param {number} tabId - Tab ID to update
     * @param {Object} newConfig - New configuration for the tab
     */
    updateTabContent(tabId, newConfig) {
        try {
            const panel = document.getElementById(`tab-panel-${tabId}`);
            if (!panel) {
                throw new Error(`Tab panel not found for ID: ${tabId}`);
            }
            
            // Update configuration
            const tabIndex = this.config.tabs.findIndex(tab => tab.id === tabId);
            if (tabIndex === -1) {
                throw new Error(`Tab configuration not found for ID: ${tabId}`);
            }
            
            this.config.tabs[tabIndex] = { 
                ...this.config.tabs[tabIndex], 
                ...newConfig 
            };
            
            // Regenerate content
            this.populateTabContent(panel, this.config.tabs[tabIndex]);
            
            console.log(`Updated content for tab ${tabId}`);
            
            // Dispatch update event
            this.dispatchCustomEvent('tabContentUpdated', { 
                tabId: tabId,
                newConfig: newConfig
            });
            
        } catch (error) {
            console.error('Error updating tab content:', error);
            this.handleError(error, 'tab-update');
        }
    }
    
    /**
     * Add a new tab dynamically
     * @param {Object} tabConfig - Configuration for the new tab
     */
    addTab(tabConfig) {
        try {
            // Validate required properties
            if (!tabConfig.id || !tabConfig.title) {
                throw new Error('Tab configuration must include id and title');
            }
            
            // Check if tab already exists
            const existingTab = this.config.tabs.find(tab => tab.id === tabConfig.id);
            if (existingTab) {
                throw new Error(`Tab with ID ${tabConfig.id} already exists`);
            }
            
            // Add to configuration
            this.config.tabs.push(tabConfig);
            
            // Create tab button
            const tabNav = document.querySelector('.tab-navigation');
            if (tabNav) {
                const newButton = document.createElement('button');
                newButton.className = 'tab-navigation__button';
                newButton.type = 'button';
                newButton.role = 'tab';
                newButton.setAttribute('aria-selected', 'false');
                newButton.setAttribute('aria-controls', `tab-panel-${tabConfig.id}`);
                newButton.id = `tab-${tabConfig.id}`;
                newButton.textContent = `Tab ${tabConfig.id}`;
                
                tabNav.appendChild(newButton);
            }
            
            // Create tab panel
            const container = document.querySelector('.tab-content-container');
            if (container) {
                const tabPanel = this.createTabPanel(tabConfig);
                container.appendChild(tabPanel);
            }
            
            // Rebind events to include new tab
            this.bindEvents();
            
            console.log(`Added new tab with ID: ${tabConfig.id}`);
            
            // Dispatch add event
            this.dispatchCustomEvent('tabAdded', { 
                tabId: tabConfig.id,
                tabConfig: tabConfig
            });
            
        } catch (error) {
            console.error('Error adding tab:', error);
            this.handleError(error, 'tab-add');
        }
    }
    
    /**
     * Remove a tab dynamically
     * @param {number} tabId - ID of the tab to remove
     */
    removeTab(tabId) {
        try {
            // Don't allow removing the last tab
            if (this.config.tabs.length <= 1) {
                throw new Error('Cannot remove the last remaining tab');
            }
            
            // Remove from configuration
            const tabIndex = this.config.tabs.findIndex(tab => tab.id === tabId);
            if (tabIndex === -1) {
                throw new Error(`Tab with ID ${tabId} not found`);
            }
            
            this.config.tabs.splice(tabIndex, 1);
            
            // Remove DOM elements
            const button = document.getElementById(`tab-${tabId}`);
            const panel = document.getElementById(`tab-panel-${tabId}`);
            
            if (button) button.remove();
            if (panel) panel.remove();
            
            // If removed tab was active, activate first available tab
            if (this.getActiveTabId() === tabId) {
                this.activateTab(this.config.tabs[0].id);
            }
            
            console.log(`Removed tab with ID: ${tabId}`);
            
            // Dispatch remove event
            this.dispatchCustomEvent('tabRemoved', { 
                tabId: tabId
            });
            
        } catch (error) {
            console.error('Error removing tab:', error);
            this.handleError(error, 'tab-remove');
        }
    }
    
    /**
     * Dispatch custom events for external listeners
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event detail data
     */
    dispatchCustomEvent(eventName, detail) {
        try {
            const event = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
        } catch (error) {
            console.error('Error dispatching custom event:', error);
        }
    }
    
    /**
     * Handle and log errors with context
     * @param {Error} error - The error object
     * @param {string} context - Context where the error occurred
     */
    handleError(error, context) {
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        console.error('Dashboard Error:', errorInfo);
        
        // Dispatch error event for external error handling
        this.dispatchCustomEvent('dashboardError', errorInfo);
    }
    
    /**
     * Get dashboard configuration (read-only)
     * @returns {Object} - Copy of the current configuration
     */
    getConfig() {
        return JSON.parse(JSON.stringify(this.config));
    }
    
    /**
     * Refresh the entire dashboard content
     * Useful after bulk configuration changes
     */
    refresh() {
        try {
            this.generateTabContent();
            this.bindEvents();
            
            // Reactivate current tab or default to first tab
            const currentTabId = this.getActiveTabId() || this.config.tabs[0]?.id;
            if (currentTabId) {
                this.activateTab(currentTabId);
            }
            
            console.log('Dashboard refreshed successfully');
            
            // Dispatch refresh event
            this.dispatchCustomEvent('dashboardRefreshed', {
                tabCount: this.config.tabs.length
            });
            
        } catch (error) {
            console.error('Error refreshing dashboard:', error);
            this.handleError(error, 'refresh');
        }
    }
    
    /**
     * Destroy the dashboard instance and clean up event listeners
     */
    destroy() {
        try {
            // Remove event listeners
            const tabButtons = document.querySelectorAll('.tab-navigation__button');
            tabButtons.forEach(button => {
                button.removeEventListener('click', this.activateTab);
                button.removeEventListener('keydown', this.handleTabKeyNavigation);
            });
            
            console.log('Dashboard destroyed successfully');
            
            // Dispatch destroy event
            this.dispatchCustomEvent('dashboardDestroyed', {});
            
        } catch (error) {
            console.error('Error destroying dashboard:', error);
        }
    }
}

/**
 * ==========================================================================
 * APPLICATION INITIALIZATION
 * ==========================================================================
 */

/**
 * Initialize dashboard when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Create global dashboard instance
        window.webMotionDashboard = new WebMotionDashboard();
        
        // Optional: Set up global error handling for unhandled errors
        window.addEventListener('error', (e) => {
            console.error('Unhandled JavaScript Error:', {
                message: e.message,
                filename: e.filename,
                line: e.lineno,
                column: e.colno,
                error: e.error
            });
        });
        
        // Optional: Set up global promise rejection handling
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
        });
        
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
    }
});

/**
 * ==========================================================================
 * UTILITY FUNCTIONS FOR EXTERNAL USE
 * ==========================================================================
 */

/**
 * Get the dashboard instance safely
 * @returns {WebMotionDashboard|null} - Dashboard instance or null if not available
 */
window.getDashboard = function() {
    return window.webMotionDashboard || null;
};

/**
 * Check if dashboard is ready
 * @returns {boolean} - True if dashboard is initialized
 */
window.isDashboardReady = function() {
    return !!(window.webMotionDashboard && typeof window.webMotionDashboard.getActiveTabId === 'function');
};

/**
 * ==========================================================================
 * END OF FILE
 * ==========================================================================
 */ 