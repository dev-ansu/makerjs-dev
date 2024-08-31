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
    const nextConfigPath = path.join(process.cwd(), 'next.config.js');
    const pagesDirPath = path.join(process.cwd(), 'pages');
    const srcPagesDirPath = path.join(process.cwd(), 'src', 'pages');
    const srcAppDirPath = path.join(process.cwd(), 'src', 'app');

    if(srcAppDirPath){
        return "app";
    }
    if(srcPagesDirPath){
        return "srcpages"
    }
    if(pagesDirPath){
        return "pages";
    }
    
    // Verifica a existência dos arquivos e diretórios padrão
    return fs.existsSync(nextConfigPath) || fs.existsSync(pagesDirPath) || fs.existsSync(srcPagesDirPath) || fs.existsSync(srcAppDirPath);
}