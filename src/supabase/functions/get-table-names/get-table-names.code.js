function getTableNames(paths) {
    /**
     * Extracts table names from Supabase paths, excluding "/" and RPC paths.
     *
     * @param {object} paths - The paths object from Supabase.
     * @returns {string[]} An array of table names.
     */


    
    if (!paths || typeof paths !== 'object') {
        return []; // Return an empty array if paths is not an object or is null/undefined
    }

    const tableNames = Object.keys(paths)
        .filter(path => path !== '/' && !path.startsWith('/rpc/')) // Exclude the root path "/" and RPC paths
        .map(path => path.slice(1)); // Remove the leading "/" to get the table name

    return tableNames;


}
