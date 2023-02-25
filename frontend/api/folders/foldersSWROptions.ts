export const createFolderOptions = (name : any) => {
    return {
        // optimistic data displays until we populate cache
        // param is previous data
        optimisticData: (folders : any) => {   
            folders.data = [...folders.data, {
                name
            }]
            return folders
        },
        rollbackOnError: true,
        populateCache: (added : any, folders : any) => {
            folders.data = [...folders.data, added]
            return folders
        },
        revalidate: false
    }
}

export const updateFolderOptions = (id : number, data : any) => {
    return {
        // optimistic data displays until we populate cache
        // param is previous data
        optimisticData: (folders : any) => {   
            let folder = folders.data.find((d : any) => d.id === id); 
            folder = {
                ...folder,
                ...data
            }
            // folders.data = [...folders.data, data]
            return folders
        },
        rollbackOnError: true,
        populateCache: (added : any, folders : any) => {
            let folder = folders.data.find((d : any) => d.id === id); 
            folder = {
                ...folder,
                ...added
            }
            return folders
        },
        revalidate: false
    }
}

export const deleteFolderOptions = (id : number) => {
    return {
        // optimistic data displays until we populate cache
        // param is previous data
        optimisticData: (folders : any) => {   
            folders.data = folders?.data.filter((d : any) => d.id !== id); 
            
            // folders.data = [...folders.data, data]
            return folders
        },
        rollbackOnError: true,
        populateCache: (empty : any, folders : any) => {
            folders.data = folders?.data.filter((d : any) => d.id !== id); 
            
            return folders
        },
        revalidate: false
    }
}