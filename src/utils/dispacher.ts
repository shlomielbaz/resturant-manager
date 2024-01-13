export default class Dispatcher {
    private static _events: Record<string, Function[]> = {};
    
    static subscribe (event: string, callback: Function) {
        // Check if the callback is not a function
        if (typeof callback !== 'function') {
            console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
            return false;
        }
        
        // Check if the event is not a string
        if (typeof event !== 'string') {
            console.error(`The event name must be a string, the given type is ${typeof event}`);
            return false;
        }
        
        // Check if this event not exists
        if (this._events[event] === undefined) {
            this._events[event] = []
        }
        
        this._events[event].push(callback);
    }
    
    static remove (event: string, callback: Function) {
        // Check if this event not exists
        if (this._events[event] === undefined) {
            console.error(`This event: ${event} does not exist`);
            return false;
        }
        
    	this._events[event] = this._events[event].filter(listener => {
    	    return listener.toString() !== callback.toString(); 
    	});
    }
    
    static dispatch (event: string, args: any) {
        // Check if this event not exists
        if (this._events[event] === undefined) {
            console.error(`This event: ${event} does not exist`);
            return false;
        }
        
        this._events[event].forEach((listener) => {
            listener(args);
        });
    }  
}