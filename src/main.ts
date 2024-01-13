import { Disply } from "./utils/disply";

new Disply("Disply Screen", [
    {name: "Disply Menu", callback: () => console.log('Disply Menu')}, 
    {name: "Disply Kitchen Screen", callback: () => console.log('Disply Kitchen Screen')}, 
    {name: "Disply Rstorant Screen", callback: () => console.log('Disply Rstorant Screen')}, 
    {name: "Disply Orders", callback: () => console.log('Disply Orders')}, 
    {name: "Disply Menu", callback: () => console.log('Disply Menu')}
]).run().then((res) => {
    debugger
    return console.log(res)});