import fs from "fs-extra"
import path from "path";

export const formatName = (name)=>{
    let newName = name.split('/').pop();
    newName = newName.charAt(0).toUpperCase() + newName.slice(1)
    return newName;
}

export const isTypeScriptProject = () => {
    return fs.existsSync(path.join(process.cwd(), 'tsconfig.json'));
}

export const isNextJsProject = () => {
    // Caminhos típicos de arquivos e diretórios do Next.js
    const nextConfigPathMjs = path.join(process.cwd(), 'next.config.mjs');
    const nextConfigPathJs = path.join(process.cwd(), 'next.config.js');
    const pagesDirPath = path.join(process.cwd(), 'pages');
    const srcPagesDirPath = path.join(process.cwd(), 'src', 'pages');
    const srcAppDirPath = path.join(process.cwd(), 'src', 'app');

    if(fs.existsSync(nextConfigPathMjs) || fs.existsSync(nextConfigPathJs)){
        
        if(fs.existsSync(srcAppDirPath)){
            return "app";
        }
        
        if(fs.existsSync(srcPagesDirPath)){
            return "srcpages"
        }
        
        if(fs.existsSync(pagesDirPath)){
            return "pages";
        }
    }
    
    // Verifica a existência dos arquivos e diretórios padrão
    return false;
}