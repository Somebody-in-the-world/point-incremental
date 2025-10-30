window.Events = class Events {
    constructor(){
        this.handlers = {};
    }

    add(event, func, thisObj){
        if(!this.handlers[event]) this.handlers[event] = [];
        this.handlers[event].push({func, thisObj});
    }

    removeAll(thisObj){
        for(const handlers of Object.keys(this.handlers)){
            this.handlers[handlers] = this.handlers[handlers]
                .filter(handler => handler.thisObj != thisObj);
        }
    }

    dispatch(event, args=[]){
        const handlers = this.handlers[event];
        if(!handlers) return;
        for(const handler of handlers){
            handler.func(...args);
        }
    }
};

Events.UI = new Events();
Events.logic = new Events();

window.GAME_EVENTS = {
    GAME_TICK: "GAME_TICK",
    NOTATION_CHANGE: "NOTATION_CHANGE",
    POPUP_DISPLAY: "POPUP_DISPLAY",
    DISPLAY_OFFLINE_PROGRESS_LOADING: "DISPLAY_OFFLINE_PROGRESS_LOADING",
    DISPLAY_OFFLINE_PROGRESS_RESULT: "DISPLAY_OFFLINE_PROGRESS_RESULT",
    SPACETIME_ANIM: "SPACETIME_ANIM"
}
