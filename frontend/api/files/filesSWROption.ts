export const addFileOptions = (newFile : any) => {
    return {
        // optimistic data displays until we populate cache
        // param is previous data
        optimisticData: (files : any) => [...files, newFile],
        rollbackOnError: true
    }
}