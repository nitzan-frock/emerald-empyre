<script>
  let mobileMenuOpen = $state(false);
  
  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#music', label: 'Music' },
    { href: '#tours', label: 'Tours' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' }
  ];
  
  function handleNavClick() {
    mobileMenuOpen = false;
  }
</script>

<nav class="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-emerald-900/30">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <a href="#home" class="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300" onclick={handleNavClick}>
        <img 
          src="/emerald-stick.png" 
          alt="Emerald" 
          class="h-8 md:h-10 object-contain filter invert brightness-110 contrast-110"
        />
        <img 
          src="/empyre-stick.png" 
          alt="Empyre" 
          class="h-8 md:h-10 object-contain filter invert brightness-110 contrast-110"
        />
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex space-x-8">
        {#each navItems as item}
          <a 
            href={item.href} 
            class="text-gray-300 hover:text-emerald-400 transition-colors duration-300"
            onclick={handleNavClick}
          >
            {item.label}
          </a>
        {/each}
      </div>
      
      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden text-gray-300 hover:text-emerald-400"
        onclick={() => mobileMenuOpen = !mobileMenuOpen}
        aria-label="Toggle mobile menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
      <div class="md:hidden pb-4">
        <div class="flex flex-col space-y-2">
          {#each navItems as item}
            <a 
              href={item.href} 
              class="text-gray-300 hover:text-emerald-400 transition-colors duration-300 py-2"
              onclick={handleNavClick}
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</nav>
