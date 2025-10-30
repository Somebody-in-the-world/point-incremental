export function calcTimeSpeed(){
    let timeSpeed = dev.timeSpeed;
    return timeSpeed;
}

export function formatTime(time){
    if(time < 1){
        return `${(time*1000).toFixed(2)}ms`
    }
    if(time < 60){
        return `${time.toFixed(2)}s`
    }

    const seconds = Math.floor(time % 60);
    const minutes = (Math.floor(time / 60)) % 60;
    const hours = (Math.floor(time / 3600)) % 24;
    const days = Math.floor(time / 86400) % 365;
    const years = Math.floor(time / (86400*365));

    const parts = [];
    if(years > 0) parts.push(`${years} year${years != 1 ? 's' : ''}`);
    if(days > 0) parts.push(`${days} day${days != 1 ? 's' : ''}`);
    if(hours > 0) parts.push(`${hours} hour${hours != 1 ? 's' : ''}`);
    if(minutes > 0) parts.push(`${minutes} minute${minutes != 1 ? 's' : ''}`);
    if(seconds > 0 || parts.length == 0) parts.push(`${seconds} second${seconds != 1 ? 's' : ''}`);
    
    if(parts.length == 1) return parts[0];
    if(parts.length == 2) return parts.join(" and ");

    return parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
}

