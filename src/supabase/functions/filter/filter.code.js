function filter(filterArray) {
    if (!Array.isArray(filterArray) || filterArray.length === 0) {
        return ""; // Return empty string if no filters
    }
    debug(filterArray)
    const conditions = [];

    // Since we only support AND, we can flatten the array and treat all conditions equally
    for (const andGroup of filterArray) {
        if (!Array.isArray(andGroup)) {
            console.warn("Invalid 'and' group:", andGroup);
            continue; // Skip invalid andGroup
        }

        for (const filter of andGroup) {
            if (
                typeof filter !== "object" ||
                filter === null ||
                !filter.a ||
                !filter.b ||
                !filter.o
            ) {
                console.warn("Invalid filter object:", filter);
                continue; // Skip invalid filter object
            }
            // Encode column name with spaces as %20 instead of replacing with underscore
            const cleanedFieldName = encodeURIComponent(filter.a);
            let value = filter.b;
            
            // Extract the actual operator by removing the type prefix (text:, number:, date:, boolean:)
            const operator = filter.o.includes(':') ? filter.o.split(':')[1] : filter.o;
            
            if (operator === 'like.' || operator === 'ilike.') {
                value = `*${value}*`;
            }
            const encodedValue = encodeURIComponent(value);
            conditions.push(`${cleanedFieldName}=${operator}${encodedValue}`);
        }
    }
    debug(conditions)
    // Join all conditions with AND operator (&)
    return conditions.join("&");
}