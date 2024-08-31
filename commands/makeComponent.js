#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { formatName, isTypeScriptProject } from "./utils.js";


export default function makeComponent(name, generateCss){
    try{
    
    const componentName = formatName(name);
    const dirPath = path.join(process.cwd(),'src','components',...name.split("/"));
    const fileExtension = isTypeScriptProject() ? 'tsx' : 'jsx';
    const filePath = path.join(dirPath, `${componentName}.${fileExtension}`);
    let content = '';
    
    content+= `"use client";\n`;
    
    if(generateCss){
        content+= `import styles from "./styles.module.css"\n`
    }

    content+= `
const ${componentName} = ()=>{\n
    return (\n
        <div>${componentName} page</div>\n
    )            
}\n\n
export default ${componentName};
    `
    fs.ensureDirSync(dirPath);
    
    console.log("Creating directory:", dirPath);

    fs.writeFileSync(filePath, content);

    console.log("Creating file:", filePath);

    console.log(`Component ${componentName} created successfully!`)

    if(generateCss){
        console.log(`Creating CSS file:`)
        const cssFilePath = path.join(dirPath, "styles.module.css");
        fs.writeFileSync(cssFilePath,'');
        console.log(`CSS file created successfully!`)
    }

    }catch(err){
        console.log("Error creating page: ",err);
    }

}