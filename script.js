let currentTab = 'login';

function switchTab(tab) {
    currentTab = tab;
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginTabBtn = document.getElementById('loginTabBtn');
    const signupTabBtn = document.getElementById('signupTabBtn');

    hideToast();

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTabBtn.className = "flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30";
        signupTabBtn.className = "flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 text-slate-400 hover:text-white";
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        signupTabBtn.className = "flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 text-white bg-gradient-to-r from-pink-600 to-purple-600 shadow-lg shadow-pink-600/30";
        loginTabBtn.className = "flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 text-slate-400 hover:text-white";
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toastMessage');
    toast.textContent = message;
    toast.className = `mb-6 p-3.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
        type === 'success' 
            ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300' 
            : 'bg-red-950/80 border border-red-500/40 text-red-300'
    }`;
    toast.classList.remove('hidden');
}

function hideToast() {
    const toast = document.getElementById('toastMessage');
    toast.classList.add('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    const identifier = document.getElementById('loginIdentifier').value;
    const btn = document.getElementById('loginSubmitBtn');
    
    btn.disabled = true;
    btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Authenticating MC...`;

    setTimeout(() => {
        const handle = identifier.startsWith('@') ? identifier : '@' + identifier;
        transitionToDashboard(handle, 'Student MC');
    }, 1000);
}

function handleSignup(e) {
    e.preventDefault();
    const handleInput = document.getElementById('signupHandle').value;
    const classification = document.querySelector('input[name="classification"]:checked').value;
    const btn = document.getElementById('signupSubmitBtn');

    btn.disabled = true;
    btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Initializing Profile...`;

    setTimeout(() => {
        const handle = '@' + handleInput.replace('@', '');
        transitionToDashboard(handle, classification);
    }, 1200);
}

function socialLogin(provider) {
    showToast(`Connecting with ${provider}...`, 'success');
    setTimeout(() => {
        transitionToDashboard('@social_mc', provider + ' MC');
    }, 1000);
}

function transitionToDashboard(handle, role) {
    // Save authentication state and MC profile for the platform
    localStorage.setItem('micwars_logged_in', 'true');
    localStorage.setItem('micwars_handle', handle);
    localStorage.setItem('micwars_role', role);
    
    showToast(`Welcome to MicWars, ${handle}! Entering arena...`, 'success');
    
    // Redirect to the Platform folder after 1 second
    setTimeout(() => {
        window.location.href = "../Platfom/index.html";
    }, 1000);
}



function handleLogout() {
    document.getElementById('dashboardContainer').classList.add('hidden');
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('loginSubmitBtn').disabled = false;
    document.getElementById('loginSubmitBtn').innerHTML = `<span>Enter Battle Arena</span><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`;
    document.getElementById('signupSubmitBtn').disabled = false;
    document.getElementById('signupSubmitBtn').innerHTML = `<span>Initialize MC Profile</span><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`;
    showToast('Successfully logged out.', 'success');
}

function showForgotModal(e) {
    e.preventDefault();
    showToast('Password reset link sent to your registered email!', 'success');
}

function switchToHome() {
    showToast('You are on the MicWars secure auth portal.', 'success');
}
