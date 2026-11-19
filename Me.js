// Multi-View Navigation Switcher
function switchView(viewId) {
    ['home', 'lobby', 'battleroom', 'leaderboard', 'profile'].forEach(v => {
        const viewEl = document.getElementById(`view-${v}`);
        if (viewEl) viewEl.classList.add('hidden');
        
        const navBtn = document.getElementById(`nav-${v}`);
        if (navBtn) {
            navBtn.className = "px-4 py-2 rounded-xl text-sm font-semibold transition-all text-slate-300 hover:text-white hover:bg-cyber-800";
        }
        const mobBtn = document.getElementById(`mob-nav-${v}`);
        if (mobBtn) {
            mobBtn.className = "text-xs font-semibold text-slate-400 flex flex-col items-center";
        }
    });

    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) targetView.classList.remove('hidden');

    const activeNav = document.getElementById(`nav-${viewId}`);
    if (activeNav) {
        activeNav.className = "px-4 py-2 rounded-xl text-sm font-semibold transition-all bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20";
    }
    const activeMob = document.getElementById(`mob-nav-${viewId}`);
    if (activeMob) {
        activeMob.className = "text-xs font-semibold text-cyan-400 flex flex-col items-center";
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Lobby Mode & Category Filters
let currentModeFilter = 'all';
let currentCatFilter = 'all';

function filterLobbyMode(mode) {
    currentModeFilter = mode;
    ['all', 'live', 'recorded'].forEach(m => {
        const btn = document.getElementById(`mode-filter-${m}`);
        if (btn) {
            btn.className = m === mode 
                ? "px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 transition-all"
                : "px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyber-900 text-slate-300 hover:text-white border border-slate-700 transition-all";
        }
    });
    applyLobbyFilters();
}

function filterLobbyCategory(cat) {
    currentCatFilter = cat;
    ['all', 'debate', 'speaking', 'poetry', 'storytelling'].forEach(c => {
        const btn = document.getElementById(`cat-filter-${c}`);
        if (btn) {
            btn.className = c === cat
                ? "px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 text-white transition-all whitespace-nowrap"
                : "px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyber-900 text-slate-300 hover:text-white border border-slate-700 transition-all whitespace-nowrap";
        }
    });
    applyLobbyFilters();
}

function applyLobbyFilters() {
    const cards = document.querySelectorAll('.lobby-card');
    cards.forEach(card => {
        const mode = card.dataset.mode;
        const category = card.dataset.category;
        const matchMode = (currentModeFilter === 'all' || mode === currentModeFilter);
        const matchCat = (currentCatFilter === 'all' || category === currentCatFilter);
        if (matchMode && matchCat) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal Controls
function openWalletModal() {
    const modal = document.getElementById('wallet-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeWalletModal() {
    const modal = document.getElementById('wallet-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function openSubmitModal() {
    const modal = document.getElementById('submit-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeSubmitModal() {
    const modal = document.getElementById('submit-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Wallet action tabs (Deposit vs Withdraw)
let walletAction = 'deposit';
function setWalletAction(action) {
    walletAction = action;
    const depBtn = document.getElementById('action-dep-btn');
    const witBtn = document.getElementById('action-wit-btn');
    const submitBtn = document.getElementById('wallet-action-submit-btn');

    if (action === 'deposit') {
        depBtn.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 transition-all";
        witBtn.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-cyber-900 text-slate-300 border border-slate-700 transition-all";
        submitBtn.innerText = "Confirm & Deposit Funds";
    } else {
        witBtn.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-500 text-white transition-all";
        depBtn.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-cyber-900 text-slate-300 border border-slate-700 transition-all";
        submitBtn.innerText = "Confirm Withdrawal to Gateway";
    }
}

// Gateway selection in wallet modal
function selectWalletGateway(gw) {
    document.querySelectorAll('.wallet-gw-btn').forEach(btn => {
        btn.className = "wallet-gw-btn p-3 rounded-xl border border-slate-800 bg-cyber-950 text-slate-400 text-xs font-bold flex flex-col items-center justify-center space-y-1 transition-all hover:border-slate-700";
    });
    const sel = document.getElementById(`wgw-${gw}`);
    if (sel) sel.className = "wallet-gw-btn p-3 rounded-xl border border-cyan-500 bg-cyan-500/10 text-cyan-300 text-xs font-bold flex flex-col items-center justify-center space-y-1 transition-all";

    const formContainer = document.getElementById('wallet-form-container');
    if (gw === 'ecocash') {
        formContainer.innerHTML = `
            <div>
                <label class="block text-xs font-bold text-slate-400 mb-1">EcoCash Phone Number</label>
                <div class="relative">
                    <span class="absolute left-3.5 top-3 text-xs text-slate-400">+263</span>
                    <input type="text" placeholder="771234567" class="w-full bg-cyber-950 border border-slate-800 rounded-xl pl-16 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-400 mb-1">Amount ($ USD)</label>
                <input type="number" value="5.00" class="w-full bg-cyber-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
            </div>`;
    } else if (gw === 'innbucks') {
        formContainer.innerHTML = `
            <div>
                <label class="block text-xs font-bold text-slate-400 mb-1">InnBucks Account Number</label>
                <input type="text" placeholder="Enter phone or account" class="w-full bg-cyber-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-400 mb-1">Amount ($ USD)</label>
                <input type="number" value="5.00" class="w-full bg-cyber-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
            </div>`;
    } else if (gw === 'stripe') {
        formContainer.innerHTML = `
            <div>
                <label class="block text-xs font-bold text-slate-400 mb-1">Card Number</label>
                <input type="text" placeholder="4242 •••• •••• 4242" class="w-full bg-cyber-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-400 mb-1">Amount ($ USD)</label>
                <input type="number" value="10.00" class="w-full bg-cyber-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
            </div>`;
    } else if (gw === 'paypal') {
        formContainer.innerHTML = `
            <div>
                <label class="block text-xs font-bold text-slate-400 mb-1">PayPal Email Address</label>
                <input type="email" placeholder="orator@example.com" class="w-full bg-cyber-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-400 mb-1">Amount ($ USD)</label>
                <input type="number" value="10.00" class="w-full bg-cyber-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
            </div>`;
    }
}

function processWalletAction() {
    closeWalletModal();
    showToast(walletAction === 'deposit' ? "Funds successfully deposited to MicWars wallet!" : "Withdrawal processed successfully to your gateway!");
}

function confirmBattleEntry() {
    closeSubmitModal();
    showToast("Successfully entered battle! $1.50 deducted from wallet.");
}

// Live Voting Simulation in Battle Room
let roomVotesA = 342;
let roomVotesB = 248;
function castAudienceVote(speaker) {
    if (speaker === 'a') roomVotesA++;
    else roomVotesB++;
    const total = roomVotesA + roomVotesB;
    const pctA = Math.round((roomVotesA / total) * 100);
    const pctB = 100 - pctA;

    document.getElementById('vote-bar-a').style.width = pctA + '%';
    document.getElementById('vote-bar-b').style.width = pctB + '%';
    document.getElementById('vote-stat-a').innerText = `${pctA}% (Certified Score: 88/100)`;
    document.getElementById('vote-stat-b').innerText = `${pctB}% (Certified Score: 82/100)`;
    showToast(`Audience vote recorded for Speaker ${speaker.toUpperCase()}!`);
}

// Room Chat Handling
function handleRoomChatKey(e) {
    if (e.key === 'Enter') sendRoomChatMessage();
}

function sendRoomChatMessage() {
    const input = document.getElementById('room-chat-input');
    if (!input.value.trim()) return;
    const chatList = document.getElementById('room-chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = "flex items-start space-x-2";
    msgDiv.innerHTML = `<span class="font-bold text-cyan-400">You:</span><span class="text-slate-300">${escapeHtml(input.value)}</span>`;
    chatList.appendChild(msgDiv);
    input.value = '';
    chatList.scrollTop = chatList.scrollHeight;
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Toast Notification Helper
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = "fixed bottom-5 right-5 z-50 bg-cyber-900 border border-cyan-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs animate-bounce";
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-cyan-400 text-base"></i><span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

// Timer countdown ticker simulation
let timeLeft = 165; // 2m 45s
setInterval(() => {
    if (timeLeft > 0) timeLeft--;
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const timerEl = document.getElementById('arena-countdown');
    if (timerEl) {
        timerEl.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
}, 1000);
