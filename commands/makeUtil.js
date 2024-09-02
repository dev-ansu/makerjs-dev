#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { formatName, isTypeScriptProject } from "./utils.js";


export default function makeUtil(name, asyncUtil){
    try{
        
        let newName = name;
        let dirPath = path.join(process.cwd(),'src','utils');
        if(name.includes("/")){
            newName = name.split("/").pop();
            dirPath = path.join(process.cwd(),'src','utils', ...name.split("/"));
        }
        const fileExtension = isTypeScriptProject() ? 'ts' : 'js';
        const filePath = path.join(dirPath, `${newName}.${fileExtension}`);
        let content = `
export const ${newName} = ${asyncUtil ? 'async':''}()=>{
    ${asyncUtil ? `
        try{
            
        }catch(err){
            console.log(err)
        }    
    `:''}
}
        `;
    
        console.log("Creating directory:", dirPath);
        fs.ensureDirSync(dirPath);

        console.log("Creating file:", filePath);

        fs.writeFileSync(filePath, content);

        console.log(`Util function ${newName} created successfully!`)
    

    }catch(err){
        console.log("Error creating page: ",err);
    }

}