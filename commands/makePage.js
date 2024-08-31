#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { formatName, isTypeScriptProject, isNextJsProject } from "./utils.js";


export default function makePage(name, useClient, generateCss, generateScss){
    try{

    const pageName = formatName(name);
    let dirPath = '';
    let filePath = '';
    const fileExtension = isTypeScriptProject() ? 'tsx' : 'jsx';

    const isNextJs = isNextJsProject();
 
    switch (isNextJs){
        case "app":
            dirPath = path.join(process.cwd(),'src','app',...name.split("/"));
            filePath = path.join(dirPath, `page.${fileExtension}`);
            break;
        case "srcpages":
            dirPath = path.join(process.cwd(),'src','pages',...name.split("/"));
            filePath = path.join(dirPath, `index.${fileExtension}`);
            break;
        case "pages":
            dirPath = path.join(process.cwd(),'pages',...name.split("/"));
            filePath = path.join(dirPath, `index.${fileExtension}`);
            break;
        default:
        dirPath = path.join(process.cwd(),'src',...name.split("/"));
        filePath = path.join(dirPath, `index.${fileExtension}`);

    }

    let content = '';
    
    if(useClient && isNextJs){
        content+= `"use client";\n`;
    }
    
    if(generateScss){
        content+= `import styles from "./styles.module.scss"\n`
    }

    if(generateCss){
        content+= `import styles from "./styles.module.css"\n`
    }

    name = name.charAt(0).toUpperCase() + name.slice(1)
    content+= `
const ${pageName} = ${!useClient && isNextJs && isNextJs == 'app' ? 'async':''} ()=>{\n
    return (\n
        <div>${pageName} page</div>\n
    )            
}\n\n
export default ${pageName};
    `
    console.log("Creating directory:", dirPath);
    fs.ensureDirSync(dirPath);

    console.log("Creating file:", filePath);

    fs.writeFileSync(filePath, content);

    console.log(`Page ${pageName} created successfully!`)
    
    if(generateCss){
        console.log(`Creating CSS file:`)
        const cssFilePath = path.join(dirPath, "styles.module.css");
        fs.writeFileSync(cssFilePath,'');
        console.log(`CSS file created successfully!`)
    }

    if(generateScss){
        console.log(`Creating SCSS file:`)
        const cssFilePath = path.join(dirPath, "styles.module.scss");
        fs.writeFileSync(cssFilePath,'');
        console.log(`CSS file created successfully!`)
    }

    }catch(err){
        console.log("Error creating page: ",err);
    }

}