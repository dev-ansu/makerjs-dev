#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { formatName, isTypeScriptProject, isNextJsProject } from "./utils.js";


export default function makeComponent(name, generateCss, generateScss){
    try{
    
    const componentName = formatName(name);
    const dirPath = path.join(process.cwd(),'src','components',...name.split("/"));
    const fileExtension = isTypeScriptProject() ? 'tsx' : 'jsx';
    const filePath = path.join(dirPath, `index.${fileExtension}`);
    let content = '';
    
    if(isNextJsProject()){
        content+= `"use client";\n`;
    }
    
    if(generateCss){
        content+= `import styles from "./styles.module.css"\n`
    }

    if(generateScss){
        content+= `import styles from "./styles.module.scss"\n`
    }

    content+= `
const ${componentName} = ()=>{\n
    return (\n
        <div>${componentName} component</div>\n
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