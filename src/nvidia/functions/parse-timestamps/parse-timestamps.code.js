function parseTimestamps(itemObj, ...timestamps) {
    const result = itemObj;

    const keysToParse =
        timestamps.length === 0 ? ['created'] : timestamps;

    keysToParse.forEach((key) => {
        result[key] = itemObj[key]
            ? iml.parseDate(Number(itemObj[key]), 'X')
            : itemObj.hasOwnProperty(key)
            ? null
            : undefined;
    });

    return result;
}
