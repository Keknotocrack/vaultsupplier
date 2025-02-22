class TeamManager {
    constructor() {
        this.teamGrid = document.getElementById('teamGrid');
    }

    createTeamCard(member) {
        const isOwner = member.role === "Owner"; // Check if the member is the Owner
        return `
            <div class="team-card fade-in">
                <div class="team-avatar">
                    <img 
                        src="${member.image}" 
                        alt="${member.role}" 
                        class="team-profile-image"
                        onerror="this.onerror=null; this.src='assets/profileimages/default.png'"
                    >
                </div>
                <h4 class="${isOwner ? 'gradient-background' : ''}">${member.role}</h4>
                <p class="team-role">${member.position}</p>
                <div class="team-socials">
                    <a href="https://discord.gg/vaultsupplier" target="_blank" class="discord-tag">${member.tag}</a>
                </div>
            </div>
        `;
    }

    renderTeam() {
        teamConfig.team.forEach(member => {
            const cardHTML = this.createTeamCard(member);
            this.teamGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
}

// Initialize team section
document.addEventListener('DOMContentLoaded', () => {
    const teamManager = new TeamManager();
    teamManager.renderTeam();
}); 