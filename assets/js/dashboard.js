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
        
        console.log(`Bound events to ${tabButtons.length} tab buttons`);
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