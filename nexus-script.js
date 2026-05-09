// ==========================================================================
// NEXUS CYBERPUNK - SUPREME JS MATRIX
// ==========================================================================

class NexusMatrix {
  constructor() {
    this.matrix = document.querySelector('.nexus-matrix');
    this.loader = document.querySelector('.nexus-loader');
    this.navNodes = document.querySelectorAll('.nav-node');
    this.cubeProjects = document.querySelectorAll('.project-cube');
    
    this.initMatrix();
    this.bindEvents();
    this.hackStats();
    this.orbitTech();
    this.matrixCode();
  }

  initMatrix() {
    // Loader sequence
    setTimeout(() => {
      this.loader.classList.add('fade-out');
    }, 3500);
    
    // Matrix reveal
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      this.matrix.classList.add('matrix-revealed');
    }, 4000);
  }

  bindEvents() {
    // Navigation
    this.navNodes.forEach(node => {
      node.addEventListener('click', (e) => {
        e.preventDefault();
        const sector = node.getAttribute('data-sector');
        this.navigateToSector(sector);
      });
    });

    // Cube hover effects
    this.cubeProjects.forEach(cube => {
      cube.addEventListener('mouseenter', () => {
        cube.style.transform = 'rotateY(10deg) rotateX(5deg) translateZ(50px)';
      });
      
      cube.addEventListener('mouseleave', () => {
        cube.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
      });
    });

    // Terminal input
    document.querySelector('.terminal-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.executeTerminalCommand(e.target.value);
        e.target.value = '';
      }
    });

    // Window events
    window.addEventListener('scroll', () => this.parallaxGrid());
    window.addEventListener('mousemove', (e) => this.mouseMatrix(e));
  }

  navigateToSector(sector) {
    const target = document.getElementById(sector);
    target.scrollIntoView({ behavior: 'smooth' });
    
    // Update active node
    this.navNodes.forEach(n => n.classList.remove('active'));
    event.target.classList.add('active');
  }

  hackStats() {
    const stats = document.querySelectorAll('.stat-value[data-hack]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stat = entry.target;
          const target = parseFloat(stat.getAttribute('data-hack'));
          let current = 0;
          
          const hackInterval = setInterval(() => {
            if (current < target) {
              current += 0.01;
              stat.textContent = current.toFixed(target > 10 ? 1 : 0);
              if (target > 10) stat.textContent += 'Y';
            } else {
              clearInterval(hackInterval);
            }
          }, 30);
          
          observer.unobserve(entry.target);
        }
      });
    });
    
    stats.forEach(stat => observer.observe(stat));
  }

  orbitTech() {
    const orbitItems = document.querySelectorAll('.orbit-item');
    let rotation = 0;
    
    const orbit = () => {
      rotation += 0.5;
      orbitItems.forEach((item, index) => {
        const angle = (rotation + (index * 90)) * Math.PI / 180;
        item.style.transform = `
          translateX(${150 * Math.cos(angle)}px) 
          translateY(${150 * Math.sin(angle)}px)
          rotate(${rotation}deg)
        `;
      });
      requestAnimationFrame(orbit);
    };
    
    orbit();
  }

  matrixCode() {
    const codeSpans = document.querySelectorAll('.matrix-code span');
    
    const generateCode = () => {
      const codes = ['0101', '1010', 'KOTLIN', 'FIREBASE', 'JETPACK', 'ANDROID', 'NEXUS', 'HACK', 'DEPLOY'];
      codeSpans.forEach(span => {
        span.textContent = codes[Math.floor(Math.random() * codes.length)];
      });
    };
    
    generateCode();
    setInterval(generateCode, 200);
  }

  executeTerminalCommand(command) {
    const log = document.querySelector('.terminal-log');
    const newLog = document.createElement('span');
    newLog.textContent = `> ${command}`;
    newLog.style.color = '#00ff88';
    log.appendChild(newLog);
    
    // Auto scroll
    log.scrollTop = log.scrollHeight;
    
    // Response
    setTimeout(() => {
      const response = document.createElement('span');
      response.textContent = `ACK: Command executed. Contact initiated.`;
      response.style.color = '#00ffff';
      log.appendChild(response);
      log.scrollTop = log.scrollHeight;
    }, 500);
  }

  parallaxGrid() {
    const scrolled = window.pageYOffset;
    const grid = document.querySelector('.cyber-grid');
    grid.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.05}px)`;
  }

  mouseMatrix(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.holo-badge, .node-glow').forEach(el => {
      const rect = el.getBoundingClientRect();
      const x = mouseX * rect.width;
      const y = mouseY * rect.height;
      el.style.background = `radial-gradient(circle ${x}px ${y}px at ${mouseX * 100}% ${mouseY * 100}%, rgba(0,255,255,0.4), transparent 70%)`;
    });
  }
}

// Initialize Nexus Matrix
document.addEventListener('DOMContentLoaded', () => {
  new NexusMatrix();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
