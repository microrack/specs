// Make header title clickable
// - First topic (site name "Docs"): navigate to root
// - Second topic (page title on scroll): scroll to top of current page
document.addEventListener('DOMContentLoaded', function() {
  const headerTitle = document.querySelector('.md-header__title');
  if (headerTitle) {
    headerTitle.addEventListener('click', function(e) {
      // Don't interfere with existing links
      if (e.target.tagName === 'A') return;
      
      // Check if clicking on the page title (second topic) vs site name (first topic)
      const target = e.target.closest('.md-header__topic');
      if (target && !target.matches(':first-child')) {
        // Second topic (page title) - scroll to top of current page
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Also remove any hash from URL
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname);
        }
      } else {
        // First topic or logo area - navigate to root
        window.location.href = '/';
      }
    });
  }
  
  // Add home, docs and forum links to tabs row (aligned right on desktop)
  const tabsList = document.querySelector('.md-tabs__list');
  if (tabsList) {
    // Add icons to Mechanical and Electrical tabs
    const mechanicalTab = Array.from(tabsList.querySelectorAll('.md-tabs__link')).find(link => 
      link.textContent.trim() === 'Mechanical'
    );
    if (mechanicalTab) {
      const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" style="vertical-align: middle; margin-right: 0.3rem;"><path fill="currentColor" d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>';
      mechanicalTab.innerHTML = icon + 'Mechanical';
    }
    
    const electricalTab = Array.from(tabsList.querySelectorAll('.md-tabs__link')).find(link => 
      link.textContent.trim() === 'Electrical'
    );
    if (electricalTab) {
      const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style="vertical-align: middle; margin-right: 0.3rem;"><path fill="currentColor" d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>';
      electricalTab.innerHTML = icon + 'Electrical';
    }
    
    // Modules link
    const modulesItem = document.createElement('li');
    modulesItem.className = 'md-tabs__item md-tabs__item--modules';
    modulesItem.innerHTML = '<a href="https://modules.microrack.org" class="md-tabs__link"><span style="font-size: 1rem; line-height: .85rem; margin-right: 0.3rem; vertical-align: middle;">⊶</span>Modules</a>';
    tabsList.appendChild(modulesItem);
    
    // Forum link
    const forumItem = document.createElement('li');
    forumItem.className = 'md-tabs__item md-tabs__item--forum';
    forumItem.innerHTML = '<a href="https://forum.microrack.org" class="md-tabs__link" target="_blank" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style="vertical-align: middle; margin-right: 0.3rem;"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L2 22l5.71-.97A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.4 0-2.74-.36-3.91-1.03l-.28-.16-2.89.49.49-2.89-.16-.28A7.96 7.96 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/></svg>Forum</a>';
    tabsList.appendChild(forumItem);

    // Home link
    const homeItem = document.createElement('li');
    homeItem.className = 'md-tabs__item md-tabs__item--home';
    homeItem.innerHTML = '<a href="https://microrack.org" class="md-tabs__link" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style="vertical-align: middle; margin-right: 0.3rem;"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>Home</a>';
    tabsList.appendChild(homeItem);
  }
  
  // Add modules and forum links to mobile drawer (fixed at bottom)
  const drawerNav = document.querySelector('.md-nav--primary');
  if (drawerNav) {
    const linksContainer = document.createElement('div');
    linksContainer.className = 'md-nav__external-links';
    linksContainer.innerHTML = '<a href="https://modules.microrack.org" class="md-nav__external-link" target="_blank" rel="noopener"><span style="font-size: 1.2rem; line-height: 1; margin-right: 0.2rem; vertical-align: middle;">⊶</span>Modules</a><a href="https://forum.microrack.org" class="md-nav__external-link" target="_blank" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L2 22l5.71-.97A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.4 0-2.74-.36-3.91-1.03l-.28-.16-2.89.49.49-2.89-.16-.28A7.96 7.96 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/></svg>Forum</a>';
    drawerNav.appendChild(linksContainer);
  }
  
  // Reset mobile drawer to root level when opened
  // This ensures users always see the main navigation first
  const drawerToggle = document.getElementById('__drawer');
  if (drawerToggle) {
    drawerToggle.addEventListener('change', function() {
      if (this.checked) {
        // Drawer is opening - collapse all nav sections to show root level
        document.querySelectorAll('.md-nav__toggle').forEach(function(toggle) {
          // Only reset section toggles, not the drawer itself or TOC
          if (toggle.id && toggle.id.startsWith('__nav_')) {
            toggle.checked = false;
          }
        });
      }
    });
  }
  
  // For module pages: move h1 title after the first image
  const isModulePage = window.location.pathname.match(/\/modules\/mod-/);
  
  if (isModulePage) {
    const content = document.querySelector('.md-content__inner');
    if (content) {
      const h1 = content.querySelector('h1');
      const firstImg = content.querySelector('img');
      if (h1 && firstImg) {
        // Find the parent paragraph of the image (if wrapped in <p>)
        const imgParent = firstImg.closest('p') || firstImg;
        // Insert h1 after the image/image paragraph
        imgParent.after(h1);
      }
    }
  }
  
  // Add prev/next navigation buttons for all pages
  addPageNavigation();
  
  function addPageNavigation() {
    const content = document.querySelector('.md-content__inner');
    if (!content) return;
    
    // Collect section info from tabs (these are the main sections)
    const sections = [];
    document.querySelectorAll('.md-tabs__link').forEach(function(tab) {
      const href = tab.getAttribute('href');
      if (href) {
        const fullPath = new URL(href, window.location.origin).pathname.replace(/\/$/, '');
        sections.push({
          href: href,
          name: tab.textContent.trim(),
          fullPath: fullPath
        });
      }
    });
    
    // Helper to get section index for a path
    function getSectionIndex(path) {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (path === sections[i].fullPath || path.startsWith(sections[i].fullPath + '/')) {
          return i;
        }
      }
      return -1;
    }
    
    // Collect all navigation links from the sidebar in order
    const allLinks = [];
    const seen = new Set();
    
    // Get links from the primary nav (left sidebar)
    document.querySelectorAll('.md-nav--primary .md-nav__link').forEach(function(link) {
      const href = link.getAttribute('href');
      // Skip anchors (same page links), empty hrefs, and javascript links
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      
      // Normalize the href to compare
      const fullHref = new URL(href, window.location.origin).pathname.replace(/\/$/, '');
      
      if (!seen.has(fullHref)) {
        seen.add(fullHref);
        allLinks.push({
          href: href,
          name: link.textContent.trim(),
          fullPath: fullHref,
          sectionIndex: getSectionIndex(fullHref)
        });
      }
    });
    
    // Find current page index
    const currentPath = window.location.pathname.replace(/\/$/, '');
    let currentIndex = -1;
    
    for (let i = 0; i < allLinks.length; i++) {
      if (allLinks[i].fullPath === currentPath) {
        currentIndex = i;
        break;
      }
    }
    
    // If not found, try partial match
    if (currentIndex === -1) {
      for (let i = 0; i < allLinks.length; i++) {
        if (currentPath.endsWith(allLinks[i].fullPath) || allLinks[i].fullPath.endsWith(currentPath)) {
          currentIndex = i;
          break;
        }
      }
    }
    
    if (currentIndex === -1) return;
    
    const currentSectionIndex = getSectionIndex(currentPath);
    let prevItem = null;
    let nextItem = null;
    
    // Check if we're on the index/root page (handles /, empty string, or just /index.html)
    const normalizedPath = currentPath.replace(/\/index\.html?$/, '').replace(/\/$/, '');
    const isIndexPage = normalizedPath === '' || normalizedPath === '/';
    
    // Previous: link to main site for index page, or specs index for others
    if (isIndexPage) {
      // Index page - link to main site
      prevItem = { label: 'Main Site', href: 'https://microrack.org', name: 'microrack.org' };
    } else {
      // Non-index pages: link to specs index page
      prevItem = { label: 'Main', href: '/', name: 'Specification' };
    }
    
    // Next: find next page in SAME section, or link to next section's index
    // Look for next page that's in the same section
    let nextInSection = null;
    for (let i = currentIndex + 1; i < allLinks.length; i++) {
      if (allLinks[i].sectionIndex === currentSectionIndex) {
        nextInSection = allLinks[i];
        break;
      }
    }
    
    if (nextInSection) {
      // Found another page in same section
      nextItem = { label: 'Next', ...nextInSection };
    } else {
      // No more pages in current section, link to next section's index
      if (currentSectionIndex >= 0 && currentSectionIndex < sections.length - 1) {
        const nextSection = sections[currentSectionIndex + 1];
        nextItem = { label: 'Next', href: nextSection.href, name: nextSection.name, fullPath: nextSection.fullPath };
      }
    }
    
    // Custom override: Electrical page should link to Ecosystem
    if (currentPath.match(/\/specification\/electrical/)) {
      // Find Ecosystem section
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].fullPath.includes('ecosystem')) {
          nextItem = { label: 'Next', href: sections[i].href, name: sections[i].name, fullPath: sections[i].fullPath };
          break;
        }
      }
    }
    
    // Only show if we have at least one link
    if (!prevItem && !nextItem) return;
    
    // Create navigation container
    const navContainer = document.createElement('div');
    navContainer.className = 'page-nav';
    
    // Previous button
    if (prevItem) {
      const prevBtn = document.createElement('a');
      prevBtn.href = prevItem.href;
      prevBtn.className = 'page-nav__btn page-nav__btn--prev';
      prevBtn.innerHTML = '<span class="page-nav__arrow">‹</span><div class="page-nav__text"><span class="page-nav__label">' + prevItem.label + '</span><span class="page-nav__name">' + prevItem.name + '</span></div>';
      navContainer.appendChild(prevBtn);
    } else {
      const spacer = document.createElement('div');
      spacer.className = 'page-nav__spacer';
      navContainer.appendChild(spacer);
    }
    
    // Next button
    if (nextItem) {
      const nextBtn = document.createElement('a');
      nextBtn.href = nextItem.href;
      nextBtn.className = 'page-nav__btn page-nav__btn--next';
      nextBtn.innerHTML = '<div class="page-nav__text"><span class="page-nav__label">' + nextItem.label + '</span><span class="page-nav__name">' + nextItem.name + '</span></div><span class="page-nav__arrow">›</span>';
      navContainer.appendChild(nextBtn);
    } else {
      const spacer = document.createElement('div');
      spacer.className = 'page-nav__spacer';
      navContainer.appendChild(spacer);
    }
    
    // Insert at end of content
    const article = content.querySelector('article') || content;
    article.appendChild(navContainer);
  }
});
