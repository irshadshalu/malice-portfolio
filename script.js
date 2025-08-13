// Window Management System
class WindowManager {
    constructor() {
        this.windows = document.querySelectorAll('.window');
        this.activeWindow = null;
        this.draggedWindow = null;
        this.offset = { x: 0, y: 0 };
        this.zIndex = 100;
        
        this.init();
    }
    
    init() {
        // Initialize draggable windows
        this.windows.forEach(window => {
            const header = window.querySelector('.window-header');
            const closeBtn = window.querySelector('.close');
            const minimizeBtn = window.querySelector('.minimize');
            const maximizeBtn = window.querySelector('.maximize');
            
            // Make window draggable
            header.addEventListener('mousedown', (e) => this.startDrag(e, window));
            
            // Window controls
            closeBtn.addEventListener('click', () => this.closeWindow(window));
            minimizeBtn.addEventListener('click', () => this.minimizeWindow(window));
            maximizeBtn.addEventListener('click', () => this.maximizeWindow(window));
            
            // Bring to front on click
            window.addEventListener('mousedown', () => this.bringToFront(window));
        });
        
        // Global mouse events for dragging
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDrag());
    }
    
    startDrag(e, window) {
        if (e.target.tagName === 'BUTTON') return;
        
        this.draggedWindow = window;
        this.bringToFront(window);
        
        const rect = window.getBoundingClientRect();
        this.offset.x = e.clientX - rect.left;
        this.offset.y = e.clientY - rect.top;
        
        window.style.cursor = 'move';
    }
    
    drag(e) {
        if (!this.draggedWindow) return;
        
        e.preventDefault();
        
        const x = e.clientX - this.offset.x;
        const y = e.clientY - this.offset.y;
        
        // Keep window within viewport
        const maxX = window.innerWidth - this.draggedWindow.offsetWidth;
        const maxY = window.innerHeight - this.draggedWindow.offsetHeight - 50; // Account for taskbar
        
        this.draggedWindow.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
        this.draggedWindow.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    }
    
    stopDrag() {
        if (this.draggedWindow) {
            this.draggedWindow.style.cursor = 'default';
            this.draggedWindow = null;
        }
    }
    
    bringToFront(window) {
        if (this.activeWindow) {
            this.activeWindow.classList.remove('active');
        }
        
        window.classList.add('active');
        window.style.zIndex = ++this.zIndex;
        this.activeWindow = window;
        
        // Update taskbar
        this.updateTaskbar(window.id);
    }
    
    closeWindow(window) {
        window.style.display = 'none';
        window.classList.remove('active');
        
        // Update taskbar
        const taskbarItem = document.querySelector(`[data-window="${window.id}"]`);
        if (taskbarItem) {
            taskbarItem.classList.remove('active');
        }
    }
    
    minimizeWindow(window) {
        window.classList.add('minimized');
        setTimeout(() => {
            window.style.display = 'none';
            window.classList.remove('minimized');
        }, 300);
        
        // Update taskbar
        const taskbarItem = document.querySelector(`[data-window="${window.id}"]`);
        if (taskbarItem) {
            taskbarItem.classList.remove('active');
        }
    }
    
    maximizeWindow(window) {
        const isMaximized = window.getAttribute('data-maximized') === 'true';
        
        if (isMaximized) {
            // Restore
            window.style.width = window.getAttribute('data-old-width');
            window.style.height = window.getAttribute('data-old-height');
            window.style.left = window.getAttribute('data-old-left');
            window.style.top = window.getAttribute('data-old-top');
            window.setAttribute('data-maximized', 'false');
        } else {
            // Maximize
            window.setAttribute('data-old-width', window.style.width || '400px');
            window.setAttribute('data-old-height', window.style.height || '300px');
            window.setAttribute('data-old-left', window.style.left);
            window.setAttribute('data-old-top', window.style.top);
            
            window.style.width = '100%';
            window.style.height = 'calc(100vh - 50px)';
            window.style.left = '0';
            window.style.top = '0';
            window.setAttribute('data-maximized', 'true');
        }
    }
    
    showWindow(windowId) {
        const window = document.getElementById(windowId);
        if (!window) return;
        
        window.style.display = 'block';
        this.bringToFront(window);
        
        // Center window if it's first time showing
        if (!window.getAttribute('data-positioned')) {
            const x = (window.innerWidth - window.offsetWidth) / 2;
            const y = (window.innerHeight - window.offsetHeight - 50) / 2;
            window.style.left = x + 'px';
            window.style.top = y + 'px';
            window.setAttribute('data-positioned', 'true');
        }
    }
    
    updateTaskbar(activeWindowId) {
        const taskbarItems = document.querySelectorAll('.taskbar-item');
        taskbarItems.forEach(item => {
            if (item.getAttribute('data-window') === activeWindowId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

// Taskbar System
class TaskbarManager {
    constructor(windowManager) {
        this.windowManager = windowManager;
        this.taskbarItems = document.querySelectorAll('.taskbar-item');
        
        this.init();
    }
    
    init() {
        this.taskbarItems.forEach(item => {
            item.addEventListener('click', () => {
                const windowId = item.getAttribute('data-window');
                const window = document.getElementById(windowId);
                
                if (window.style.display === 'none') {
                    this.windowManager.showWindow(windowId);
                    item.classList.add('active');
                } else if (window.classList.contains('active')) {
                    this.windowManager.minimizeWindow(window);
                    item.classList.remove('active');
                } else {
                    this.windowManager.bringToFront(window);
                    item.classList.add('active');
                }
            });
        });
    }
}

// Background Pattern Interactive Effect
class BackgroundEffect {
    constructor() {
        this.pattern = document.querySelector('.background-pattern');
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            this.pattern.style.setProperty('--mouse-x', `${x}%`);
            this.pattern.style.setProperty('--mouse-y', `${y}%`);
        });
    }
}

// Console Functionality
class RetroConsole {
    constructor() {
        this.console = document.querySelector('.console pre');
        this.commands = {
            help: 'Available commands: about, skills, projects, contact, clear',
            about: 'I\'m a Jr. Product Designer from Bengaluru, India with 1.5 years of experience.',
            skills: 'UI/UX Design, Prototyping, Wireframing, User Research, Interaction Design',
            projects: 'Type "open projects" to view my portfolio',
            contact: 'Email: bhushan@example.com | LinkedIn: /in/bhushan-talukdar',
            clear: 'CLEAR'
        };
        
        this.init();
    }
    
    init() {
        // Add input functionality if console window exists
        const consoleWindow = document.getElementById('console-window');
        if (!consoleWindow) return;
        
        // Create input line
        const inputLine = document.createElement('div');
        inputLine.className = 'console-input';
        inputLine.innerHTML = '> <input type="text" class="console-input-field" autofocus>';
        this.console.parentElement.appendChild(inputLine);
        
        const input = inputLine.querySelector('.console-input-field');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(input.value);
                input.value = '';
            }
        });
    }
    
    executeCommand(command) {
        const cmd = command.toLowerCase().trim();
        this.console.textContent += `\n> ${command}\n`;
        
        if (cmd === 'clear') {
            this.console.textContent = '> Welcome to Bhushan\'s Portfolio Terminal\n> Type \'help\' for available commands\n';
            return;
        }
        
        if (cmd === 'open projects') {
            window.windowManager.showWindow('projects-window');
            this.console.textContent += 'Opening projects window...\n';
            return;
        }
        
        const response = this.commands[cmd] || `Command not found: ${cmd}`;
        this.console.textContent += response + '\n';
        
        // Scroll to bottom
        this.console.parentElement.scrollTop = this.console.parentElement.scrollHeight;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.windowManager = new WindowManager();
    window.taskbarManager = new TaskbarManager(window.windowManager);
    window.backgroundEffect = new BackgroundEffect();
    window.retroConsole = new RetroConsole();
    
    // Add some style to console input
    const style = document.createElement('style');
    style.textContent = `
        .console-input {
            background: #000;
            color: #0f0;
            padding: 0 12px 12px;
            font-family: 'VT323', monospace;
        }
        
        .console-input-field {
            background: transparent;
            border: none;
            color: #0f0;
            font-family: 'VT323', monospace;
            font-size: 14px;
            outline: none;
            width: calc(100% - 20px);
        }
    `;
    document.head.appendChild(style);
    
    // Show intro window by default
    const introTaskbarItem = document.querySelector('[data-window="intro-window"]');
    if (introTaskbarItem) {
        introTaskbarItem.classList.add('active');
    }
});

// Add some fun easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    window.konamiProgress = window.konamiProgress || 0;
    
    if (e.key === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        
        if (window.konamiProgress === konamiCode.length) {
            alert('🎮 Achievement Unlocked: Retro Master! 🎮');
            document.body.style.animation = 'rainbow 2s linear infinite';
            
            // Add rainbow animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
});