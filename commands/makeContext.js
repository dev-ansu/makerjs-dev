#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { formatName, isTypeScriptProject } from "./utils.js";


export default function makeContext(name){
    try{

    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const contextName = `${capitalizedName}Context`;

    let dirPath = path.join(process.cwd(),'src','contexts', ...name.split("/"));
    const fileExtension = isTypeScriptProject() ? 'tsx' : 'jsx';
    const filePath = path.join(dirPath, `${contextName}.${fileExtension}`);
    let content = '';
    
    content+= `
import {useContext, createContext} from "react"

const ${contextName} = createContext();

export const ${contextName}Provider = ({children})=>{

    return(
        <${contextName}.Provider value={}>
            {children}w
        </${contextName}.Provider>
    )
}

export const use${contextName} = ()=>{
    const context = useContext(${contextName});
    if(context === undefined){
        throw new Error("use${contextName} must be used within a ${contextName}Provider");
        return;
    }
    return context;
}
    `
    console.log("Creating directory:", dirPath);
    fs.ensureDirSync(dirPath);

    console.log("Creating file:", filePath);

    fs.writeFileSync(filePath, content);

    console.log(`Context ${contextName} created successfully!`)
    

    }catch(err){
        console.log("Error creating page: ",err);
    }

}